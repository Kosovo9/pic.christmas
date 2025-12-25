import { pipeline } from '@xenova/transformers'

let extractor: any

export async function initSemantic() {
    if (!extractor) {
        extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
    }
}

export async function search(query: string, styles: { id: string; tags: string[] }[]) {
    if (!extractor) await initSemantic()

    // Clean query and styles for comparison
    const qVec = await extractor(query, { pooling: 'mean', normalize: true })

    // Calculate scores
    const scores = await Promise.all(styles.map(async s => {
        const sVec = await extractor(s.tags.join(' '), { pooling: 'mean', normalize: true })
        return {
            ...s,
            score: cosine(qVec.data, sVec.data)
        }
    }))

    return scores.sort((a, b) => b.score - a.score).slice(0, 20)
}

const cosine = (a: number[], b: number[]) => {
    const dot = a.reduce((s, v, i) => s + v * b[i], 0)
    const normA = Math.hypot(...a), normB = Math.hypot(...b)
    if (normA === 0 || normB === 0) return 0
    return dot / (normA * normB)
}
