import React, { useState, useEffect } from 'react';

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Attempt to start music muted or wait for interaction in a real app
    // Here we just set up logic
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (audio) {
      audio.volume = 0.3; // Low volume
      if (isPlaying) audio.play().catch(e => console.log("Autoplay blocked"));
      else audio.pause();
    }
  }, [isPlaying]);

  const toggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-[#3E0000] border border-[#D4AF37] text-[#D4AF37] hover:scale-110 transition shadow-lg flex items-center justify-center"
      title={isPlaying ? "Mute Christmas Music" : "Play Christmas Music"}
    >
      {isPlaying ? (
        // Pause/Music Icon
        <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
      ) : (
        // Mute/Off Icon
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>
      )}
    </button>
  );
};