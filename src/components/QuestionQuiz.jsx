import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBirthday } from '../context/BirthdayContext';
import { playPop, playChime } from '../utils/soundEffects';
import { CheckCircle2, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export const QuestionQuiz = () => {
  const { name, formatText, config, setQuizAnswers } = useBirthday();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = config.quiz.questions;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (optIdx, option) => {
    if (showResponse) return;
    
    playPop();
    setSelectedOption(optIdx);
    setShowResponse(true);

    // Save answer in context
    setQuizAnswers((prev) => ({
      ...prev,
      [currentQ.id]: option.text
    }));

    // Auto advance after 2.2 seconds
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedOption(null);
        setShowResponse(false);
      } else {
        playChime();
        setIsCompleted(true);
      }
    }, 2200);
  };

  const scrollToNextSection = () => {
    const energySection = document.getElementById('mood-section');
    if (energySection) {
      energySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="quiz-section" className="py-24 px-4 max-w-4xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-sm font-semibold"
        >
          <HelpCircle className="w-4 h-4 text-purple-400" />
          <span>INTERACTIVE QUIZ</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif font-bold text-white glow-text-purple"
        >
          {config.quiz.title}
        </motion.h2>
      </div>

      {!isCompleted ? (
        <div className="glass-card rounded-3xl p-6 md:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
          {/* Question Progress bar */}
          <div className="w-full bg-white/10 h-2 rounded-full mb-8 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="flex justify-between items-center text-xs md:text-sm text-slate-400 font-medium mb-4">
            <span>QUESTION {currentIdx + 1} OF {questions.length}</span>
            <span className="text-pink-300">{Math.round(((currentIdx + 1) / questions.length) * 100)}% COMPLETE</span>
          </div>

          {/* Question Title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white leading-snug">
                {currentQ.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: showResponse ? 1 : 1.02 }}
                      whileTap={{ scale: showResponse ? 1 : 0.98 }}
                      onClick={() => handleSelectOption(idx, option)}
                      disabled={showResponse}
                      className={`p-5 rounded-2xl border text-left font-medium text-lg md:text-xl transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 border-pink-400 text-white shadow-lg shadow-purple-500/30 ring-2 ring-pink-400'
                          : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200 hover:border-purple-400/50'
                      }`}
                    >
                      <span>{option.text}</span>
                      {isSelected && <CheckCircle2 className="w-6 h-6 text-amber-300 shrink-0 ml-2" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Playful Feedback Message */}
              <AnimatePresence>
                {showResponse && selectedOption !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/40 text-amber-200 text-lg md:text-xl font-medium flex items-center gap-3 shadow-lg"
                  >
                    <Sparkles className="w-6 h-6 text-amber-300 shrink-0 animate-bounce" />
                    <span>{currentQ.options[selectedOption].response}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Quiz Complete Summary Box */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center border border-purple-400/40 shadow-2xl space-y-6"
        >
          <div className="text-6xl md:text-7xl animate-bounce">😂✨</div>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white glow-text-gold">
            {formatText(config.quiz.summaryMessage)}
          </h3>
          <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto">
            Your choices prove you're 100% iconic. Now let's calculate your official birthday energy!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToNextSection}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg md:text-xl shadow-xl shadow-purple-500/40 hover:shadow-pink-500/60 inline-flex items-center gap-3 cursor-pointer"
          >
            <span>See Your Birthday Energy ↓</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};
