import { Worker, Job } from 'bullmq';
import Replicate from 'replicate';
import { v2 as cloudinary } from 'cloudinary';
import Order from '../models/Order';
import dotenv from 'dotenv';
import { watermarkService } from '../services/watermark.service';
import { emailService } from '../services/email.service';

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
                        subjectDirectives += "award-winning studio photography of a cute pet, hyper-detailed fur texture, individual hairs visible, bright expressive looking at camera, shallow depth of field, f/1.8, soft studio lighting, wearing cute festive Christmas sweater, ";
                    }
                    if (config.children > 0) {
                        subjectDirectives += "portrait of an adorable happy child, authentic candid moment, genuine smile, soft skin texture, magical sparkle in eyes, wearing traditional Christmas clothing, soft volumetric lighting, ";
                    }
                    if (config.adults > 0 && config.children === 0 && config.pets === 0) {
                        subjectDirectives += "high-fashion editorial portrait, elegant sophisticated attire, Christmas gala atmosphere, 85mm lens, incredibly detailed skin texture, warm skin tones, cinematic lighting, ";
                    }
                }

                const finalPrompt = `${subjectDirectives} ${enhancedPrompt}, christmas masterpiece, 8k resolution, raw photo, ultra-realistic, photorealistic, cinematic lighting, bokeh background, detailed textures, sharp focus, high dynamic range, perfect composition, shot on Sony A7R IV`;

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

                const imageUrl = (output as string[])[0];

                // 2. Apply Watermark 🛡️ (100x Protection)
                console.log(`[Worker] Applying 'NEXORA' watermark...`);
                let finalImageToUpload: string | Buffer = imageUrl;

                try {
                    const watermarkedBuffer = await watermarkService.applyWatermark(imageUrl);
                    finalImageToUpload = watermarkedBuffer;
                } catch (wmError) {
                    console.error('Watermarking failed, using original', wmError);
                }

                // 3. Upload to Cloudinary (Watermarked)
                console.log(`[Worker] Uploading to Cloudinary...`);

                // For Buffer upload, we need a stream or promise. Cloudinary SDK supports file path or url primarily in v2.uploader.upload
                // To upload buffer, we might need a stream wrapper or write to temp file.
                // OPTIMIZATION: Use a simple write-to-disk approach for reliability in Node environments, or stream.
                // For MVP Speed + Reliability:
                // We'll use a Promise wrapper for stream upload if using buffer.

                const uploadToCloudinary = (buffer: Buffer) => {
                    return new Promise<any>((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            { folder: `pic-christmas/orders/${orderId}`, tags: ['generated', 'christmas', 'watermarked'] },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );
                        // Write buffer to stream
                        const stream = require('stream');
                        const bufferStream = new stream.PassThrough();
                        bufferStream.end(buffer);
                        bufferStream.pipe(uploadStream);
                    });
                };

                // If it's a buffer (watermarked), use stream upload. If URL (fallback), use standard upload.
                let secureUrl;
                if (Buffer.isBuffer(finalImageToUpload)) {
                    const result = await uploadToCloudinary(finalImageToUpload);
                    secureUrl = result.secure_url;
                } else {
                    const result = await cloudinary.uploader.upload(finalImageToUpload as string, {
                        folder: `pic-christmas/orders/${orderId}`,
                        tags: ['generated', 'christmas']
                    });
                    secureUrl = result.secure_url;
                }

                console.log(`[Worker] Upload successful: ${secureUrl}`);
                generatedUrls.push(secureUrl);

                await job.updateProgress(((i + 1) / count) * 100);
            }

            // 4. Save results & Notify 📧
            order.generatedImages = generatedUrls;
            order.status = 'completed';
            await order.save();

            // Send Email if available
            if (order.email) {
                console.log(`[Worker] Sending email to ${order.email}...`);
                await emailService.sendOrderReadyEmail(
                    order.email,
                    order._id.toString(),
                    `${process.env.FRONTEND_URL}/success?orderId=${order._id}`
                );
            }

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
