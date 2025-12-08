
import express from 'express';
import multer from 'multer';
import { cloudinary } from '../config/clients';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temp storage

// @desc    Upload photos to Cloudinary
// @route   POST /api/uploads
router.post('/', upload.array('photos', 10), async (req, res) => {
    try {
        const files = req.files as Express.Multer.File[];
        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const uploadPromises = files.map(async (file) => {
            try {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'pic-christmas/user-uploads',
                });
                // Clean up local file
                fs.unlinkSync(file.path);
                return result.secure_url;
            } catch (err) {
                console.error('Cloudinary Upload Error:', err);
                if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
                return null;
            }
        });

        const urls = await Promise.all(uploadPromises);
        const validUrls = urls.filter((url) => url !== null);

        res.json({
            message: 'Upload successful',
            fileUrls: validUrls,
            uploadedCount: validUrls.length
        });
    } catch (error: any) {
        console.error('Upload Route Error:', error);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
});

export default router;
