import React from 'react';

/**
 * Santa Claus 3D/light style cruzando el UI.
 * La animación viene desde index.html (clase santa-slide).
 */
export const SantaOverlay: React.FC = () => {
    return (
        <div className="fixed bottom-10 left-0 z-40 pointer-events-none santa-slide opacity-90">
            <img
                src="https://cdn-icons-png.flaticon.com/512/3799/3799963.png"
                alt="Santa Claus con renos"
                className="w-48 h-auto drop-shadow-2xl"
            />
            {/* Magic dust particles effect simulated with CSS/divs could go here */}
            <div className="absolute top-1/2 left-0 w-full h-full -z-10 bg-yellow-400/20 blur-xl rounded-full"></div>
        </div>
    );
};
