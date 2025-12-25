"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';

export function ChatHolly() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
        { role: 'assistant', text: 'Hi! I\'m Holly 🎄, your 24/7 Christmas helper. Ask me about photos, timing, or pricing!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages.map(m => ({
                        role: m.role === 'assistant' ? 'model' : 'user',
                        parts: [{ text: m.text }]
                    })),
                    language: 'English' // Dynamic in prod
                })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm a bit frozen! Try again? ❄️" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-christmas-red text-white p-4 rounded-full shadow-2xl hover:scale-110 transition active:scale-95 flex items-center gap-2 group border border-white/20"
                >
                    <Sparkles className="w-5 h-5 text-christmas-gold animate-pulse" />
                    <span className="font-bold text-sm pr-2 hidden group-hover:block">Chat with Holly</span>
                    <MessageCircle className="w-6 h-6" />
                </button>
            )}

            {isOpen && (
                <div className="bg-[#0f172a] border border-white/10 w-[350px] h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
                    <div className="bg-gradient-to-r from-christmas-red to-red-900 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center text-xl">🎄</div>
                            <div>
                                <div className="font-bold text-sm">Elf Holly</div>
                                <div className="text-[10px] text-white/60">Live 24/7 AI Success</div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300'}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 p-3 rounded-2xl">
                                    <Loader2 className="w-4 h-4 animate-spin text-christmas-gold" />
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>

                    <div className="p-4 bg-black/40 border-t border-white/5 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-christmas-gold transition"
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className="bg-christmas-gold text-black p-2 rounded-xl hover:scale-105 active:scale-95 transition"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
