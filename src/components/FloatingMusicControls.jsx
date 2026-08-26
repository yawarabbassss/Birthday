import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBirthday } from '../context/BirthdayContext';
import { playPop } from '../utils/soundEffects';
import { Music, Volume2, VolumeX, Pause, Play } from 'lucide-react';

export const FloatingMusicControls = () => {
  const {
    musicPlaying,
    toggleMusic,
    soundMuted,
    toggleSound,
    config
  } = useBirthday();

  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented or file failed to load
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [musicPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src={config.musicUrl}
        loop
        preload="auto"
      />

      {/* SFX Mute Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          playPop();
          toggleSound();
        }}
        className="w-12 h-12 rounded-full glass-card border border-white/20 text-white flex items-center justify-center shadow-lg hover:border-purple-400 cursor-pointer"
        title={soundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
      >
        {soundMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-purple-300" />}
      </motion.button>

      {/* Background Music Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playPop();
          toggleMusic();
        }}
        className={`px-5 py-3 rounded-full border glass-card text-white font-medium text-sm md:text-base flex items-center gap-2 shadow-xl cursor-pointer transition-all duration-300 ${
          musicPlaying
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-pink-400 shadow-purple-500/40 animate-pulse'
            : 'hover:border-purple-400/50 border-white/20'
        }`}
      >
        <Music className={`w-5 h-5 ${musicPlaying ? 'text-amber-300 animate-spin' : 'text-slate-300'}`} />
        <span>{musicPlaying ? 'Birthday Vibes 🎵' : 'Play Vibes 🎵'}</span>
        {musicPlaying ? <Pause className="w-4 h-4 text-white ml-1" /> : <Play className="w-4 h-4 text-white ml-1" />}
      </motion.button>
    </div>
  );
};
