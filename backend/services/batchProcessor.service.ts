
import { generationQueue } from '../config/clients';

export class BatchProcessorService {
    static async addToQueue(images: string[], config: any) {
        if (!generationQueue) {
            console.warn('⚠️ Redis Queue not available. Falling back to direct (slow) processing or mock.');
            throw new Error('Batch processing requires Redis');
        }

        const jobId = `batch_${Date.now()}`;

        // Add each image as a job
        const jobs = images.map((imgUrl, index) => ({
            name: `process_image_${index}`,
            data: {
                batchId: jobId,
                imageUrl: imgUrl,
                config,
                index
            },
            opts: {
                attempts: 3,
                backoff: { type: 'exponential', delay: 1000 }
            }
        }));

        await generationQueue.addBulk(jobs);

        return {
            batchId: jobId,
            count: images.length,
            status: 'queued'
        };
    }

    static async getBatchStatus(batchId: string) {
        // In real impl, we query Redis for job states matching batchId
        // Simplified: return mock
        return {
            batchId,
            progress: 0, // Implement real tracking later
            status: 'processing'
        };
    }
}
