import { api } from './api';

// Helper to resize image for faster transmission (max 512px)
const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_SIZE = 512;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_SIZE) {
                        height *= MAX_SIZE / width;
                        width = MAX_SIZE;
                    }
                } else {
                    if (height > MAX_SIZE) {
                        width *= MAX_SIZE / height;
                        height = MAX_SIZE;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // Moderate compression
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const ContentSafetyService = {
    scanFiles: async (files: File[]): Promise<{ safe: boolean; reason?: string }> => {
        console.log(`🛡️ ELON SAFE: Scanning ${files.length} files with Gemini Vision...`);

        // Helper for single file check with retry
        const checkFile = async (file: File, retries = 1): Promise<any> => {
            try {
                const base64 = await resizeImage(file);
                const res = await fetch('/api/ai/safety-check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64 })
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.reason || `Safety check failed (${res.status})`);
                }

                return res.json();
            } catch (err: any) {
                if (retries > 0) {
                    console.warn(`Safety scan retry (${retries} left)...`);
                    await new Promise(r => setTimeout(r, 1000));
                    return checkFile(file, retries - 1);
                }
                throw err;
            }
        };

        try {
            const checks = files.map(file => checkFile(file));
            const results = await Promise.all(checks);

            // If ANY file is unsafe, fail the whole batch
            const unsafe = results.find((r: any) => r.safe === false);
            if (unsafe) {
                console.warn("🛡️ Content Blocked:", unsafe.reason);
                return { safe: false, reason: unsafe.reason || "Content flagged by AI Safety System." };
            }

            console.log("✅ All files safe.");
            return { safe: true };

        } catch (error: any) {
            console.error("Safety Scan Error:", error);
            // DEV MODE: Fail-open if safety service unavailable
            console.warn("⚠️ Safety check bypassed - service unavailable (DEV MODE)");
            return {
                safe: true,
                reason: 'Safety check bypassed (service unavailable)'
            };
        }
    }
};
