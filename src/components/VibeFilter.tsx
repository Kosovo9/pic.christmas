import { useState } from 'react'
import { Badge } from '@/components/redesign' // Reusing redesign badge for consistency

const vibes = ['Cinemático', 'Pixar', 'Realista', 'Vintage', 'Lujo', 'Nieve', 'Neon']

export default function VibeFilter({ onChange }: { onChange: (v: string[]) => void }) {
    const [sel, setSel] = useState<string[]>([])

    const toggle = (v: string) => {
        const next = sel.includes(v) ? sel.filter(x => x !== v) : [...sel, v]
        setSel(next)
        onChange(next)
    }

    return (
        <div className="flex gap-2 flex-wrap pb-4">
            {vibes.map(v => (
                <button
                    key={v}
                    onClick={() => toggle(v)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border border-white/10
            ${sel.includes(v)
                            ? 'bg-white text-black scale-105 shadow-lg'
                            : 'bg-transparent text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                >
                    {v}
                </button>
            ))}
        </div>
    )
}
