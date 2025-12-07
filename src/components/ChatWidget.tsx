"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';
import { faqData, smartKeywords } from '../data/faqs';

export const ChatWidget = () => {
    const { language, t } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: language === 'es' ? "¡Hola! Soy Holly 🎄. ¿En qué puedo ayudarte hoy? Puedes escribirme o hablarme." : "Hi! I'm Holly 🎄. How can I help you today? You can type or speak to me." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    // Update greeting when language changes if chat is empty or default
    useEffect(() => {
        if (messages.length === 1 && messages[0].role === 'bot') {
            setMessages([
                { role: 'bot', text: language === 'es' ? "¡Hola! Soy Holly 🎄. ¿En qué puedo ayudarte hoy?" : "Hi! I'm Holly 🎄. How can I help you?" }
            ]);
        }
    }, [language]);

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
            const faqs = faqData[language as keyof typeof faqData] || faqData['en'];
            const answer = faqs[localMatchIndex]?.a;

            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'bot', text: answer }]);
                setIsTyping(false);
            }, 600);
            return;
        }

        // 2. AI Fallback (Gemini) 🤖
        try {
            // Ensure we are hitting the correct endpoint /api/chat which proxies to backend
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    language,
                    // Send minimal history context if needed
                    history: messages.slice(-4).map(m => ({
                        role: m.role === 'user' ? 'user' : 'model',
                        parts: [{ text: m.text }]
                    }))
                })
            });

            if (!res.ok) throw new Error('Network response was not ok');

            const data = await res.json();
            setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'bot', text: language === 'es' ? "❄️ Mi conexión está un poco fría. ¿Intentamos de nuevo?" : "❄️ Connection error. Let's try that again?" }]);
        } finally {
            setIsTyping(false);
        }
    };

    const toggleListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition not supported in this browser. Try Chrome!");
            return;
        }

        if (isListening) {
            setIsListening(false);
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = language === 'en' ? 'en-US' :
            language === 'es' ? 'es-ES' :
                language === 'fr' ? 'fr-FR' :
                    language === 'de' ? 'de-DE' :
                        language === 'it' ? 'it-IT' :
                            language === 'pt' ? 'pt-BR' :
                                language === 'ru' ? 'ru-RU' :
                                    language === 'zh' ? 'zh-CN' :
                                        language === 'ja' ? 'ja-JP' :
                                            language === 'ar' ? 'ar-SA' : 'en-US';

        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            // Optionally auto-send: handleSend(); 
            // But usually better to let user confirm.
            setTimeout(() => inputRef.current?.focus(), 100);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center
                    ${isOpen ? 'bg-slate-800 rotate-90 border border-slate-600' : 'bg-gradient-to-r from-blue-600 to-emerald-500 animate-bounce-slow hover:shadow-emerald-500/50'}
                `}
            >
                {isOpen ? '✕' : <span className="text-2xl">💬</span>}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up h-[550px]">
                    {/* Header */}
                    <div
                        className="bg-slate-800/80 p-4 border-b border-slate-700 flex items-center justify-between gap-3 relative overflow-hidden cursor-pointer"
                        onClick={() => setIsOpen(false)}
                        title="Click to minimize"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none" />
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-10 h-10 bg-emerald-900/50 rounded-full flex items-center justify-center text-xl border border-emerald-500/30 relative z-10">
                                🧝‍♀️
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Elf Holly</h3>
                                <p className="text-xs text-emerald-400 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                    {language === 'es' ? 'En línea 24/7' : 'Online 24/7'}
                                </p>
                            </div>
                        </div>
                        {/* Minimize Icon */}
                        <button
                            className="text-slate-400 hover:text-white transition-colors p-1"
                            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                        >
                            <span className="text-xl font-bold">_</span>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('/noise.png')] bg-opacity-5">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
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
                                <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 flex gap-1 items-center h-10">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-slate-800/90 border-t border-slate-700">
                        <div className="flex gap-2 items-center">
                            {/* Voice Input Button */}
                            <button
                                onClick={toggleListening}
                                className={`p-2 rounded-xl transition-all duration-300 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'}`}
                                title="Hold to speak"
                            >
                                {isListening ? '🎙️' : '🎤'}
                            </button>

                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={isListening ? "Listening..." : (language === 'es' ? "Escribe un mensaje..." : "Type a message...")}
                                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 placeholder-slate-500 disabled:opacity-50"
                                disabled={isListening}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white p-2 rounded-xl transition-colors w-10 h-10 flex items-center justify-center font-bold"
                            >
                                ➤
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                                ⚡ Powered by <span className="text-emerald-500/80">Pic.Christmas AI v2</span>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
