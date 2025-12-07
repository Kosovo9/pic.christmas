"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    strength?: number; // How strong the pull is
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    onClick,
    className = "",
    strength = 30
}) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = (clientX - centerX) / width; // -0.5 to 0.5
        const deltaY = (clientY - centerY) / height;

        setPosition({
            x: deltaX * strength,
            y: deltaY * strength
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            className={`relative overflow-hidden group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {/* Cinematic Glow Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            {/* Content */}
            <span className="relative z-10 block">
                {children}
            </span>

            {/* Shine Sweep Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none" />
        </motion.button>
    );
};
