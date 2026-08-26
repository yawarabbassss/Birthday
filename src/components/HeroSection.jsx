import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useBirthday } from '../context/BirthdayContext';
import { playCelebration } from '../utils/soundEffects';
import { ChevronDown, Sparkles, Heart, Gift, Stars } from 'lucide-react';

export const HeroSection = () => {
  const { name, formatText, config } = useBirthday();

  useEffect(() => {
    // Elegant soft confetti burst on reveal
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#a855f7', '#ec4899', '#fbbf24']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#c084fc', '#f472b6', '#ffffff']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    playCelebration();
  }, []);

  const scrollToNext = () => {
    const quizElement = document.getElementById('quiz-section');
    if (quizElement) {
      quizElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center overflow-hidden">
      {/* Decorative Floating Balloons / SVG Elements */}
      <div className="absolute top-12 left-8 md:left-24 animate-float opacity-70">
        <div className="text-4xl md:text-6xl filter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">🎈</div>
      </div>
      <div className="absolute top-20 right-8 md:right-24 animate-float-reverse opacity-70">
        <div className="text-4xl md:text-6xl filter drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]">🎁</div>
      </div>
      <div className="absolute bottom-28 left-12 animate-float opacity-60">
        <div className="text-3xl md:text-5xl">✨</div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 z-10">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border border-purple-400/30 text-amber-300 text-sm md:text-base font-semibold shadow-lg shadow-purple-900/30"
        >
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>CELEBRATING YOU TODAY</span>
          <Stars className="w-4 h-4 text-pink-300" />
        </motion.div>

        {/* Main Heading: Happy Birthday, [NAME] 🎂 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold text-white tracking-tight leading-tight"
        >
          <span className="bg-gradient-to-r from-purple-300 via-pink-400 to-amber-200 bg-clip-text text-transparent glow-text-purple">
            {formatText(config.hero.title)}
          </span>
        </motion.h1>

        {/* Subheadings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-3"
        >
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 font-light">
            {config.hero.subheading1}
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl text-amber-300 font-bold glow-text-gold font-serif">
            {config.hero.subheading2}
          </p>
        </motion.div>

        {/* Hero Animated Visual Card (Glowing Cake preview) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="py-6"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-50 animate-pulse-glow" />
            <div className="relative text-7xl md:text-9xl p-6 glass-card rounded-full border border-white/20 shadow-2xl animate-float">
              🎂
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToNext}
            className="group px-8 py-5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-white font-bold text-lg md:text-xl shadow-2xl shadow-purple-500/40 hover:shadow-pink-500/60 transition-all duration-300 inline-flex items-center gap-3 cursor-pointer"
          >
            <span>{config.hero.ctaButton}</span>
            <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
