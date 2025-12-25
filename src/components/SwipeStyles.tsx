import { useSwipeable } from 'react-swipeable'
import { useState } from 'react'
import { X, Heart } from 'lucide-react'

export default function SwipeStyles({ styles, onLike, onSkip }: { styles: string[], onLike: (s: string) => void, onSkip: () => void }) {
    const [idx, setIdx] = useState(0)

    const handlers = useSwipeable({
        onSwipedLeft: () => { onSkip(); setIdx(idx + 1) },
        onSwipedRight: () => { onLike(styles[idx]); setIdx(idx + 1) },
        trackMouse: true
    })

    // End of stack
    if (idx >= styles.length) return (
        <div className="h-96 flex items-center justify-center text-white/50 text-sm border-2 border-dashed border-white/10 rounded-2xl">
            ¡Has visto todo por ahora!
        </div>
    )

    return (
        <div {...handlers} className="relative w-full h-96 rounded-2xl overflow-hidden select-none bg-neutral-900 shadow-2xl touch-pan-y">
            <img src={styles[idx]} className="w-full h-full object-cover pointer-events-none" alt="Style Key" />

            {/* Overlay controls hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <div className="flex justify-between items-center px-8 pb-4">
                    <button
                        onClick={() => { onSkip(); setIdx(idx + 1) }}
                        className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="text-xs uppercase tracking-widest text-white/40">Desliza</div>
                    <button
                        onClick={() => { onLike(styles[idx]); setIdx(idx + 1) }}
                        className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition"
                    >
                        <Heart className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    )
}
