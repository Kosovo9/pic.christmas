'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

export const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3); // Iniciar al 30% (suave)
    const [showVolume, setShowVolume] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Música Navideña Real (Royalty Free)
    const PLAYLIST = [
        "https://www.chosic.com/wp-content/uploads/2021/11/Jingle-Bells-Country.mp3",
        "https://www.chosic.com/wp-content/uploads/2021/11/We-Wish-You-A-Merry-Christmas.mp3",
        "https://www.chosic.com/wp-content/uploads/2021/11/Deck-the-Halls.mp3"
    ];

    const [currentTrack, setCurrentTrack] = useState(0);

    const handleTrackEnd = () => {
        setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;
            audio.onended = handleTrackEnd;
            // Solo intentar play si ya se inició una vez
            if (isPlaying) {
                audio.play().catch(() => setIsPlaying(false));
            }
        }
    }, [currentTrack]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(e => {
                console.log("Audio play failed (user interaction needed)", e);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-2 group">
            {/* Label */}
            {isPlaying && (
                <div className="bg-christmas-red text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce uppercase tracking-tighter shadow-lg mb-1 border border-white/20">
                    Holiday Radio Live 📻
                </div>
            )}

            {/* Volume Slider (Aparece al hover) */}
            <div className={`transition-all duration-300 bg-slate-900/90 p-3 rounded-xl border border-slate-700 backdrop-blur-md mb-2 ${showVolume || isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="h-32 -rotate-90 w-8 accent-christmas-gold cursor-pointer"
                />
            </div>

            {/* Play/Pause Button */}
            <button
                onClick={togglePlay}
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
                className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all shadow-2xl 
                    ${isPlaying
                        ? 'bg-christmas-red border-christmas-gold text-white shadow-christmas-red/40'
                        : 'bg-black/80 border-white/20 text-gray-400 hover:bg-black hover:border-christmas-gold'
                    }`}
            >
                {isPlaying ? (
                    // Equalizer Animation Icon
                    <div className="flex gap-1 items-end h-4">
                        <span className="w-1.5 bg-white animate-[bounce_1s_infinite] h-2"></span>
                        <span className="w-1.5 bg-white animate-[bounce_1.2s_infinite] h-4 text-christmas-gold"></span>
                        <span className="w-1.5 bg-white animate-[bounce_0.8s_infinite] h-3"></span>
                    </div>
                ) : (
                    <Play className="w-6 h-6 ml-1 fill-current" />
                )}
            </button>
            <audio ref={audioRef} src={PLAYLIST[currentTrack]} preload="auto" />
        </div>
    );
};
