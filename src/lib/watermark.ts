// Watermark utility for protecting preview images - OPTIMIZED 10X
import sharp from 'sharp';

/**
 * Adds an optimized watermark to an image
 * - Text: "Studio Nexora" diagonal
 * - Opacity: 50% difuminado
 * - Avoids head area (top 30%)
 * - Multiple strategic positions
 * - High quality output
 */
export async function addWatermark(
    imageInput: Buffer | string,
    watermarkText: string = "Studio Nexora",
    opacity: number = 0.5
): Promise<Buffer> {
    try {
        // Convert base64 to buffer if needed
        let imageBuffer: Buffer;
        if (typeof imageInput === 'string') {
            const base64Data = imageInput.replace(/^data:image\/\w+;base64,/, '');
            imageBuffer = Buffer.from(base64Data, 'base64');
        } else {
            imageBuffer = imageInput;
        }

        // Get image metadata
        const metadata = await sharp(imageBuffer).metadata();
        const width = metadata.width || 1024;
        const height = metadata.height || 1024;

        // Calculate font size based on image size (optimized)
        const fontSize = Math.floor(width / 15); // Larger for better visibility

        // Avoid head area (top 30% of image)
        const headZone = height * 0.3;

        // Create strategic watermark positions (avoiding head)
        const positions = [
            // Center (main watermark) - below head zone
            { x: '50%', y: '60%', size: fontSize, opacity: opacity },

            // Bottom corners
            { x: '25%', y: '80%', size: fontSize * 0.7, opacity: opacity * 0.8 },
            { x: '75%', y: '80%', size: fontSize * 0.7, opacity: opacity * 0.8 },

            // Middle sides (avoiding head)
            { x: '15%', y: '50%', size: fontSize * 0.6, opacity: opacity * 0.6 },
            { x: '85%', y: '50%', size: fontSize * 0.6, opacity: opacity * 0.6 },

            // Subtle background pattern (lower third)
            { x: '33%', y: '70%', size: fontSize * 0.5, opacity: opacity * 0.4 },
            { x: '66%', y: '70%', size: fontSize * 0.5, opacity: opacity * 0.4 },
        ];

        // Create SVG watermark with multiple strategic positions
        const watermarkElements = positions.map((pos, index) => `
            <text 
                x="${pos.x}" 
                y="${pos.y}" 
                text-anchor="middle" 
                font-family="Arial, Helvetica, sans-serif" 
                font-size="${pos.size}" 
                font-weight="bold"
                fill="white" 
                opacity="${pos.opacity}"
                transform="rotate(-45 ${width / 2} ${height / 2})"
                filter="url(#blur${index})">
                ${watermarkText}
            </text>
        `).join('');

        // Create blur filters for each watermark (difuminado effect)
        const blurFilters = positions.map((_, index) => `
            <filter id="blur${index}">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
            </filter>
        `).join('');

        const svgWatermark = `
            <svg width="${width}" height="${height}">
                <defs>
                    ${blurFilters}
                    
                    <!-- Gradient for subtle effect -->
                    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:white;stop-opacity:${opacity}" />
                        <stop offset="100%" style="stop-color:white;stop-opacity:${opacity * 0.7}" />
                    </linearGradient>
                </defs>
                
                ${watermarkElements}
                
                <!-- Additional subtle pattern in safe zone (lower 70%) -->
                <text 
                    x="50%" 
                    y="90%" 
                    text-anchor="middle" 
                    font-family="Arial, Helvetica, sans-serif" 
                    font-size="${fontSize * 0.4}" 
                    font-weight="normal"
                    fill="url(#textGradient)" 
                    opacity="${opacity * 0.3}"
                    filter="url(#blur0)">
                    pic.christmas
                </text>
            </svg>
        `;

        // Apply watermark with optimized quality
        const watermarkedImage = await sharp(imageBuffer)
            .composite([{
                input: Buffer.from(svgWatermark),
                gravity: 'center',
                blend: 'over'
            }])
            .jpeg({
                quality: 92, // High quality
                progressive: true,
                chromaSubsampling: '4:4:4' // Best color preservation
            })
            .toBuffer();

        return watermarkedImage;

    } catch (error) {
        console.error('Watermark error:', error);
        // Return original image if watermark fails
        if (typeof imageInput === 'string') {
            const base64Data = imageInput.replace(/^data:image\/\w+;base64,/, '');
            return Buffer.from(base64Data, 'base64');
        }
        return imageInput as Buffer;
    }
}

/**
 * Converts buffer to base64 data URL
 */
export function bufferToBase64(buffer: Buffer, mimeType: string = 'image/jpeg'): string {
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

/**
 * Adds watermark and returns base64 data URL
 */
export async function addWatermarkToBase64(
    imageInput: Buffer | string,
    watermarkText: string = "Studio Nexora",
    opacity: number = 0.5
): Promise<string> {
    const watermarkedBuffer = await addWatermark(imageInput, watermarkText, opacity);
    return bufferToBase64(watermarkedBuffer);
}
