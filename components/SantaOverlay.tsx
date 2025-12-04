import React, { useMemo, useState } from 'react';

export const SantaOverlay: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  // Generate random particles for the magic dust trail
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100 + '%',
      left: Math.random() * -150 + 'px', // Trail behind
      delay: Math.random() * 2 + 's',
      color: Math.random() > 0.5 ? '#fbbf24' : '#ffffff', // Gold or White
      size: Math.random() * 4 + 2 + 'px'
    }));
  }, []);

  if (hasError) return null; // Don't render anything if the image is missing

  return (
    <div className="fixed top-8 left-0 w-full h-0 z-40 pointer-events-none overflow-visible">
      {/* 
        The container moves across the screen (santa-slide).
        The inner div floats up and down (animate-float).
      */}
      <div className="santa-slide absolute -left-96">
        <div className="relative animate-float">
          
          {/* 3D Santa Image */}
          <img 
            src="/assets/santa.png" 
            alt="3D Flying Santa" 
            className="w-64 md:w-96 h-auto drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] filter brightness-110 contrast-110"
            onError={() => setHasError(true)}
          />

          {/* Magic Dust Trail */}
          <div className="absolute top-1/3 left-10 w-full h-full pointer-events-none">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full animate-sparkle shadow-[0_0_15px_currentColor]"
                style={{
                  backgroundColor: p.color,
                  top: p.top,
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  animationDelay: p.delay,
                  opacity: 0.9
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};