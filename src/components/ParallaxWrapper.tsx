"use client";

import React, { useRef } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';

interface ParallaxWrapperProps {
    children: React.ReactNode;
    offset?: number;
    className?: string;
    speed?: number; // 0.5 = slower than scroll, 1 = normal, 2 = faster
}

export const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
    children,
    offset = 50,
    className = "",
    speed = 0.5
}) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Create a smooth spring-loaded parallax effect
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const y = useTransform(smoothProgress, [0, 1], [offset * speed, -offset * speed]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div style={{ y }} className="relative z-10">
                {children}
            </motion.div>
        </div>
    );
};
