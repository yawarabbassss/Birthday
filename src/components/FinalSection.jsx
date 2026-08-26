import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBirthday } from '../context/BirthdayContext';
import { playPop, playChime } from '../utils/soundEffects';
import { RefreshCw, Share2, Heart, Sparkles, Check } from 'lucide-react';

export const FinalSection = () => {
  const { name, formatText, config, resetExperience, showToast } = useBirthday();
  const finalConfig = config.final;

  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    playPop();
    const shareData = {
      title: `Birthday Surprise for ${name}! 🎂`,
      text: 'I just received a beautiful birthday surprise! 🎂✨',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback copy link
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        showToast('Link copied to clipboard! Share the birthday magic 🎁');
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        showToast('Share message: "I just got a birthday surprise 🎂✨"');
      }
    }
  };

  return (
    <footer className="py-24 px-4 max-w-4xl mx-auto relative z-10 text-center space-y-12">
      {/* Main Finale Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-8 md:p-16 border border-pink-400/40 shadow-2xl space-y-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-amber-500/10 pointer-events-none" />

        {/* Large Heart Graphic */}
        <div className="text-7xl md:text-8xl animate-bounce">❤️</div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-white glow-text-pink leading-tight">
          {formatText(finalConfig.heading)}
        </h2>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl md:text-3xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed">
          {finalConfig.subheading}
        </p>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          {/* Replay Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playChime();
              resetExperience();
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg md:text-xl shadow-xl shadow-purple-500/40 hover:shadow-pink-500/60 inline-flex items-center gap-3 cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{finalConfig.replayButton}</span>
          </motion.button>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg md:text-xl transition-all duration-300 inline-flex items-center gap-3 cursor-pointer shadow-lg"
          >
            {copied ? <Check className="w-5 h-5 text-amber-300" /> : <Share2 className="w-5 h-5 text-pink-300" />}
            <span>{copied ? 'Link Copied!' : finalConfig.shareButton}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Made with love footer */}
      <div className="text-slate-400 text-base md:text-lg flex items-center justify-center gap-2 font-medium">
        <span>{formatText(finalConfig.footerText)}</span>
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
      </div>
    </footer>
  );
};
