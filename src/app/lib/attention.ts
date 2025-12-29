// Attention state types
export type AttentionMode = 'SCANNING' | 'READING' | 'IDLE';
export type CognitiveLoad = 'LOW' | 'HIGH';
export type InteractionRisk = 'LOW' | 'HIGH';

export interface AttentionState {
    mode: AttentionMode;
    cognitiveLoad: CognitiveLoad;
    interactionRisk: InteractionRisk;
}

// Input signals from useInteraction hook
export interface InteractionSignals {
    scrollVelocity: 'LOW' | 'HIGH';
    idle: boolean;
}

/**
 * Derives attention state from interaction signals.
 * This is a pure, deterministic function with no AI/ML.
 *
 * Rules:
 * - HIGH scroll velocity => SCANNING (user is quickly browsing)
 * - LOW scroll velocity and not idle => READING (user is engaged with content)
 * - idle => IDLE (user is not interacting)
 *
 * Cognitive load and interaction risk mappings:
 * - SCANNING, READING => HIGH cognitive load, HIGH interaction risk
 * - IDLE => LOW cognitive load, LOW interaction risk
 */
export function deriveAttentionState(signals: InteractionSignals): AttentionState {
    // Determine attention mode
    let mode: AttentionMode;

    if (signals.idle) {
        mode = 'IDLE';
    } else if (signals.scrollVelocity === 'HIGH') {
        mode = 'SCANNING';
    } else {
        mode = 'READING';
    }

    // Map mode to cognitive load and interaction risk
    const isActive = mode === 'SCANNING' || mode === 'READING';

    return {
        mode,
        cognitiveLoad: isActive ? 'HIGH' : 'LOW',
        interactionRisk: isActive ? 'HIGH' : 'LOW',
    };
}
