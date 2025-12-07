"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';
import { faqData, smartKeywords } from '../data/faqs';

export const ChatWidget = () => {
    const { language, t } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: language === 'es' ? "¡Hola! Soy Holly 🎄. ¿En qué puedo ayudarte hoy?" : "Hi! I'm Holly 🎄. How can I help you regarding your Christmas photos?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput("");
        setIsTyping(true);

        // 1. Local Smart Match (Zero Latency) ⚡
        let localMatchIndex = -1;
        const lowerMsg = userMsg.toLowerCase();

        for (const [key, index] of Object.entries(smartKeywords)) {
            const keywords = key.split('|');
            if (keywords.some(k => lowerMsg.includes(k))) {
                localMatchIndex = index;
                break;
            }
        }

        if (localMatchIndex !== -1) {
            // Found local answer!
            const faqs = faqData[language as keyof typeof faqData] || faqData['en'];
            const answer = faqs[localMatchIndex]?.a;

            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'bot', text: answer }]);
                setIsTyping(false);
            }, 600); // Fake typing delay for realism
            return;
        }

        // 2. AI Fallback (Gemini) 🤖
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    language
                })
            });
            const data = await res.json();

            setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', text: "❄️ Connection error. Let's try that again?" }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center
                    ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-r from-blue-600 to-green-500 animate-bounce-slow'}
                `}
            >
                {isOpen ? '✕' : <span className="text-2xl">💬</span>}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up h-[500px]">
                    {/* Header */}
                    <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-900/50 rounded-full flex items-center justify-center text-xl border border-green-500/30">
                            🧝‍♀️
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Elf Holly</h3>
                            <p className="text-xs text-green-400 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Online 24/7
                            </p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('/noise.png')] bg-opacity-5">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed
                                    ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'}
                                `}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 flex gap-1">
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-slate-800 border-t border-slate-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition-colors"
                            >
                                ➤
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-[10px] text-slate-500">
                                Powered by pic.christmas AI Protocol v2
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
