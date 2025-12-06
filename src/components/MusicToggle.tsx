import React, { useState, useEffect, useRef } from 'react';

export const MusicToggle: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Check localStorage for music preference
        const savedPreference = localStorage.getItem('christmasMusic');
        if (savedPreference === 'enabled' && audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, []);

    const toggle = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            localStorage.setItem('christmasMusic', 'disabled');
        } else {
            audioRef.current.play();
            localStorage.setItem('christmasMusic', 'enabled');
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <>
            <audio
                ref={audioRef}
                loop
                src="/audio/christmas-music.mp3"
                preload="none"
            />

            <button
                onClick={toggle}
                className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-lg shadow-red-600/30 flex items-center justify-center z-40 transition-all transform hover:scale-110"
                title={isPlaying ? 'Pause Christmas Music' : 'Play Christmas Music'}
            >
                {isPlaying ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </button>
        </>
    );
};
