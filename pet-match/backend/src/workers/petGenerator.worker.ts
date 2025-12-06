import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import Replicate from 'replicate';
import dotenv from 'dotenv';
import PetOrder from '../models/PetOrder';

dotenv.config();

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null
});

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const worker = new Worker('pet-generation-queue', async (job) => {
    console.log(`🎨 Starting Pet Job ${job.id}`);
    const { orderId, petDetails, originalPhoto } = job.data;

    try {
        const order = await PetOrder.findById(orderId);
        if (!order) throw new Error('Order not found');

        order.status = 'processing';
        await order.save();

        // 1. Construct Prompt based on Theme 🎭
        // 1. Construct Super Prompt based on Theme 🎭
        // "Elon-Level" Prompt Engineering: Specific, Descriptive, High-Fidelity
        let themePrompt = "";

        const superPrompts: Record<string, string> = {
            'santa': "wearing a luxurious red velvet Santa Claus suit with white fur trim, classic santa hat, snowy north pole background, magical christmas lights, cozy atmosphere, holiday cheer, ultra-realistic texture",
            'elf': "dressed as a cheerful Christmas Elf, green and red tunic with gold bells, pointy elf hat, workshop background filled with toys, magical sparkles, vibrant colors, pixar style lighting",
            'reindeer': "wearing festive reindeer antlers with christmas lights tangled in them, red rudolph nose, snowy forest background, bokeh lights, soft fur texture, magical winter wonderland",
            'grinch': "cosplay of The Grinch, green fur tint, wearing a santa coat, mischievous expression, mount crumpit background, cinamtic lighting, dr seuss style whimsy but photorealistic",
            'frozen': "as a majestic ice king/queen, crystalline ice crown, snowy blue fur accents, frozen castle background, magical ice particles, disney frozen aesthetic, ethereal lighting",
            'cozy': "wearing a chunky knit christmas sweater with snowflake patterns, sitting in front of a roaring fireplace, warm ambient lighting, hot cocoa nearby, hygge atmosphere",
            'angel': "wearing golden angel wings and a halo, heavenly clouds background, soft golden hour lighting, ethereal glow, divine presence, renaissance painting style",
            'studio': "professional studio photography, solid red christmas background, dramatic rim lighting, highly detailed fur, 8k resolution, sharp focus, magazine cover quality",
            'royal': "oil painting of a royal renaissance pet, wearing a crown and velvet robe, intricate details, majestic, castle background",
            'fantasy': "magical fantasy creature, glowing aura, enchanted forest background, digital art, 8k, ethereal"
        };

        const selectedTheme = superPrompts[petDetails.theme] || superPrompts['studio'];

        // Construct the Master Prompt
        const fullPrompt = `RAW photo of a ${petDetails.breed} ${petDetails.type}, ${selectedTheme}, looking at camera, 8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3`;

        console.log(`Generating with Super Prompt: ${fullPrompt}`);

        // 2. Call Replicate (Flux-Dev or Schnell with Img2Img) 🤖
        // 🚀 ELON UPGRADE: Using Image-to-Image for 100% Likeness
        // We pass the 'originalPhoto' as input.

        const output = await replicate.run(
            "black-forest-labs/flux-schnell",
            {
                input: {
                    prompt: fullPrompt,
                    image: originalPhoto, // 📸 Vital for Likeness!
                    strength: 0.75, // Impact of the prompt vs original image (0.0 to 1.0). 0.75 allows creativity while keeping structure.
                    num_outputs: 2,
                    aspect_ratio: "1:1",
                    output_format: "jpg",
                    output_quality: 95
                }
            }
        );

        // 3. Save Results 💾
        // In a real scenario, we'd upload to Cloudinary/S3 here.
        // For Speed Run, we use Replicate URLs directly (temporary but works).

        order.generatedImages = output as string[];
        order.status = 'completed';
        await order.save();

        console.log(`✅ Job ${job.id} completed. Generated ${order.generatedImages.length} images.`);
        return { success: true, images: output };

    } catch (error) {
        console.error(`❌ Job ${job.id} failed:`, error);
        const order = await PetOrder.findById(orderId);
        if (order) {
            order.status = 'failed';
            await order.save();
        }
        throw error;
    }
}, { connection });

console.log('🐶 Pet Worker Started');

export default worker;
