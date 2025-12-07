"use client";

import React, { useState, useEffect, useRef } from 'react';

// Royalty-free Christmas tracks (using placeholders or reliable CDNs)
const PLAYLIST = [
    { title: "Jingle Bells Jazz", src: "https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3" },
    { title: "Holly Jolly Swing", src: "https://cdn.pixabay.com/download/audio/2023/12/04/audio_108544d82f.mp3" },
    { title: "Snowy Morning", src: "https://cdn.pixabay.com/download/audio/2022/12/16/audio_0e54d68246.mp3" },
    { title: "Christmas Sparkle", src: "https://cdn.pixabay.com/download/audio/2022/11/25/audio_17311ce2c3.mp3" },
    { title: "Winter Magic", src: "https://cdn.pixabay.com/download/audio/2022/01/21/audio_31743c58bd.mp3" }
];

export const MusicToggle: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Initial load
    useEffect(() => {
        const savedPref = localStorage.getItem('music_pref');
        if (savedPref === 'playing') {
             // Browser policy might block autoplay, but we try suited for user intent
             playTrack(0);
        }
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const playTrack = async (index: number) => {
        if (!audioRef.current) return;
        
        try {
            setCurrentTrack(index);
            audioRef.current.src = PLAYLIST[index].src;
            // Wait for load
            await audioRef.current.load();
            await audioRef.current.play();
            setIsPlaying(true);
            localStorage.setItem('music_pref', 'playing');
        } catch (err) {
            console.log("Playback prevented:", err);
            setIsPlaying(false);
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
            localStorage.setItem('music_pref', 'paused');
        } else {
            // Check if src is set, if not set it
            if (!audioRef.current?.src) {
                playTrack(currentTrack);
            } else {
                audioRef.current?.play().catch(e => console.log(e));
                setIsPlaying(true);
                localStorage.setItem('music_pref', 'playing');
            }
        }
    };

    const nextTrack = () => {
        const next = (currentTrack + 1) % PLAYLIST.length;
        playTrack(next);
    };

    const prevTrack = () => {
        const prev = (currentTrack - 1 + PLAYLIST.length) % PLAYLIST.length;
        playTrack(prev);
    };

    return (
        <>
            <audio 
                ref={audioRef} 
                onEnded={nextTrack}
                onError={(e) => console.log("Audio Error:", e)}
            />

            <div className={`fixed bottom-6 left-6 z-[50] transition-all duration-300 ${isExpanded ? 'w-64' : 'w-12'} h-12`}>
                <div className={`
                    bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl 
                    flex items-center overflow-hidden transition-all duration-300
                    ${isExpanded ? 'w-full px-2' : 'w-12 justify-center hover:bg-white/20 cursor-pointer'}
                `} 
                style={{ height: '48px' }}
                >
                    {/* Speaker Icon (Main Toggle) */}
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-white"
                        title="Music Player"
                    >
                        {isPlaying ? (
                             <span className="text-xl">🔊</span> 
                        ) : (
                             <span className="text-xl opacity-70">🔈</span>
                        )}
                    </button>

                    {/* Expanded Controls */}
                    {isExpanded && (
                        <div className="flex items-center gap-2 ml-2 flex-1 animate-fade-in text-white/90">
                            
                            {/* Prev */}
                            <button onClick={prevTrack} className="hover:text-amber-300">⏮</button>
                            
                            {/* Play/Pause */}
                            <button onClick={togglePlay} className="hover:text-amber-300 w-4 text-center">
                                {isPlaying ? '⏸' : '▶'}
                            </button>
                            
                            {/* Next */}
                            <button onClick={nextTrack} className="hover:text-amber-300">⏭</button>

                            {/* Volume */}
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.1" 
                                value={volume} 
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer" 
                            />
                        </div>
                    )}
                    
                    {/* Track Info Marquee (Optional Polish) */}
                    {isExpanded && isPlaying && (
                         <div className="absolute -top-6 left-0 w-full text-center">
                            <span className="text-[10px] text-amber-300 font-medium drop-shadow-md animate-pulse">
                                🎵 {PLAYLIST[currentTrack].title}
                            </span>
                         </div>
                    )}
                </div>
            </div>
        </>
    );
};
