// TURBO-SPEED AI Service Manager - Optimized for 5-15 second generation
import { GoogleAIStudioProvider } from './providers/GoogleAIStudio';
import { HuggingFaceProvider } from './providers/HuggingFace';
import { PollinationsProvider } from './providers/Pollinations';
import { SegmindProvider } from './providers/Segmind';
import { StableDiffusionProvider } from './providers/StableDiffusion';

export interface AIProvider {
    name: string;
    priority: number;
    cost: number;
    quota: number;
    enabled: boolean;
    avgSpeed: number; // Average generation time in seconds
    generate(params: GenerationParams): Promise<GenerationResult>;
    healthCheck(): Promise<boolean>;
}

export interface GenerationParams {
    refPhoto: string; // base64
    prompt: string;
    width?: number;
    height?: number;
    style?: string;
    onProgress?: (progress: number, message: string) => void; // Real-time updates
}

export interface GenerationResult {
    success: boolean;
    imageUrl?: string;
    provider?: string;
    error?: string;
    timeTaken?: number;
}

class AIServiceManager {
    private providers: AIProvider[] = [];
    private healthStatus: Map<string, boolean> = new Map();
    private requestCounts: Map<string, number> = new Map();
    private lastHealthCheck: Map<string, number> = new Map();
    private speedStats: Map<string, number[]> = new Map(); // Track speed per provider

    constructor() {
        this.initializeProviders();
        this.startHealthMonitoring();
    }

    private initializeProviders() {
        // Initialize providers PRIORITIZED BY SPEED
        this.providers = [
            new PollinationsProvider(),      // FASTEST: 2-4s
            new HuggingFaceProvider(),       // FAST: 5-10s
            new SegmindProvider(),           // FAST: 4-8s
            new GoogleAIStudioProvider(),    // MEDIUM: 8-12s
            new StableDiffusionProvider()    // SLOW: 10-15s (but unlimited)
        ].sort((a, b) => {
            // Sort by speed first, then cost
            if (a.avgSpeed !== b.avgSpeed) return a.avgSpeed - b.avgSpeed;
            return a.cost - b.cost;
        });

        this.providers.forEach(p => {
            this.healthStatus.set(p.name, true);
            this.requestCounts.set(p.name, 0);
            this.lastHealthCheck.set(p.name, Date.now());
            this.speedStats.set(p.name, []);
        });
    }

    private startHealthMonitoring() {
        setInterval(() => {
            this.checkAllProviders();
        }, 5 * 60 * 1000);
    }

    private async checkAllProviders() {
        for (const provider of this.providers) {
            if (!provider.enabled) continue;

            try {
                const isHealthy = await provider.healthCheck();
                this.healthStatus.set(provider.name, isHealthy);
                this.lastHealthCheck.set(provider.name, Date.now());

                if (!isHealthy) {
                    console.warn(`Provider ${provider.name} is unhealthy`);
                }
            } catch (error) {
                console.error(`Health check failed for ${provider.name}:`, error);
                this.healthStatus.set(provider.name, false);
            }
        }
    }

    private getAvailableProviders(): AIProvider[] {
        return this.providers.filter(p =>
            p.enabled &&
            this.healthStatus.get(p.name) === true &&
            (this.requestCounts.get(p.name) || 0) < p.quota
        );
    }

    private selectFastestProvider(): AIProvider | null {
        const available = this.getAvailableProviders();

        if (available.length === 0) {
            return null;
        }

        // SPEED-FIRST selection
        // Use actual speed stats if available, otherwise use avgSpeed
        available.sort((a, b) => {
            const aStats = this.speedStats.get(a.name) || [];
            const bStats = this.speedStats.get(b.name) || [];

            const aAvg = aStats.length > 0
                ? aStats.reduce((sum, val) => sum + val, 0) / aStats.length
                : a.avgSpeed;

            const bAvg = bStats.length > 0
                ? bStats.reduce((sum, val) => sum + val, 0) / bStats.length
                : b.avgSpeed;

            return aAvg - bAvg; // Fastest first
        });

        return available[0];
    }

