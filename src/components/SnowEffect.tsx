"use client";

import { useEffect, useRef } from 'react';

export const SnowEffect = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const snowflakes: { x: number; y: number; r: number; d: number }[] = [];
        const maxFlakes = 100;

        for (let i = 0; i < maxFlakes; i++) {
            snowflakes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 3 + 1, // radius
                d: Math.random() * maxFlakes // density
            });
        }

        let animationFrameId: number;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
            ctx.beginPath();

            for (let i = 0; i < maxFlakes; i++) {
                const p = snowflakes[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            }

            ctx.fill();
            update();
            animationFrameId = requestAnimationFrame(draw);
        };

        const update = () => {
            let angle = 0;
            angle += 0.01;

            for (let i = 0; i < maxFlakes; i++) {
                const p = snowflakes[i];

                // Updating X and Y coordinates
                // We add 1 to cos function to prevent negative values which may move flakes upwards
                // Every particle has its own density which can be used to make the downward movement different for each flake
                // Let's make it more natural downward flow
                p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
                p.x += Math.sin(angle) * 2;

                // Sending flakes back from the top when it exits
                // Lets make it exit the right too
                if (p.x > width + 5 || p.x < -5 || p.y > height) {
                    if (i % 3 > 0) { // 66.67% of the flakes
                        snowflakes[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d };
                    } else {
                        // If the flake is exitting from the right
                        if (Math.sin(angle) > 0) {
                            // Enter from the left
                            snowflakes[i] = { x: -5, y: Math.random() * height, r: p.r, d: p.d };
                        } else {
                            // Enter from the right
                            snowflakes[i] = { x: width + 5, y: Math.random() * height, r: p.r, d: p.d };
                        }
                    }
                }
            }
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
            style={{ opacity: 0.7 }}
        />
    );
};
