import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useBirthday } from '../context/BirthdayContext';
import { playCelebration, playUnlock } from '../utils/soundEffects';
import { Sparkles, Star, Trophy } from 'lucide-react';

export const EasterEggsManager = () => {
  const { easterEggToast, showToast, config } = useBirthday();
  const [keySequence, setKeySequence] = useState('');
  const [starClicks, setStarClicks] = useState(0);

  // Konami / Typing listener: "BIRTHDAY"
  useEffect(() => {
    const handleKeyDown = (e) => {
      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        const nextSeq = (keySequence + char).slice(-8);
        setKeySequence(nextSeq);

        if (nextSeq.endsWith('BIRTHDAY') || nextSeq.endsWith('PARTY') || nextSeq.endsWith('HBD')) {
          playCelebration();
          confetti({
            particleCount: 300,
            spread: 160,
            origin: { y: 0.5 },
            colors: ['#fbbf24', '#ec4899', '#a855f7', '#38bdf8']
          });
          showToast(config.easterEggs.konamiMessage);
          setKeySequence('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence, showToast, config]);

  // Click star 5 times
  const handleStarClick = () => {
    const nextCount = starClicks + 1;
    setStarClicks(nextCount);

    if (nextCount >= 5) {
      playUnlock();
      confetti({
        particleCount: 80,
        spread: 60,
        colors: ['#fbbf24', '#ffffff']
      });
      showToast(config.easterEggs.starClickMessage);
      setStarClicks(0);
    }
  };

  return (
    <>
      {/* Hidden Easter Egg Clickable Star in top-left */}
      <div
        onClick={handleStarClick}
        className="fixed top-6 left-6 z-40 cursor-pointer select-none opacity-40 hover:opacity-100 transition-opacity p-2"
        title="Hidden Wish Star ⭐"
      >
        <Star className={`w-6 h-6 text-amber-300 ${starClicks > 0 ? 'animate-bounce' : ''}`} />
      </div>

      {/* Easter Egg Toast Banner */}
      <AnimatePresence>
        {easterEggToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-slate-950 font-bold text-base md:text-lg shadow-2xl shadow-amber-400/50 flex items-center gap-3 border border-white/40"
          >
            <Trophy className="w-6 h-6 text-slate-950 shrink-0 animate-bounce" />
            <span>{easterEggToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
