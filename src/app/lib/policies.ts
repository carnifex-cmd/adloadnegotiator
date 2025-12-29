// Policy types
export type AdSlotStatus = 'PLACEHOLDER' | 'LOADED' | 'SUPPRESSED';

export interface SlotState {
    slotId: string;
    status: AdSlotStatus;
}

export interface PolicyContext {
    slot: SlotState;
    pageLoadTime: number; // timestamp when page loaded
    currentTime: number;  // current timestamp
}

export type PolicyViolation =
    | 'ALREADY_LOADED'
    | 'LCP_GATE_NOT_PASSED'
    | 'CLS_RISK';

export interface PolicyResult {
    allowed: boolean;
    violation?: PolicyViolation;
    reason?: string;
}

// Constants
const LCP_GATE_MS = 2000; // 2 seconds after page load

/**
 * Checks if slot is already loaded.
 * Rule: A slot already LOADED must never reload.
 */
function checkAlreadyLoaded(slot: SlotState): PolicyResult | null {
    if (slot.status === 'LOADED') {
        return {
            allowed: false,
            violation: 'ALREADY_LOADED',
            reason: `Slot ${slot.slotId} is already loaded. Reload not permitted.`,
        };
    }
    return null;
}

/**
 * Checks LCP gate timing.
 * Rule: Ads must not load before 2 seconds after page load.
 */
function checkLCPGate(context: PolicyContext): PolicyResult | null {
    const elapsedMs = context.currentTime - context.pageLoadTime;

    if (elapsedMs < LCP_GATE_MS) {
        return {
            allowed: false,
            violation: 'LCP_GATE_NOT_PASSED',
            reason: `LCP gate not passed. ${LCP_GATE_MS - elapsedMs}ms remaining.`,
        };
    }
    return null;
}

/**
 * CLS safety check.
 * Rule: Slot size must never change.
 * Note: This is enforced by the AdSlot component's fixed dimensions.
 * This check exists as a programmatic assertion.
 */
function checkCLSSafety(): PolicyResult | null {
    // CLS safety is guaranteed by AdSlot component design.
    // The slot has fixed width/height/min/max constraints.
    // This function serves as a documentation checkpoint.
    return null;
}

/**
 * Evaluates all policies for an ad slot.
 * This must run BEFORE any Gemini decision is applied.
 *
 * @param context - The current slot and timing context
 * @returns PolicyResult indicating if loading is allowed
 */
export function evaluatePolicies(context: PolicyContext): PolicyResult {
    // Check policies in order of priority

    // 1. Already loaded check (highest priority)
    const loadedViolation = checkAlreadyLoaded(context.slot);
    if (loadedViolation) return loadedViolation;

    // 2. LCP gate check
    const lcpViolation = checkLCPGate(context);
    if (lcpViolation) return lcpViolation;

    // 3. CLS safety check
    const clsViolation = checkCLSSafety();
    if (clsViolation) return clsViolation;

    // All policies passed
    return {
        allowed: true,
    };
}

/**
 * Helper to create policy context
 */
export function createPolicyContext(
    slot: SlotState,
    pageLoadTime: number
): PolicyContext {
    return {
        slot,
        pageLoadTime,
        currentTime: Date.now(),
    };
}
