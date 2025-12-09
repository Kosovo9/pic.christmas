import Replicate from "replicate";
import { CHRISTMAS_PROMPTS, MASTER_PROMPT_TEMPLATE, ChristmasPrompt } from "./christmasPrompts";

export interface PromptContext {
    presetId?: string; // Optional now
    prompt?: string;   // Direct prompt override
    language?: "en" | "es";
    aspectRatio?: string; // e.g. "1:1", "16:9"
    // Future extensibility: custom details about people/pets
    details?: string;
}

export interface GenerationResult {
    url: string;
    presetId?: string;
    seed?: number;
}

// Initialize Replicate
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

/**
 * Finds a preset by ID or returns a default one.
 */
export function getPresetById(id: string): ChristmasPrompt {
    return CHRISTMAS_PROMPTS.find((p) => p.id === id) || CHRISTMAS_PROMPTS[0];
}

/**
 * Constructs the full positive and negative prompts.
 */
export function generateChristmasPrompt(context: PromptContext) {
    if (context.prompt) {
        return {
            positive: context.prompt,
            negative: MASTER_PROMPT_TEMPLATE.negative || "low quality, distorted",
        };
    }

    const presetId = context.presetId || CHRISTMAS_PROMPTS[0].id;
    const preset = getPresetById(presetId);

    // The new prompts have a full 'basePrompt' that includes style directives.
    // We use it directly.
    // In future iterations, we could translate or inject details.

    let positivePrompt = preset.basePrompt;

    // Fallback for negative
    const negativePrompt = MASTER_PROMPT_TEMPLATE.negative;

    return {
        positive: positivePrompt,
        negative: negativePrompt,
    };
}

/**
 * Calls Replicate to generate the image.
 * Uses SDXL or Flux (defaults to Flux Schnell for speed if not specified otherwise in env).
 */
export async function generateImage(
    imageRefs: string[],
    context: PromptContext
): Promise<GenerationResult> {
    const { positive, negative } = generateChristmasPrompt(context);

    console.log("Generating with prompt:", positive.substring(0, 100) + "...");

    // MODEL CHOICE: Flux Schnell
    const model = "black-forest-labs/flux-schnell";

    // Map strict aspect ratios if needed, or pass through.
    // Flux Schnell supports: "1:1", "16:9", "21:9", "3:2", "2:3", "4:5", "5:4", "9:16", "9:21"
    const aspectRatio = context.aspectRatio || "4:5";

    const output = await replicate.run(model, {
        input: {
            prompt: positive,
            num_outputs: 1,
            aspect_ratio: aspectRatio,
            output_format: "jpg",
            output_quality: 90,
            disable_safety_checker: true,
        },
    });

    // Replicate returns an array of URLs (or streams)
    const url = Array.isArray(output) ? (output[0] as unknown as string) : (output as unknown as string);

    return {
        url,
        presetId: context.presetId || "custom",
    };
}
