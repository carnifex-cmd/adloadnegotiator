import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Types for the API
interface SlotMetadata {
    slotId: string;
    position: number;
    loaded: boolean;
}

interface AttentionState {
    mode: 'SCANNING' | 'READING' | 'IDLE';
    cognitiveLoad: 'LOW' | 'HIGH';
    interactionRisk: 'LOW' | 'HIGH';
}

interface Constraints {
    clsSafe: boolean;
    lcpCompleted: boolean;
}

interface DecideRequest {
    attentionState: AttentionState;
    constraints: Constraints;
    slots: SlotMetadata[];
}

interface SlotDecision {
    slotId: string;
    action: 'LOAD' | 'DEFER' | 'SUPPRESS';
    reason: string;
}

interface DecideResponse {
    decisions: SlotDecision[];
}

// System prompt
const SYSTEM_PROMPT = `You are a runtime decision engine for ad loading.
You do not control layout or rendering.
You recommend one action per ad slot: LOAD, DEFER, or SUPPRESS.
You must respect performance and interaction constraints.
Return JSON only. Do not include explanations outside the JSON.`;

export async function POST(request: NextRequest) {
    try {
        const body: DecideRequest = await request.json();
        const { attentionState, constraints, slots } = body;

        // Validate request
        if (!attentionState || !constraints || !slots) {
            return NextResponse.json(
                { error: 'Missing required fields: attentionState, constraints, slots' },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'GEMINI_API_KEY environment variable not set' },
                { status: 500 }
            );
        }

        // Initialize Gemini client
        const ai = new GoogleGenAI({ apiKey });

        // Build user prompt with runtime state
        const userPrompt = buildUserPrompt(attentionState, constraints, slots);

        // Call Gemini API with system instruction
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: SYSTEM_PROMPT,
            },
            contents: userPrompt,
        });

        const responseText = response.text;

        if (!responseText) {
            return NextResponse.json(
                { error: 'No response from Gemini API' },
                { status: 502 }
            );
        }

        // Parse JSON from Gemini response
        const decisions = parseGeminiResponse(responseText, slots);

        return NextResponse.json(decisions);
    } catch (error) {
        console.error('Error in /api/decide:', error);
        return NextResponse.json(
            { error: 'Internal server error', message: String(error) },
            { status: 500 }
        );
    }
}

function buildUserPrompt(
    attentionState: AttentionState,
    constraints: Constraints,
    slots: SlotMetadata[]
): string {
    const runtimeState = {
        attentionState: {
            mode: attentionState.mode,
            cognitiveLoad: attentionState.cognitiveLoad,
            interactionRisk: attentionState.interactionRisk,
        },
        constraints: {
            clsSafe: constraints.clsSafe,
            lcpCompleted: constraints.lcpCompleted,
        },
        slots: slots.map((s) => ({
            slotId: s.slotId,
            position: s.position,
            loaded: s.loaded,
        })),
    };

    return `Runtime state:
${JSON.stringify(runtimeState, null, 2)}

Return JSON in this exact format:
{
  "decisions": [
    {
      "slotId": "string",
      "action": "LOAD | DEFER | SUPPRESS",
      "reason": "short explanation"
    }
  ]
}`;
}

function parseGeminiResponse(
    responseText: string,
    slots: SlotMetadata[]
): DecideResponse {
    try {
        // Extract JSON from response (handle markdown code blocks)
        let jsonStr = responseText;
        const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
            jsonStr = jsonMatch[1].trim();
        }

        const parsed = JSON.parse(jsonStr);
        return parsed as DecideResponse;
    } catch {
        // Fallback: return safe defaults if parsing fails
        console.error('Failed to parse Gemini response:', responseText);
        return {
            decisions: slots.map((slot) => ({
                slotId: slot.slotId,
                action: 'DEFER' as const,
                reason: 'Failed to parse AI response, defaulting to DEFER',
            })),
        };
    }
}
