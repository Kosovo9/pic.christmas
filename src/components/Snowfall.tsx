"use client";

import React, { useEffect, useState } from 'react';

export const Snowfall = () => {
    const [flakes, setFlakes] = useState<{ id: number; left: number; animationDuration: number; opacity: number }[]>([]);

    useEffect(() => {
        const initialFlakes = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: Math.random() * 5 + 5,
            opacity: Math.random() * 0.5 + 0.1
        }));
        setFlakes(initialFlakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {flakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute top-[-10px] text-white select-none pointer-events-none"
                    style={{
                        left: `${flake.left}%`,
                        opacity: flake.opacity,
                        animation: `fall ${flake.animationDuration}s linear infinite`,
                        fontSize: `${Math.random() * 10 + 10}px`
                    }}
                >
                    ❄
                </div>
            ))}
            <style jsx>{`
                @keyframes fall {
                    0% {
                        transform: translateY(-10vh) translateX(0px) rotate(0deg);
                    }
                    100% {
                        transform: translateY(110vh) translateX(20px) rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};
