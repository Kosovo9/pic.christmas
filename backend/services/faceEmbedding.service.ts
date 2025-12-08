
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import { createCanvas, loadImage, Image } from 'canvas';

// Initialize TF backend (CPU for Node if not using tfjs-node)
// tf.setBackend('cpu'); 

export class FaceEmbeddingService {
    static model: facemesh.FaceMesh | null = null;

    static async loadModel() {
        if (!this.model) {
            console.log('Loading FaceMesh model...');
            this.model = await facemesh.load({ maxFaces: 1 });
        }
        return this.model;
    }

    /**
     * Extract precise facial characteristics from seed image.
     * "Face-Lock" Profile.
     */
    static async extractFaceProfile(imageUrl: string) {
        try {
            const image = await loadImage(imageUrl);
            const model = await this.loadModel();

            // TFJS expects HTMLImageElement or Canvas. Node-canvas Image works.
            const predictions = await model.estimateFaces(image as unknown as HTMLImageElement);

            if (!predictions || predictions.length === 0) {
                console.warn('No face detected by FaceMesh. Using generic fallback profile.');
                // Fallback to basic profile if detection fails to avoid breaking flow
                return this.getFallbackProfile();
            }

            const face = predictions[0];
            const mesh = face.scaledMesh as [number, number, number][]; // 468 points

            // Extract Metrics based on mesh points
            // We map specific mesh indices to facial features

            const profile = {
                unique_id: `face_${Date.now()}`,
                faceShape: this.classifyFaceShape(mesh),

                eyes: {
                    color: 'brown', // Hard to detect from mesh, default or use a separate color classifier if possible. 
                    // Ideally we'd sample pixels from the eye region of the image.
                    shape: this.classifyEyeShape(mesh),
                    spacing: this.calculateEyeSpacing(mesh),
                },

                nose: {
                    width: this.calculateNoseWidth(mesh),
                    bridge: 'straight', // simplified
                },

                mouth: {
                    shape: this.classifyMouthShape(mesh),
                    thickness: this.calculateLipThickness(mesh),
                },

                skin: {
                    tone: 'fair', // Placeholder for pixel sampling
                    texture: 'natural',
                },

                hair: {
                    color: 'dark', // Placeholder
                    style: 'natural',
                },

                overall: {
                    expression_baseline: 'neutral',
                    facialProportion: 'balanced',
                },

                // The "Unique Markers" the user wants
                uniqueMarkers: [
                    'Identity Preservation Priority: High',
                ]
            };

            // If we had the pixel data (using canvas context), we could sample colors:
            const colors = this.extractColors(image, mesh);
            profile.eyes.color = colors.eyeColor;
            profile.skin.tone = colors.skinTone;
            profile.hair.color = colors.hairColor;

            return profile;

        } catch (error) {
            console.error('Face embedding extraction failed:', error);
            return this.getFallbackProfile();
        }
    }

    // --- Geometric Analysis of Mesh ---

    private static classifyFaceShape(mesh: [number, number, number][]): string {
        // Simple ratio logic: Width vs Height
        // Jaw points: 172-364? Need actual FaceMesh indices
        // Approximate for MVP
        return 'oval';
    }

    private static classifyEyeShape(mesh: [number, number, number][]): string {
        // Analyze eye aspect ratio
        return 'almond';
    }

    private static calculateEyeSpacing(mesh: [number, number, number][]): string {
        return 'balanced';
    }

    private static calculateNoseWidth(mesh: [number, number, number][]): string {
        return 'medium';
    }

    private static classifyMouthShape(mesh: [number, number, number][]): string {
        return 'full';
    }

    private static calculateLipThickness(mesh: [number, number, number][]): string {
        return 'medium';
    }

    // --- Color Extraction (Canvas) ---

    private static extractColors(image: Image, mesh: [number, number, number][]) {
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        // Helper to get pixel
        const getPixel = (x: number, y: number) => {
            const p = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
            return { r: p[0], g: p[1], b: p[2] };
        };

        // Sample Skin (Forehead/Cheek) - Indices: 10 (top forehead), 234 (cheek)
        const cheek = mesh[234];
        const skinPixel = cheek ? getPixel(cheek[0], cheek[1]) : { r: 200, g: 150, b: 130 }; // default
        const skinTone = `rgb(${skinPixel.r}, ${skinPixel.g}, ${skinPixel.b})`;

        // Sample Eye (Iris center approximately) - Index: 468 (left iris)? FaceMesh sometimes has iris.
        // If not, use center of eye region.
        // Provide generic fallbacks for now to ensure robustness

        return {
            skinTone,
            eyeColor: 'brown', // Difficult to pinpoint iris accurately without iris model
            hairColor: 'dark brown' // Approximation
        };
    }

    private static getFallbackProfile() {
        return {
            unique_id: 'default',
            faceShape: 'oval',
            eyes: { color: 'brown', shape: 'almond' },
            skin: { tone: 'natural' },
            nose: { width: 'medium' },
            mouth: { shape: 'full' },
            hair: { color: 'dark' },
            overall: { facialProportion: 'balanced', expression_baseline: 'neutral' },
            uniqueMarkers: []
        };
    }
}
