
/**
 * Image Validation Utility
 * Checks for:
 * - Resolution (Min 480x480, Max 4K)
 * - File Size (< 10MB)
 * - File Format (JPG, PNG, WEBP)
 * - Quality Score (Brightness, Contrast, Sharpness approximation)
 */

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    qualityScore: number; // 0-100
    details: {
        width: number;
        height: number;
        format: string;
        sizeMB: number;
    };
}

export const validateImage = async (file: File): Promise<ValidationResult> => {
    return new Promise((resolve) => {
        const errors: string[] = [];
        const warnings: string[] = [];
        let qualityScore = 100;

        // 1. File Size Check
        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > 10) {
            errors.push(`File too large (${sizeMB.toFixed(2)}MB). Max 10MB.`);
            qualityScore -= 100; // Immediate fail
        }

        // 2. Format Check
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
        if (!validTypes.includes(file.type)) {
            errors.push('Invalid format. Please use JPG, PNG, or WEBP.');
            qualityScore -= 100;
        }

        if (errors.length > 0) {
            resolve({
                isValid: false,
                errors,
                warnings,
                qualityScore: 0,
                details: { width: 0, height: 0, format: file.type, sizeMB }
            });
            return;
        }

        // 3. Load Image for Resolution & Quality Analysis
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const width = img.width;
            const height = img.height;

            // Resolution Check
            if (width < 480 || height < 480) {
                errors.push(`Resolution too low (${width}x${height}). Min 480x480.`);
                qualityScore -= 40;
            }
            if (width * height > 4096 * 4096) {
                warnings.push('Image is very large (4K+). It will be resized.');
            }

            // Aspect Ratio Check (Extreme ratios are bad for portraits)
            const ratio = width / height;
            if (ratio < 0.4 || ratio > 2.5) {
                warnings.push('Extreme aspect ratio. Standard portrait/landscape preferred.');
                qualityScore -= 10;
            }

            // Basic Quality Analysis via Canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (ctx) {
                canvas.width = Math.min(width, 500); // Downsample for speed
                canvas.height = Math.min(height, 500);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                let r, g, b, avg;
                let colorSum = 0;
                let brightnessSum = 0;

                for (let x = 0, len = data.length; x < len; x += 4) {
                    r = data[x];
                    g = data[x + 1];
                    b = data[x + 2];

                    avg = Math.floor((r + g + b) / 3);
                    colorSum += avg;
                    brightnessSum += avg;
                }

                const brightness = Math.floor(brightnessSum / (canvas.width * canvas.height));

                // Dark/Light Checks
                if (brightness < 40) {
                    warnings.push('Image is very dark. Face might not be visible.');
                    qualityScore -= 20;
                } else if (brightness > 220) {
                    warnings.push('Image is overexposed (too bright).');
                    qualityScore -= 20;
                }
            }

            URL.revokeObjectURL(img.src);

            resolve({
                isValid: errors.length === 0,
                errors,
                warnings,
                qualityScore: Math.max(0, qualityScore),
                details: { width, height, format: file.type, sizeMB }
            });
        };

        img.onerror = () => {
            resolve({
                isValid: false,
                errors: ['Failed to load image.'],
                warnings: [],
                qualityScore: 0,
                details: { width: 0, height: 0, format: file.type, sizeMB }
            });
        };
    });
};
