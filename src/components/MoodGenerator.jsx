import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBirthday } from '../context/BirthdayContext';
import { playPop, playChime, playUnlock } from '../utils/soundEffects';
import { Zap, RefreshCw, Crown, Sparkles } from 'lucide-react';

export const MoodGenerator = () => {
  const { config, setUserMood } = useBirthday();
  const moods = config.moods;

  const [currentMoodIdx, setCurrentMoodIdx] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [rerollsLeft, setRerollsLeft] = useState(4);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  useEffect(() => {
    // Set initial mood
    const initialIdx = Math.floor(Math.random() * moods.length);
    setCurrentMoodIdx(initialIdx);
    setUserMood(moods[initialIdx]);
  }, []);

  const handleReroll = () => {
    if (isShuffling) return;

    if (rerollsLeft <= 0) {
      setShowLimitWarning(true);
      playPop();
      return;
    }

    playPop();
    setIsShuffling(true);
    setRerollsLeft((prev) => prev - 1);

    // Shuffle animation loop
    let shuffleCount = 0;
    const maxShuffles = 12;
    const interval = setInterval(() => {
      const nextRandom = Math.floor(Math.random() * moods.length);
      setCurrentMoodIdx(nextRandom);
      playPop();
      shuffleCount++;

      if (shuffleCount >= maxShuffles) {
        clearInterval(interval);
        const finalMoodIdx = Math.floor(Math.random() * moods.length);
        setCurrentMoodIdx(finalMoodIdx);
        setUserMood(moods[finalMoodIdx]);
        setIsShuffling(false);
        playUnlock();
      }
    }, 100);
  };

  const currentMood = moods[currentMoodIdx];

  return (
    <section id="mood-section" className="py-20 px-4 max-w-3xl mx-auto relative z-10 text-center">
      {/* Section Badge & Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4 mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-sm font-semibold">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>DAILY DESTINY</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white glow-text-gold">
          Your birthday energy today is… 🔮
        </h2>
      </motion.div>

      {/* Interactive Mood Reveal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl relative overflow-hidden"
      >
        {/* Glow halo around card */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10 rounded-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMoodIdx}
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-md">
              {currentMood.badge}
            </div>

            {/* Personality Title */}
            <h3 className={`text-4xl md:text-6xl font-serif font-extrabold bg-gradient-to-r ${currentMood.color} bg-clip-text text-transparent drop-shadow-md`}>
              {currentMood.title}
            </h3>

            {/* Description */}
            <p className="text-lg md:text-2xl text-slate-200 font-light max-w-xl mx-auto leading-relaxed">
              "{currentMood.description}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Action Controls */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReroll}
            disabled={isShuffling}
            className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-lg transition-all duration-300 flex items-center gap-3 cursor-pointer group shadow-lg"
          >
            <RefreshCw className={`w-5 h-5 text-amber-300 ${isShuffling ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            <span>Try Again</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full text-amber-200">
              {rerollsLeft} left
            </span>
          </motion.button>

          {showLimitWarning && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-amber-300 text-sm font-medium animate-pulse"
            >
              No more rerolls left! You're officially stuck with this supreme energy today! 😂👑
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
};
