
import { v4 as uuidv4 } from 'uuid';

type ExperimentId = 'cta_text' | 'price_display' | 'gallery_layout';
type VariantId = string;

interface Experiment {
    id: ExperimentId;
    variants: VariantId[];
    weights?: number[]; // Default equal split
}

const EXPERIMENTS: Experiment[] = [
    { id: 'cta_text', variants: ['create_magic', 'transform_now', 'start_free_trial'] },
    { id: 'price_display', variants: ['per_pack', 'per_photo', 'subscription_focus'] },
    { id: 'gallery_layout', variants: ['grid', 'carousel', 'masonry'] }
];

class ABTestManager {
    private static instance: ABTestManager;
    private assignments: Record<ExperimentId, VariantId> = {} as any;
    private userId: string;

    private constructor() {
        this.userId = this.getUserId();
        this.loadAssignments();
    }

    public static getInstance(): ABTestManager {
        if (!ABTestManager.instance) {
            ABTestManager.instance = new ABTestManager();
        }
        return ABTestManager.instance;
    }

    public getVariant(experimentId: ExperimentId): VariantId {
        if (!this.assignments[experimentId]) {
            this.assignVariant(experimentId);
        }
        return this.assignments[experimentId];
    }

    public trackConversion(experimentId: ExperimentId, eventName: string) {
        const variant = this.getVariant(experimentId);
        console.log(`[AB_TEST] User ${this.userId} converted on ${experimentId}:${variant} via ${eventName}`);
        // TODO: Send to backend/analytics (PostHog, Google Analytics, Custom API)
    }

    private getUserId(): string {
        try {
            let id = localStorage.getItem('pic_christmas_user_id');
            if (!id) {
                id = uuidv4();
                localStorage.setItem('pic_christmas_user_id', id);
            }
            return id;
        } catch {
            return 'anonymous';
        }
    }

    private loadAssignments() {
        try {
            const saved = localStorage.getItem('ab_assignments');
            if (saved) {
                this.assignments = JSON.parse(saved);
            }
        } catch { }
    }

    private assignVariant(experimentId: ExperimentId) {
        const experiment = EXPERIMENTS.find(e => e.id === experimentId);
        if (!experiment) return;

        // Simple random assignment for now (can use murmurhash of user_id for deterministic consistency)
        const randomIndex = Math.floor(Math.random() * experiment.variants.length);
        const variant = experiment.variants[randomIndex];

        this.assignments[experimentId] = variant;
        this.saveAssignments();

        console.log(`[AB_TEST] Assigned ${experimentId} -> ${variant}`);
    }

    private saveAssignments() {
        try {
            localStorage.setItem('ab_assignments', JSON.stringify(this.assignments));
        } catch { }
    }
}

export const abTestManager = ABTestManager.getInstance();
export const useVariant = (experimentId: ExperimentId) => abTestManager.getVariant(experimentId);
