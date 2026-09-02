import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useBirthday } from '../context/BirthdayContext';
import { playPop, playCelebration } from '../utils/soundEffects';
import { Heart, Sparkles, Send, Flame, CheckCircle } from 'lucide-react';

export const WishlistSection = () => {
  const { name } = useBirthday();
  const [wishlist, setWishlist] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    playPop();

    const payload = {
      name: name || 'Anonymous',
      wishlist_upcoming_year: wishlist,
      personal_note: message,
      _subject: `Birthday Wishlist & Message from ${name || 'Someone Special'}`
    };

    try {
      await fetch('https://formsubmit.co/ajax/yaawarabbass@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (_) {
      // Graceful fallback to avoid interrupting user experience
    }

    setIsSubmitting(false);
    setSubmitted(true);
    playCelebration();

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#ec4899', '#a855f7', '#38bdf8']
    });
  };

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto relative z-10">
      <div className="text-center space-y-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-sm font-semibold"
        >
          <Heart className="w-4 h-4 text-pink-400" />
          <span>YOUR WISHLIST</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif font-bold text-white glow-text-pink"
        >
          Aspirations for the Year Ahead
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-6 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="space-y-2">
                <label className="text-slate-200 font-semibold text-base md:text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  What do you wish for in this upcoming year?
                </label>
                <textarea
                  required
                  rows={3}
                  value={wishlist}
                  onChange={(e) => setWishlist(e.target.value)}
                  placeholder="Share your goals, wishes, or dreams..."
                  className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-200 font-semibold text-base md:text-lg flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400" />
                  Leave a personal message or note:
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Anything you'd like to share..."
                  className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-pink-400 transition-all text-base"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-white font-bold text-lg md:text-xl shadow-lg shadow-purple-500/40 hover:shadow-pink-500/60 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Wishes'}</span>
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <CheckCircle className="w-16 h-16 text-amber-300 mx-auto animate-bounce" />
              <h3 className="text-3xl font-serif font-bold text-white glow-text-gold">
                Wishes Sent ✨
              </h3>
              <p className="text-slate-300 text-lg">
                Your thoughts have been received and saved.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