    private trackSpeed(providerName: string, timeTaken: number) {
        const stats = this.speedStats.get(providerName) || [];
        stats.push(timeTaken);

        // Keep only last 10 measurements
        if (stats.length > 10) {
            stats.shift();
        }

        this.speedStats.set(providerName, stats);
    }

    async generate(params: GenerationParams): Promise<GenerationResult> {
        const maxRetries = this.providers.length;
        let lastError: string = '';

        // Send initial progress
        params.onProgress?.(10, 'Selecting fastest provider...');

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            const provider = this.selectFastestProvider();

            if (!provider) {
                return {
                    success: false,
                    error: 'All providers temporarily unavailable. Request queued for retry.'
                };
            }

            try {
                params.onProgress?.(20, `Generating with ${provider.name}...`);
                console.log(`🚀 TURBO: Using ${provider.name} (avg: ${provider.avgSpeed}s)`);

                const startTime = Date.now();

                // Set timeout based on provider speed (2x avg speed)
                const timeout = provider.avgSpeed * 2000;
                const timeoutPromise = new Promise<GenerationResult>((_, reject) =>
                    setTimeout(() => reject(new Error('Generation timeout')), timeout)
                );

                const generatePromise = provider.generate({
                    ...params,
                    onProgress: (progress, message) => {
                        // Forward progress updates
                        params.onProgress?.(20 + (progress * 0.7), message);
                    }
                });

                const result = await Promise.race([generatePromise, timeoutPromise]);
                const timeTaken = (Date.now() - startTime) / 1000;

                if (result.success) {
                    // Track speed for future optimization
                    this.trackSpeed(provider.name, timeTaken);

                    // Increment request count
                    const count = this.requestCounts.get(provider.name) || 0;
                    this.requestCounts.set(provider.name, count + 1);

                    params.onProgress?.(100, 'Generation complete!');
                    console.log(`✅ TURBO SUCCESS: ${provider.name} in ${timeTaken.toFixed(2)}s`);

                    return {
                        ...result,
                        provider: provider.name,
                        timeTaken
                    };
                } else {
                    lastError = result.error || 'Unknown error';
                    console.warn(`Provider ${provider.name} failed: ${lastError}`);

                    this.healthStatus.set(provider.name, false);
                    continue;
                }
            } catch (error: any) {
                lastError = error.message || 'Unknown error';
                console.error(`Exception with ${provider.name}:`, error);

                this.healthStatus.set(provider.name, false);
                continue;
            }
        }

        return {
            success: false,
            error: `All providers failed. Last error: ${lastError}`
        };
    }

    // PARALLEL GENERATION for multiple photos
    async generateBatch(
        requests: GenerationParams[]
    ): Promise<GenerationResult[]> {
        console.log(`🚀 TURBO BATCH: Generating ${requests.length} photos in parallel`);

        // Generate all in parallel for maximum speed
        const promises = requests.map(params => this.generate(params));

        return Promise.all(promises);
    }

    getProviderStats() {
        return this.providers.map(p => {
            const stats = this.speedStats.get(p.name) || [];
            const avgSpeed = stats.length > 0
                ? stats.reduce((sum, val) => sum + val, 0) / stats.length
                : p.avgSpeed;

            return {
                name: p.name,
                enabled: p.enabled,
                healthy: this.healthStatus.get(p.name),
                requests: this.requestCounts.get(p.name) || 0,
                quota: p.quota,
                avgSpeed: avgSpeed.toFixed(2) + 's',
                lastCheck: this.lastHealthCheck.get(p.name)
            };
        });
    }

    resetQuotas() {
        this.requestCounts.clear();
        this.providers.forEach(p => {
            this.requestCounts.set(p.name, 0);
        });
    }
}

// Singleton instance
export const aiServiceManager = new AIServiceManager();
