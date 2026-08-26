import React from 'react';
import { motion } from 'framer-motion';
import { useBirthday } from '../context/BirthdayContext';
import { Heart, Sparkles, Star } from 'lucide-react';

export const YouDeserveSection = () => {
  const { config } = useBirthday();
  const items = config.youDeserve;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-sm font-semibold"
        >
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400/30" />
          <span>AFIRMATIONS & WISHES</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif font-bold text-white glow-text-pink"
        >
          This year, you deserve… ✨
        </motion.h2>
      </div>

      {/* Grid of Scroll-Triggered Revealed Items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.04, y: -6 }}
            className="glass-card glass-card-hover rounded-2xl p-6 border border-white/15 text-left flex flex-col justify-between h-48 relative overflow-hidden group"
          >
            {/* Background glowing gradient shift */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

            {/* Icon */}
            <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>

            {/* Text */}
            <h3 className="text-xl md:text-2xl font-serif font-medium text-white group-hover:text-amber-200 transition-colors leading-snug">
              {item.text}
            </h3>

            {/* Corner sparkle */}
            <Sparkles className="w-4 h-4 text-amber-300/40 absolute bottom-4 right-4 group-hover:text-amber-300 transition-colors" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
