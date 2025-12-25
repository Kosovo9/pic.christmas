import { useState, useEffect } from 'react'
import { Terminal } from 'lucide-react'

const phrases = [
    'Analizando biométrica...',
    'Renderizando fotones...',
    'Invocando elfos cuánticos...',
    'Aplicando nieve procedural...',
    'Optimizando luminosidad 8K...',
    'Sincronizando con Polo Norte...'
]

export default function HackerLoader() {
    const [i, setI] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setI(p => (p + 1) % phrases.length), 2000)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="flex flex-col items-center gap-4 p-8 bg-black/80 backdrop-blur-xl border border-green-500/30 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
                <Terminal className="w-6 h-6 text-green-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="font-mono text-green-400 text-sm animate-pulse flex items-center gap-2">
                <span className="text-green-600">&gt;</span>
                <span className="typing-effect">{phrases[i]}</span>
                <span className="inline-block w-2 h-4 bg-green-500 animate-cursor-blink ml-1" />
            </div>

            <div className="w-48 h-1 bg-green-900/50 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-green-500 animate-progress-indeterminate"></div>
            </div>
        </div>
    )
}
