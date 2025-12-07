import React, { useState, useEffect } from 'react';
import { ViralThankYouModal } from './ViralThankYouModal';

export const ExitIntentModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Only trigger once per session to avoid annoying users
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                // Optional: Check if user has spent some time or interacted
                setIsVisible(true);
                setHasShown(true);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasShown]);

    return (
        <ViralThankYouModal
            isOpen={isVisible}
            onClose={() => setIsVisible(false)}
        />
    );
};
