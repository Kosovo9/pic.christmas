
import express from 'express';
import { BatchProcessorService } from '../services/batchProcessor.service';

const router = express.Router();

// @desc    Process batch of images
// @route   POST /api/batch/process
router.post('/process', async (req, res) => {
    try {
        const { images, config } = req.body;

        if (!images || !Array.isArray(images)) {
            return res.status(400).json({ message: 'images array required' });
        }

        const result = await BatchProcessorService.addToQueue(images, config);
        res.json({ success: true, ...result });

    } catch (error: any) {
        console.error('Batch Error:', error);
        res.status(500).json({ message: 'Batch processing failed', error: error.message });
    }
});

// @desc    Get batch status
// @route   GET /api/batch/:batchId
router.get('/:batchId', async (req, res) => {
    const status = await BatchProcessorService.getBatchStatus(req.params.batchId);
    res.json(status);
});

export default router;
