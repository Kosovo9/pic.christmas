'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

export const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [showVolume, setShowVolume] = useState(false);
    const [mounted, setMounted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Música Navideña Real (Royalty Free)
    const PLAYLIST = [
        "https://cdn.pixabay.com/audio/2022/12/01/audio_739343398c.mp3", // Lo-Fi Christmas
        "https://cdn.pixabay.com/audio/2023/11/24/audio_964684364c.mp3", // Modern Festive
        "https://cdn.pixabay.com/audio/2022/11/22/audio_8b5344868e.mp3"  // Chill Christmas
    ];

    const [currentTrack, setCurrentTrack] = useState(0);

    const handleTrackEnd = React.useCallback(() => {
        setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    }, [PLAYLIST.length]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;
            audio.onended = handleTrackEnd;
            if (isPlaying) {
                audio.play().catch(() => setIsPlaying(false));
            }
        }
    }, [currentTrack, volume, isPlaying, handleTrackEnd]);

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

    if (!mounted) return null;

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-2 group">
            {/* Label */}
            {isPlaying && (
                <div className="bg-white/10 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1 rounded-full animate-pulse uppercase tracking-[0.2em] shadow-2xl mb-2 border border-white/10">
                    Quantum Audio • Active
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
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all shadow-2xl 
                    ${isPlaying
                        ? 'bg-christmas-red border-christmas-gold text-white shadow-christmas-red/40'
                        : 'bg-black/80 border-white/20 text-gray-400 hover:bg-black hover:border-christmas-gold'
                    }`}
            >
                {isPlaying ? (
                    // Equalizer Animation Icon
                    <div className="flex gap-1 items-end h-3">
                        <span className="w-1 bg-white animate-[bounce_1s_infinite] h-1.5"></span>
                        <span className="w-1 bg-white animate-[bounce_1.2s_infinite] h-3 text-christmas-gold"></span>
                        <span className="w-1 bg-white animate-[bounce_0.8s_infinite] h-2"></span>
                    </div>
                ) : (
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                )}
            </button>
            <audio ref={audioRef} src={PLAYLIST[currentTrack]} preload="auto" crossOrigin="anonymous" />
        </div>
    );
};
