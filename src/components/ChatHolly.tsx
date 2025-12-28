"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { messages as i18nMessages, Locale } from '@/lib/messages';

interface ChatHollyProps {
    language: Locale;
}

export function ChatHolly({ language = 'es' }: ChatHollyProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize/Update welcome message when language changes or first render
    useEffect(() => {
        const welcomeMsg = i18nMessages[language]?.chat_welcome || i18nMessages['en'].chat_welcome;
        setMessages([{ role: 'assistant', text: welcomeMsg }]);
    }, [language]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

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
                    language: language
                })
            });

            if (!res.ok) throw new Error("Network response was not ok");

            const data = await res.json();
            if (data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
            } else {
                throw new Error("Empty reply from AI");
            }
        } catch (e) {
            console.error("Chat Error:", e);
            const errorMsg = language === 'es' ? "¡Ups! Me he quedado un poco congelada. ¿Podrías intentarlo de nuevo? ❄️" : "Sorry, I'm a bit frozen! Try again? ❄️";
            setMessages(prev => [...prev, { role: 'assistant', text: errorMsg }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-christmas-red text-white p-3 rounded-full shadow-2xl hover:scale-110 transition active:scale-95 flex items-center gap-2 group border border-white/20"
                >
                    <Sparkles className="w-4 h-4 text-christmas-gold animate-pulse" />
                    <span className="font-bold text-xs pr-1 hidden group-hover:block">Holly AI</span>
                    <MessageCircle className="w-5 h-5" />
                </button>
            )}

            {isOpen && (
                <div className="bg-black/90 backdrop-blur-2xl border border-white/10 w-[320px] h-[500px] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                    <div className="bg-white/5 p-6 flex justify-between items-center border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-gold w-12 h-12 rounded-full flex items-center justify-center text-black font-bold shadow-gold">H</div>
                            <div>
                                <div className="font-serif text-lg text-white">Holly AI</div>
                                <div className="text-[9px] uppercase tracking-[0.2em] text-christmas-gold font-bold">Quantum Assistant</div>
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
