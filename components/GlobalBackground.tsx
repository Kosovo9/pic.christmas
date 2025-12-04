import React, { useEffect, useState } from 'react';

export const GlobalBackground: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Dense snow effect
    setSnowflakes(Array.from({ length: 350 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {/* Deep Vignette & Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a0505] via-[#1a0505] to-[#000000]"></div>

      {/* 3D Planet Earth (Left Side) */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-32 sm:-left-20 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] opacity-80 mix-blend-screen">
        {/* Earth Image */}
        <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1200px-Earth_Western_Hemisphere_transparent_background.png" 
            alt="Global Christmas" 
            className="w-full h-full object-contain animate-spin-slow opacity-60"
        />
        {/* Atmosphere Glow */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_100px_rgba(50,100,255,0.2)]"></div>
      </div>

      {/* Right Side Warm Glow */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[800px] bg-gradient-to-l from-[#D4AF37]/10 to-transparent blur-[100px]"></div>

      {/* Premium Snow Effect */}
      <div className="absolute inset-0">
        {snowflakes.map((i) => (
            <div 
                key={i} 
                className="snowflake" 
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 15 + 10}s`, 
                    animationDelay: `-${Math.random() * 20}s`, 
                    opacity: Math.random() * 0.7 + 0.3,
                    width: `${Math.random() * 3 + 2}px`, 
                    height: `${Math.random() * 3 + 2}px`
                }}
            ></div>
        ))}
      </div>
    </div>
  );
};