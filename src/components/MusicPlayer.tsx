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
        "https://cdn.pixabay.com/download/audio/2022/10/25/audio_51593dfd68.mp3?filename=its-christmas-time-124976.mp3", // Classic Orchestral
        "https://cdn.pixabay.com/download/audio/2021/11/01/audio_0253457b28.mp3?filename=we-wish-you-a-merry-christmas-xmas-background-music-for-video-60-second-version-11105.mp3", // We Wish You A Merry Christmas
        "https://cdn.pixabay.com/download/audio/2020/12/24/audio_346912389c.mp3?filename=silent-night-piano-version-6058.mp3", // Silent Night Piano
        "https://cdn.pixabay.com/download/audio/2019/12/03/audio_08f9747a0a.mp3?filename=jingle-bells-orchestral-version-3-11818.mp3" // Jingle Bells Orchestral
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
