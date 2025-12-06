import { Worker, Job } from 'bullmq';
import Replicate from 'replicate';
import { v2 as cloudinary } from 'cloudinary';
import Order from '../models/Order';
import dotenv from 'dotenv';

dotenv.config();

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const redisConnection = {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
};

export const imageGenerationWorker = new Worker(
    'image-generation',
    async (job: Job) => {
        console.log(`Starting job ${job.id}: Generating images for order ${job.data.orderId}`);

        const { orderId, prompt, count = 1 } = job.data;

        try {
            const order = await Order.findById(orderId);
            if (!order) throw new Error('Order not found');

            // Update status
            order.status = 'processing';
            await order.save();

            const generatedUrls: string[] = [];

            for (let i = 0; i < count; i++) {
                // 1. Generate with Replicate (Flux Pro or SDXL)
                const { config } = job.data;

                // Advanced Prompt Engineering Logic 100x 🚀
                let enhancedPrompt = prompt;
                let subjectDirectives = "";

                if (config) {
                    if (config.pets > 0) {
                        subjectDirectives += "hyper-realistic pet photography, detailed fur texture, bright expressive eyes, shallow depth of field, ";
                    }
                    if (config.children > 0) {
                        subjectDirectives += "adorable happy child, soft skin tones, magical sparkle in eyes, candid moment, ";
                    }
                    if (config.adults > 0 && config.children === 0 && config.pets === 0) {
                        subjectDirectives += "professional portrait, elegant attire, warm skin tones, cinematic lighting, ";
                    }
                }

                const finalPrompt = `${subjectDirectives} ${enhancedPrompt}, Christmas magic, cozy holiday atmosphere, 8k resolution, highly detailed, photorealistic, cinematic lighting, bokeh background`;

                // Using Flux-schnell for speed and quality
                const output = await replicate.run(
                    "black-forest-labs/flux-schnell",
                    {
                        input: {
                            prompt: finalPrompt,
                            num_outputs: 1,
                            aspect_ratio: "1:1",
                            output_format: "jpg",
                            output_quality: 100 // Cranked to 100 for max quality
                        }
                    }
                );
                console.log(`[Worker] Replicate output received for image ${i + 1}/${count}`);

                const imageUrl = (output as string[])[0]; // Replicate returns array usually

                // 2. Upload to Cloudinary
                // Note: In production we might want to download and stream to Cloudinary to avoid hotlinking issues
                // For MVP, we pass the Replicate URL to Cloudinary
                console.log(`[Worker] Uploading to Cloudinary: ${imageUrl.substring(0, 30)}...`);
                const uploadResult = await cloudinary.uploader.upload(imageUrl, {
                    folder: `pic-christmas/orders/${orderId}`,
                    tags: ['generated', 'christmas']
                });
                console.log(`[Worker] Upload successful: ${uploadResult.secure_url}`);

                generatedUrls.push(uploadResult.secure_url);

                // Update progress via job
                await job.updateProgress(((i + 1) / count) * 100);
            }

            // 3. Save results
            order.generatedImages = generatedUrls;
            order.status = 'completed';
            await order.save();

            console.log(`Job ${job.id} completed. Generated ${generatedUrls.length} images.`);
            return { success: true, images: generatedUrls };

        } catch (error: any) {
            console.error(`Job ${job.id} failed:`, error);

            const order = await Order.findById(orderId);
            if (order) {
                order.status = 'failed';
                await order.save();
            }

            throw error;
        }
    },
    {
        connection: redisConnection,
        concurrency: 5 // Process 5 images in parallel
    }
);
