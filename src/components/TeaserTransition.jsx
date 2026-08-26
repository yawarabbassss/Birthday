import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBirthday } from '../context/BirthdayContext';
import { playChime, playUnlock } from '../utils/soundEffects';
import { Sparkles, ArrowRight } from 'lucide-react';

export const TeaserTransition = () => {
  const { name, setStep, formatText, config } = useBirthday();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Sequence stages
    const timer1 = setTimeout(() => {
      setStage(1);
      playChime();
    }, 1200);

    const timer2 = setTimeout(() => {
      setStage(2);
      playUnlock();
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleStart = () => {
    playChime();
    setStep(2); // Unlock main hero & full site
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl">
      <div className="max-w-2xl text-center space-y-8">
        <AnimatePresence mode="wait">
          {stage >= 0 && (
            <motion.h1
              key="teaser-greeting"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-extrabold text-white glow-text-purple tracking-tight"
            >
              {formatText(config.teaser.greeting)}
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 1 && (
            <motion.p
              key="teaser-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-2xl md:text-3xl text-pink-300 font-medium leading-relaxed font-sans"
            >
              {formatText(config.teaser.subtitle)}
            </motion.p>
          )}
        </AnimatePresence>

        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 text-white font-bold text-xl shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/70 transition-all duration-300 flex items-center justify-center gap-3 mx-auto cursor-pointer"
            >
              <span>Unlock Birthday Magic ✨</span>
              <ArrowRight className="w-6 h-6 animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
