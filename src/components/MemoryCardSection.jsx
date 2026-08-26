import React from 'react';
import { motion } from 'framer-motion';
import { useBirthday } from '../context/BirthdayContext';
import { Heart, Sparkles, ScrollText } from 'lucide-react';

export const MemoryCardSection = () => {
  const { formatText, config } = useBirthday();
  const memory = config.memoryCard;

  return (
    <section className="py-24 px-4 max-w-3xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-sm font-semibold"
        >
          <ScrollText className="w-4 h-4 text-purple-400" />
          <span>PERSONAL LETTER</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif font-bold text-white glow-text-purple"
        >
          {memory.heading}
        </motion.h2>
      </div>

      {/* Glassmorphism Letter Card with Handwriting Font Details */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-8 md:p-14 border border-white/20 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle decorative stamp */}
        <div className="absolute top-6 right-6 opacity-20 text-5xl">💌</div>

        <div className="space-y-6 text-slate-200 text-lg md:text-2xl leading-relaxed font-sans font-light">
          {memory.content.map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={idx === 2 ? 'font-serif italic text-amber-200 text-xl md:text-3xl py-2 font-normal' : ''}
            >
              {formatText(paragraph)}
            </motion.p>
          ))}
        </div>

        {/* Signature */}
        <div className="mt-10 pt-6 border-t border-white/10 text-right">
          <p className="font-handwriting text-3xl md:text-4xl text-pink-300">
            {memory.signature}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
