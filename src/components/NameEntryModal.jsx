import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBirthday } from '../context/BirthdayContext';
import { playChime, playPop } from '../utils/soundEffects';
import { Sparkles, Gift, Heart } from 'lucide-react';

export const NameEntryModal = () => {
  const { updateName, setStep } = useBirthday();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError(true);
      playPop();
      return;
    }

    playChime();
    updateName(inputValue.trim());
    setStep(1); // Proceed to teaser transition
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg glass-card p-8 md:p-10 rounded-3xl text-center relative border border-white/20 shadow-2xl overflow-hidden"
      >
        {/* Glowing Ambient Background Spotlights */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-500/30 rounded-full blur-2xl pointer-events-none" />

        {/* Floating Icons Decorative Header */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <Sparkles className="w-8 h-8 text-amber-300 animate-pulse" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <Gift className="w-9 h-9 text-white animate-bounce" />
          </div>
          <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 tracking-wide glow-text-purple">
          Wait… who are you? 👀
        </h2>
        <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
          Enter your name to unlock your birthday surprise ✨
        </p>

        {/* Name Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Your Name Here..."
              className={`w-full px-6 py-4 rounded-2xl bg-white/10 border ${
                error ? 'border-red-400 ring-2 ring-red-400/50' : 'border-white/20 focus:border-purple-400'
              } text-white placeholder-slate-400 text-lg md:text-xl text-center focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 glass-card`}
              maxLength={30}
              autoFocus
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-2 font-medium"
              >
                Please enter your name to unlock your gift! ❤️
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-white font-bold text-lg md:text-xl shadow-lg shadow-purple-500/40 hover:shadow-pink-500/60 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Let’s Go 🎁</span>
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
