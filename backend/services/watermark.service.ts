import sharp from 'sharp';
import axios from 'axios';

class WatermarkService {
    async applyWatermark(imageUrl: string): Promise<Buffer> {
        try {
            // 1. Download image
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const inputBuffer = Buffer.from(response.data, 'binary');

            // 2. Create SVG Watermark
            const width = 1024; // Assuming square 1024x1024 from Flux
            const height = 1024;

            const svgWatermark = `
                <svg width="${width}" height="${height}">
                    <style>
                        .title { fill: rgba(255, 255, 255, 0.3); font-size: 80px; font-weight: bold; font-family: sans-serif; }
                    </style>
                    <text x="50%" y="50%" text-anchor="middle" class="title" transform="rotate(-45 512 512)">
                        NEXORA
                    </text>
                </svg>
            `;

            // 3. Composite
            const outputBuffer = await sharp(inputBuffer)
                .composite([{
                    input: Buffer.from(svgWatermark),
                    gravity: 'center'
                }])
                .jpeg({ quality: 90 })
                .toBuffer();

            return outputBuffer;
        } catch (error) {
            console.error('❌ Watermark failed:', error);
            // Fallback: return downloaded buffer or error
            // Taking risk: return original download if sharp fails (better than nothing)
            const fallback = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            return Buffer.from(fallback.data, 'binary');
        }
    }
}

export const watermarkService = new WatermarkService();
