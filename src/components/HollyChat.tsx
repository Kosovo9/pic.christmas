import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Sparkles } from 'lucide-react'

export default function HollyChat() {
    const [hist, setHist] = useState<any[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [hist])

    const send = async () => {
        if (!input.trim()) return
        const newHist = [...hist, { role: 'user', content: input }]
        setHist(newHist)
        setInput('')
        setLoading(true)

        try {
            const res = await fetch('/api/holly', { method: 'POST', body: JSON.stringify({ message: input, history: hist }) })
            const { reply } = await res.json()
            setHist([...newHist, { role: 'assistant', content: reply }])
        } catch (e) {
            setHist([...newHist, { role: 'assistant', content: "Lo siento, tuve un problema de conexión con el Polo Norte." }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-full bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-christmas-red/10 p-3 border-b border-white/5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-christmas-gold" />
                <span className="font-serif text-white font-bold text-sm">Chat con Holly</span>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {hist.length === 0 && (
                    <div className="text-center text-white/30 text-xs py-10">
                        ¡Hola! Pregúntame sobre estilos o precios.
                    </div>
                )}
                {hist.map((m, i) => (
                    <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${m.role === 'user' ? 'bg-white/20' : 'bg-christmas-gold text-black'}`}>
                            {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                        </div>
                        <div className={`max-w-[80%] p-2 rounded-xl text-xs ${m.role === 'user' ? 'bg-white/10 text-white' : 'bg-christmas-gold/10 text-christmas-gold border border-christmas-gold/20'}`}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {loading && <div className="text-xs text-white/30 animate-pulse pl-8">Escribiendo...</div>}
            </div>

            <div className="p-3 bg-white/5 border-t border-white/5 flex gap-2">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && send()}
                    placeholder="Escribe aquí..."
                    className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder:text-white/20"
                />
                <button onClick={send} disabled={loading} className="text-christmas-gold hover:text-white transition">
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
