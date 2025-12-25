"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';

/**
 * COMPONENTE STITCH 3D INTERACTIVO
 * 
 * Este componente renderiza un personaje Stitch 3D animado que:
 * - Responde al hover y click
 * - Tiene animaciones de entrada (saludo)
 * - Puede bailar (modo fiesta)
 * - Emite partículas (nieve/confeti)
 * - Reproduce sonidos opcionales
 */

interface StitchCharacterProps {
    initialAction?: 'wave' | 'dance' | 'idle' | 'jump';
    interactive?: boolean;
    className?: string;
}

export const StitchCharacter: React.FC<StitchCharacterProps> = ({
    initialAction = 'idle',
    interactive = true,
    className = '',
}) => {
    const [action, setAction] = useState(initialAction);
    const [isHovered, setIsHovered] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Efecto de partículas cuando Stitch baila o salta
    useEffect(() => {
        if (action === 'dance' || action === 'jump') {
            const interval = setInterval(() => {
                const newParticle = {
                    id: Date.now(),
                    x: Math.random() * 100, // %
                    y: Math.random() * 100, // %
                };
                setParticles(prev => [...prev.slice(-10), newParticle]);
            }, 500);
            return () => clearInterval(interval);
        }
    }, [action]);

    // Manejador de interacción
    const handleInteraction = () => {
        if (!interactive) return;

        if (soundEnabled && audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(() => { });
        }

        // Ciclo de animaciones: idle -> wave -> dance -> jump -> idle
        const cycle = ['idle', 'wave', 'dance', 'jump'];
        const nextIndex = (cycle.indexOf(action) + 1) % cycle.length;
        setAction(cycle[nextIndex] as any);
    };

    // Variantes de animación para Framer Motion
    const variants = {
        idle: {
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0],
            transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        },
        wave: {
            rotate: [0, 15, -10, 15, 0],
            y: [0, -5, 0],
            transition: { duration: 1.5, repeat: Infinity }
        },
        dance: {
            y: [0, -20, 0, -15, 0],
            x: [0, -10, 10, -10, 0],
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.05, 0.95, 1.05, 1],
            transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        },
        jump: {
            y: [0, -50, 0],
            scale: [1, 0.9, 1.1, 1],
            transition: { duration: 0.8, repeat: Infinity }
        }
    };

    return (
        <div className={`relative group ${className}`}>
            {/* Controles de Sonido (Opcional, aparece en hover) */}
            <AnimatePresence>
                {isHovered && interactive && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onClick={(e) => { e.stopPropagation(); setSoundEnabled(!soundEnabled); }}
                        className="absolute -top-12 right-0 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 text-white hover:bg-white/20 transition z-20"
                    >
                        {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Personaje */}
            <motion.div
                className="relative z-10 cursor-pointer"
                variants={variants}
                animate={action}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handleInteraction}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Halo de luz tras Stitch */}
                <div className="absolute inset-0 bg-christmas-gold/20 blur-[50px] rounded-full transform scale-75 animate-pulse-slow" />

                {/* Imagen del personaje - Placeholder si no existe la imagen real aun */}
                {/* En producción, usar '/stitch-3d-character.png' */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl">
                    <Image
                        src="/stitch-3d-character.png"
                        alt="Stitch 3D Christmas"
                        fill
                        className="object-contain"
                        priority
                        onError={(e) => {
                            // Fallback visual si la imagen no carga
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-blue-500/20', 'rounded-full');
                        }}
                    />
                    {/* Fallback text if image missing (hidden by default image logic) */}
                    <div className="absolute inset-0 flex items-center justify-center text-8xl pointer-events-none opacity-0">
                        🎅
                    </div>
                </div>
            </motion.div>

            {/* Partículas generadas dinámicamente */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 1, y: 0, scale: 0 }}
                        animate={{ opacity: 0, y: -100, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute text-yellow-400"
                        style={{ left: `${p.x}%`, top: '50%' }}
                    >
                        <Sparkles size={20} />
                    </motion.div>
                ))}
            </div>

            {/* Sombra del personaje */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black/40 blur-xl rounded-full" />

            {/* Elemento de audio oculto */}
            <audio ref={audioRef} src="/stitch-laugh.mp3" />
        </div>
    );
};

export default StitchCharacter;
