import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useBirthday } from '../context/BirthdayContext';
import { playBlow, playCelebration, playPop } from '../utils/soundEffects';
import { Sparkles, Wind, CheckCircle } from 'lucide-react';

export const InteractiveCakeSection = () => {
  const {
    config,
    candlesExtinguished,
    setCandlesExtinguished,
    allCandlesBlown,
    setAllCandlesBlown
  } = useBirthday();

  const cakeConfig = config.cake;

  const handleExtinguishSingle = (idx) => {
    if (candlesExtinguished[idx]) return;

    playBlow();
    const updated = [...candlesExtinguished];
    updated[idx] = true;
    setCandlesExtinguished(updated);

    // Check if all are extinguished
    if (updated.every((c) => c === true)) {
      triggerAllBlown();
    }
  };

  const handleBlowAll = () => {
    if (allCandlesBlown) return;

    playBlow();
    setCandlesExtinguished([true, true, true]);
    triggerAllBlown();
  };

  const triggerAllBlown = () => {
    setAllCandlesBlown(true);
    setTimeout(() => {
      playCelebration();
      confetti({
        particleCount: 220,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#fbbf24', '#38bdf8']
      });
    }, 300);
  };

  return (
    <section id="cake-section" className="py-24 px-4 max-w-4xl mx-auto relative z-10 text-center">
      <div className="glass-card rounded-3xl p-8 md:p-14 border border-white/20 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Header */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white glow-text-purple">
            {cakeConfig.heading}
          </h2>
          <p className="text-slate-300 text-lg md:text-xl">
            {cakeConfig.instruction}
          </p>
        </div>

        {/* Cake Container */}
        <div className="py-8 relative inline-block mx-auto">
          {/* Candles */}
          <div className="flex justify-center items-end gap-8 md:gap-12 mb-2 relative z-20">
            {candlesExtinguished.map((isExtinguished, idx) => (
              <div
                key={idx}
                onClick={() => handleExtinguishSingle(idx)}
                className="cursor-pointer group flex flex-col items-center"
              >
                {/* Flame */}
                <div className="h-10 flex items-center justify-center">
                  {!isExtinguished ? (
                    <motion.div
                      animate={{
                        scale: [1, 1.25, 1],
                        rotate: [-3, 3, -3],
                        opacity: [0.85, 1, 0.85]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="w-5 h-7 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full blur-[1px] shadow-[0_0_15px_rgba(251,191,36,0.9)]"
                    />
                  ) : (
                    /* Smoke when extinguished */
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0.8, 0], y: -25 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs text-slate-400 font-bold"
                    >
                      💨
                    </motion.div>
                  )}
                </div>

                {/* Candle Stick */}
                <div className="w-4 h-16 md:h-20 bg-gradient-to-b from-pink-400 via-purple-400 to-amber-300 rounded-t-md shadow-md border-t border-white/40" />
              </div>
            ))}
          </div>

          {/* Cake Layers SVG/Visual */}
          <div className="relative z-10">
            {/* Top Frosting Layer */}
            <div className="w-56 sm:w-72 md:w-80 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 rounded-t-3xl border-t border-white/40 shadow-lg flex items-center justify-around px-4">
              <span className="text-xl">🍓</span>
              <span className="text-xl">🍒</span>
              <span className="text-xl">🍓</span>
              <span className="text-xl">🍒</span>
            </div>
            {/* Middle Layer */}
            <div className="w-64 sm:w-80 md:w-96 h-16 bg-gradient-to-r from-purple-800 via-pink-800 to-purple-900 border-t border-white/20 shadow-lg mx-auto flex items-center justify-center">
              <span className="text-xs text-purple-200 uppercase tracking-widest font-bold">★ HAPPY BIRTHDAY ★</span>
            </div>
            {/* Base Layer */}
            <div className="w-72 sm:w-88 md:w-104 h-20 bg-gradient-to-r from-purple-900 via-slate-900 to-pink-950 rounded-b-3xl border-t border-white/10 shadow-2xl mx-auto flex items-center justify-around px-6">
              <span className="text-2xl">✨</span>
              <span className="text-2xl">🎂</span>
              <span className="text-2xl">✨</span>
            </div>
          </div>
        </div>

        {/* Controls / Message */}
        <div>
          {!allCandlesBlown ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowAll}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-white font-bold text-lg md:text-xl shadow-xl shadow-purple-500/40 hover:shadow-pink-500/60 inline-flex items-center gap-3 cursor-pointer"
            >
              <Wind className="w-6 h-6 animate-pulse" />
              <span>{cakeConfig.blowButtonText}</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-amber-400/20 border border-amber-400/50 text-amber-200 text-2xl md:text-3xl font-serif font-bold inline-flex items-center gap-3 glow-text-gold"
            >
              <CheckCircle className="w-8 h-8 text-amber-300" />
              <span>{cakeConfig.extinguishedMessage}</span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
