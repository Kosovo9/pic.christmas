import { Worker, Job } from 'bullmq';
import { v2 as cloudinary } from 'cloudinary';
import Order from '../models/Order';
import dotenv from 'dotenv';
import { watermarkService } from '../services/watermark.service';
import { emailService } from '../services/email.service';
import { GenerationPipeline } from '../services/generationPipeline.service';
import { FaceEmbeddingService } from '../services/faceEmbedding.service';

dotenv.config();

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

            // Pre-load valid seed images
            const seedImages = order.originalImages || [];
            if (seedImages.length === 0) {
                console.warn("No seed images found, using fallback/text-only generation mode if possible.");
                // Fallback or error? For Nuclear Stack, we really want seed images.
            }

            for (let i = 0; i < count; i++) {
                // Select seed image cyclically
                const seedImageUrl = seedImages.length > 0 ? seedImages[i % seedImages.length] : null;

                // 1. Generate with Nuclear Stack Pipeline
                // Using the specific Christmas Prompt + Face Lock
                console.log(`[Worker] Generating image ${i + 1}/${count} using Nuclear Stack...`);

                let imageUrl: string;

                try {
                    if (seedImageUrl) {
                        const style = "Christmas Realistic"; // Default high quality style
                        const context = prompt || "Cozy Christmas atmosphere";

                        const result = await GenerationPipeline.generateRealisticPhoto(
                            seedImageUrl,
                            style,
                            context
                        );
                        imageUrl = result.imageUrl;
                        console.log(`[Worker] Generation complete. Score: ${result.verificationScore}%`);
                    } else {
                        // Fallback Text-Only (shouldn't happen in 100x flow usually)
                        throw new Error("Seed image required for Face-Locked generation");
                    }
                } catch (genError) {
                    console.error("Generation failed, skipping this image:", genError);
                    continue; // Skip to next
                }

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

                const uploadToCloudinary = (buffer: Buffer) => {
                    return new Promise<any>((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            { folder: `pic-christmas/orders/${orderId}`, tags: ['generated', 'christmas', 'watermarked', 'face-locked'] },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );
                        const stream = require('stream');
                        const bufferStream = new stream.PassThrough();
                        bufferStream.end(buffer);
                        bufferStream.pipe(uploadStream);
                    });
                };

                let secureUrl;
                if (Buffer.isBuffer(finalImageToUpload)) {
                    const result = await uploadToCloudinary(finalImageToUpload);
                    secureUrl = result.secure_url;
                } else {
                    const result = await cloudinary.uploader.upload(finalImageToUpload as string, {
                        folder: `pic-christmas/orders/${orderId}`,
                        tags: ['generated', 'christmas', 'face-locked']
                    });
                    secureUrl = result.secure_url;
                }

                console.log(`[Worker] Upload successful: ${secureUrl}`);
                generatedUrls.push(secureUrl);

                await job.updateProgress(((i + 1) / count) * 100);
            }

            // 4. Save results & Notify 📧
            if (generatedUrls.length > 0) {
                // Append new images instead of overwriting if doing batches? 
                // Currently overwrite logic in old worker, let's keep it safe or append.
                // Mongoose array push is safer if concurrent? 
                // But simplified:
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
            } else {
                throw new Error("No images generated successfully");
            }

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

