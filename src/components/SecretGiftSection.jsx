import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useBirthday } from '../context/BirthdayContext';
import { playUnlock, playCelebration } from '../utils/soundEffects';
import { Lock, Unlock, Sparkles, Heart, Gift } from 'lucide-react';

export const SecretGiftSection = () => {
  const { name, formatText, config, unlockedGift, setUnlockedGift } = useBirthday();
  const giftConfig = config.secretGift;

  const handleUnlock = () => {
    if (unlockedGift) return;

    playUnlock();
    setUnlockedGift(true);

    // Fire fireworks & particles
    setTimeout(() => {
      playCelebration();
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f472b6', '#a855f7', '#38bdf8']
      });
    }, 400);
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto relative z-10 text-center">
      {/* Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-8 md:p-14 border border-amber-400/30 shadow-2xl relative overflow-hidden"
      >
        {/* Glow backlight */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl pointer-events-none" />

        {/* Section Heading */}
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 glow-text-gold">
          {giftConfig.heading}
        </h2>

        {!unlockedGift ? (
          /* Locked Gift Box View */
          <div className="space-y-8 py-6">
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="text-8xl md:text-9xl inline-block cursor-pointer filter drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]"
              onClick={handleUnlock}
            >
              🎁
            </motion.div>

            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlock}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-slate-950 font-extrabold text-xl shadow-2xl shadow-amber-400/40 hover:shadow-pink-500/60 transition-all duration-300 inline-flex items-center gap-3 cursor-pointer"
              >
                <Lock className="w-6 h-6 text-slate-950" />
                <span>{giftConfig.buttonText}</span>
              </motion.button>
            </div>
          </div>
        ) : (
          /* Unlocked Revealed Gift View */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-8 py-6"
            >
              <div className="text-8xl md:text-9xl animate-bounce">
                🎉✨
              </div>

              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/20 text-amber-300 text-sm font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>SURPRISE UNLOCKED</span>
                </div>

                <p className="text-2xl md:text-3xl text-slate-100 font-serif leading-relaxed">
                  "{giftConfig.unlockedMessage}"
                </p>

                <h3 className="text-4xl md:text-6xl font-serif font-extrabold text-pink-400 glow-text-pink pt-4">
                  {formatText(giftConfig.finalHighlight)}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
};
