'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Santa3DScene } from './Santa3DScene';

/**
 * Santa 3D flotante que se pasea por todo el UI
 * Se difumina al 40% cuando el usuario está trabajando (en /generate o checkout)
 */
export function FloatingSanta3D() {
    const pathname = usePathname();

    // Páginas donde el usuario está trabajando (difuminar)
    const isWorkingPage = pathname?.includes('/generate') ||
        pathname?.includes('/checkout') ||
        pathname?.includes('/success');

    return (
        <div
            className={`fixed top-24 right-4 z-30 w-80 h-80 pointer-events-none transition-opacity duration-500 ${isWorkingPage ? 'opacity-40' : 'opacity-100'
                }`}
            style={{
                animation: 'float-santa 20s ease-in-out infinite'
            }}
        >
            <Santa3DScene />

            <style jsx>{`
        @keyframes float-santa {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-30px) translateX(-20px);
          }
          50% {
            transform: translateY(-15px) translateX(20px);
          }
          75% {
            transform: translateY(-40px) translateX(-10px);
          }
        }
      `}</style>
        </div>
    );
}
