import Replicate from "replicate";
import { CHRISTMAS_PROMPTS, MASTER_PROMPT_TEMPLATE, ScenePreset } from "./christmasPrompts";

export interface PromptContext {
    presetId: string;
    language?: "en" | "es";
    // Future extensibility: custom details about people/pets
    details?: string;
}

export interface GenerationResult {
    url: string;
    presetId: string;
    seed?: number;
}

// Initialize Replicate
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

/**
 * Finds a preset by ID or returns a default one.
 */
export function getPresetById(id: string): ScenePreset {
    return CHRISTMAS_PROMPTS.find((p) => p.id === id) || CHRISTMAS_PROMPTS[0];
}

/**
 * Constructs the full positive and negative prompts based on the Master Template.
 */
export function generateChristmasPrompt(context: PromptContext) {
    const preset = getPresetById(context.presetId);
    const lang = context.language || "en";

    let positiveTemplate = lang === "es" ? MASTER_PROMPT_TEMPLATE.es_positive : MASTER_PROMPT_TEMPLATE.en_positive;
    let negativeTemplate = lang === "es" ? MASTER_PROMPT_TEMPLATE.es_negative : MASTER_PROMPT_TEMPLATE.en_negative;

    const sceneDescription = lang === "es" ? preset.scene_es : preset.scene_en;

    // Replace placeholders
    // Note: The template uses {SCENE_EN} or {ESCENA_ES}. We handle both to be safe.
    let positivePrompt = positiveTemplate
        .replace("{SCENE_EN}", sceneDescription)
        .replace("{ESCENA_ES}", sceneDescription);

    return {
        positive: positivePrompt,
        negative: negativeTemplate,
    };
}

/**
 * Calls Replicate to generate the image.
 * Uses SDXL or Flux (defaults to Flux Schnell for speed if not specified otherwise in env).
 */
export async function generateImage(
    imageRefs: string[], // URLs or base64 of reference photos (not fully used in this v1 prompt-based approach unless using InstantID/Image adapter)
    context: PromptContext
): Promise<GenerationResult> {
    const { positive, negative } = generateChristmasPrompt(context);

    console.log("Generating with prompt:", positive.substring(0, 100) + "...");

    // MODEL CHOICE:
    // For v1 standard prompt-based generation, we use black-forest-labs/flux-schnell
    // If we had InstantID configured, we would pass imageRefs to that specific model.
    // For now, we assume a high-quality text-to-image to validate the pipeline, 
    // as InstantID requires a different input structure (adapter_image).

    // TODO: Switch to InstantID model or similar if maintaining identity is strictly required via image inputs now.
    // For this MVP step, we will use Flux Schnell as requested for speed/quality text-to-image.
    const model = "black-forest-labs/flux-schnell";

    // If we wanted to use image refs, we'd need an InstantID model like:
    // "instantx/instant-id-sdxl"

    const output = await replicate.run(model, {
        input: {
            prompt: positive,
            // negative_prompt: negative, // Flux Schnell often ignores negative prompt or handles it differently, but good to have.
            num_outputs: 1,
            aspect_ratio: "4:5",
            output_format: "jpg",
            output_quality: 90,
            disable_safety_checker: true, // Be careful with this, but requested for "unfiltered" art often.
        },
    });

    // Replicate returns an array of URLs (or streams)
    const url = Array.isArray(output) ? (output[0] as unknown as string) : (output as unknown as string);

    return {
        url,
        presetId: context.presetId,
    };
}
