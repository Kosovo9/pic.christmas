'use client';

import React, { useState, useRef, useEffect } from 'react';

export const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3); // Iniciar al 30% (suave)
    const [showVolume, setShowVolume] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Música Navideña Moderna Sin Derechos de Autor (Royalty Free)
    // Fuente: Pixabay / Free Music Archive
    const PLAYLIST = [
        "https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=christmas-jazz-11787.mp3", // Modern Christmas Jazz
        "https://cdn.pixabay.com/download/audio/2021/11/25/audio_91b79f2910.mp3?filename=jingle-bells-jazzy-style-11883.mp3", // Jingle Bells Modern
        "https://cdn.pixabay.com/download/audio/2022/12/05/audio_3e5d6c0d2f.mp3?filename=christmas-vlog-124064.mp3", // Christmas Vlog Music
        "https://cdn.pixabay.com/download/audio/2022/11/22/audio_0d0de3c4c0.mp3?filename=christmas-cinematic-11785.mp3", // Cinematic Christmas
        "https://cdn.pixabay.com/download/audio/2021/12/06/audio_d1718ab41b.mp3?filename=christmas-background-music-12359.mp3" // Modern Background
    ];

    const [currentTrack, setCurrentTrack] = useState(0);

    const handleTrackEnd = () => {
        setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    };

    useEffect(() => {
        // Autoplay policy workaround: Iniciar con interacción
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;
            audio.onended = handleTrackEnd;
            // Intentar autoplay
            audio.play().then(() => setIsPlaying(true)).catch(() => console.log("Autoplay blocked"));
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
            audioRef.current.play().catch(e => console.log("Audio play failed (user interaction needed)", e));
            setIsPlaying(true);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-2 group">

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
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all shadow-lg 
                    ${isPlaying
                        ? 'bg-christmas-red border-christmas-gold text-white animate-pulse-slow'
                        : 'bg-black/80 border-white/20 text-gray-400 hover:bg-black'
                    }`}
            >
                {isPlaying ? (
                    // Equalizer Animation Icon
                    <div className="flex gap-1 items-end h-4">
                        <span className="w-1 bg-white animate-[bounce_1s_infinite] h-2"></span>
                        <span className="w-1 bg-white animate-[bounce_1.2s_infinite] h-4"></span>
                        <span className="w-1 bg-white animate-[bounce_0.8s_infinite] h-3"></span>
                    </div>
                ) : (
                    <span className="text-xl ml-1">▶</span>
                )}
            </button>
            <audio ref={audioRef} src={PLAYLIST[currentTrack]} />
        </div>
    );
};
