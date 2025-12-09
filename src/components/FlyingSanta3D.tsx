// components/FlyingSanta3D.tsx
'use client';

import React, { useEffect, useRef } from 'react';

export const FlyingSanta3D = () => {
    // Usamos una imagen (sprite) de alta calidad en lugar de Three.js pesado para mantener 60FPS
    // pero con animación CSS avanzada para dar efecto 3D
    const santaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const santa = santaRef.current;
        if (!santa) return;

        let startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;

            // Movimiento sinusoidal complejo para simular vuelo 3D
            // X: De derecha a izquierda (120vw a -20vw)
            // Y: Ondulación suave
            // Scale: Perspectiva (más grande cerca, más pequeño lejos)

            // Ciclo de 20 segundos
            const progress = (elapsed % 25000) / 25000;

            // Posición X: Va de 120% a -20%
            const x = 120 - (progress * 140);

            // Posición Y: Ondas
            const y = 10 + Math.sin(progress * Math.PI * 4) * 5;

            // Escala / Profundidad Z
            const scale = 0.8 + Math.sin(progress * Math.PI * 2) * 0.2;

            // Rotación leve (Banking turn)
            const rotation = Math.sin(progress * Math.PI * 8) * 5;

            // 🏇 ANIMACIÓN DE "GALOPE" (Rapid bobs)
            // Simula el movimiento de los renos corriendo y el trineo vibrando
            const gallop = Math.sin(elapsed / 150) * 2; // Rapido: cada 150ms 

            // Combinar Y sinusoidal grande con galope pequeño
            const finalY = y + gallop;

            if (santa) {
                santa.style.transform = `translate3d(${x}vw, ${finalY}vh, 0) scale(${scale}) rotate(${rotation}deg)`;

                // Reset (ocultar) cuando termina el ciclo para que no "salte"
                santa.style.opacity = (x > -20 && x < 120) ? '1' : '0';
            }

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, []);

    return (
        <div
            ref={santaRef}
            className="fixed top-0 left-0 z-40 pointer-events-none filter drop-shadow-2xl"
            style={{
                willChange: 'transform',
                opacity: 0, // Inicia invisible, controlado por JS
                pointerEvents: 'none'
            }}
        >
            <div className="relative">
                {/* 🎅 SANTA SPRITE (HD PNG) */}
                {/* 🎅 SANTA SPRITE (HD 3D RENDER) */}
                <img
                    src="/assets/santa_3d_final.png"
                    alt="Santa Flying"
                    onError={(e) => {
                        // Fallback if local fails for some reason
                        e.currentTarget.src = "https://cdn.pixabay.com/photo/2016/12/15/21/50/santa-claus-1909875_1280.png";
                    }}
                    className="h-32 md:h-64 object-contain"
                />

                {/* ✨ PARTICLES / MAGIC TRAIL */}
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <span className="absolute animate-ping w-2 h-2 bg-yellow-400 rounded-full opacity-75 top-0 -right-4"></span>
                        <span className="absolute animate-ping w-3 h-3 bg-white rounded-full opacity-50 top-4 -right-8 delay-100"></span>
                        <span className="absolute animate-ping w-1 h-1 bg-yellow-200 rounded-full opacity-90 -top-4 -right-6 delay-200"></span>
                    </div>
                </div>

                {/* 🎁 FALLING PRESENTS */}
                {/* Animación CSS pura para regalos cayendo */}
                <div className="absolute bottom-0 left-10 animate-drop-gift-1 opacity-0">🎁</div>
                <div className="absolute bottom-0 left-20 animate-drop-gift-2 opacity-0">🧸</div>
                <div className="absolute bottom-0 left-32 animate-drop-gift-3 opacity-0">🎄</div>
            </div>

            {/* Estilos CSS Inline para performance */}
            <style jsx>{`
                @keyframes drop-gift-1 {
                    0% { transform: translateY(0) rotate(0); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateY(80vh) rotate(360deg); opacity: 0; }
                }
                .animate-drop-gift-1 { animation: drop-gift-1 4s linear infinite; animation-delay: 2s; }
                .animate-drop-gift-2 { animation: drop-gift-1 5s linear infinite; animation-delay: 5s; }
                .animate-drop-gift-3 { animation: drop-gift-1 4.5s linear infinite; animation-delay: 10s; }
            `}</style>
        </div>
    );
};
