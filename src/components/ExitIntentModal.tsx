import React, { useState, useEffect } from 'react';
import { ViralThankYouModal } from './ViralThankYouModal';

export const ExitIntentModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showCount, setShowCount] = useState(0);

    useEffect(() => {
        // Trigger up to 2 times per session
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && showCount < 2) {
                setIsVisible(true);
                setShowCount(prev => prev + 1);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [showCount]);

    return (
        <ViralThankYouModal
            isOpen={isVisible}
            onClose={() => setIsVisible(false)}
        />
    );
};
