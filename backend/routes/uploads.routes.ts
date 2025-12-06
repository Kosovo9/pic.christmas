
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream';

const router = express.Router();

// Multer config (Memory storage to upload directly to Cloudinary)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
        files: 5
    }
});

// @desc    Upload photos
// @route   POST /api/uploads
// @access  Public
router.post('/', upload.array('photos', 5), async (req: any, res) => {
    try {
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const uploadPromises = files.map(file => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'pic-christmas/uploads' }, // Temporary folder
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url);
                    }
                );

                const bufferStream = new stream.PassThrough();
                bufferStream.end(file.buffer);
                bufferStream.pipe(uploadStream);
            });
        });

        const urls = await Promise.all(uploadPromises);

        res.json({
            message: 'Upload successful',
            fileUrls: urls
        });

    } catch (error: any) {
        console.error('Upload Error:', error);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
});

export default router;
