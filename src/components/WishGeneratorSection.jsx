import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBirthday } from '../context/BirthdayContext';
import { playPop, playChime } from '../utils/soundEffects';
import { Sparkles, Wand2, RefreshCw } from 'lucide-react';

export const WishGeneratorSection = () => {
  const { config } = useBirthday();
  const wishes = config.wishes;

  const [currentWishIdx, setCurrentWishIdx] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateWish = () => {
    if (isGenerating) return;
    
    playPop();
    setIsGenerating(true);

    let count = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * wishes.length);
      setCurrentWishIdx(randomIdx);
      playPop();
      count++;

      if (count >= 8) {
        clearInterval(interval);
        const finalIdx = (currentWishIdx + 1 + Math.floor(Math.random() * (wishes.length - 1))) % wishes.length;
        setCurrentWishIdx(finalIdx);
        setIsGenerating(false);
        playChime();
      }
    }, 120);
  };

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto relative z-10 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4 mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-sm font-semibold">
          <Wand2 className="w-4 h-4 text-amber-400" />
          <span>WISH GENERATOR</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white glow-text-gold">
          Need a birthday wish? I got you. 🪄
        </h2>
      </motion.div>

      {/* Wish Display Card */}
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWishIdx}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="min-h-[140px] flex items-center justify-center p-4"
          >
            <p className="text-2xl md:text-3xl font-serif font-medium text-amber-200 leading-relaxed italic">
              "{wishes[currentWishIdx]}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Generate Button */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateWish}
            disabled={isGenerating}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-slate-950 font-bold text-lg md:text-xl shadow-xl shadow-amber-400/30 hover:shadow-pink-500/50 transition-all duration-300 inline-flex items-center gap-3 cursor-pointer"
          >
            <Sparkles className={`w-5 h-5 text-slate-950 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Generate My Wish ✨</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
