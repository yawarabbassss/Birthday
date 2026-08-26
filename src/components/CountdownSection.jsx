import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useBirthday } from '../context/BirthdayContext';
import { Clock, PartyPopper } from 'lucide-react';

export const CountdownSection = () => {
  const { config } = useBirthday();
  const birthdayDateStr = config.birthdayDate;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: true
  });

  useEffect(() => {
    if (!birthdayDateStr) {
      setTimeLeft((prev) => ({ ...prev, isToday: true }));
      return;
    }

    const calculateTime = () => {
      const target = new Date(birthdayDateStr).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isToday: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [birthdayDateStr]);

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-8 md:p-12 border border-purple-400/30 shadow-2xl space-y-6"
      >
        {!timeLeft.isToday ? (
          /* Live Countdown View */
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-sm font-semibold">
              <Clock className="w-4 h-4" />
              <span>BIRTHDAY COUNTDOWN</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Your day is almost here… ⏳
            </h3>

            {/* Timer Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Minutes', val: timeLeft.minutes },
                { label: 'Seconds', val: timeLeft.seconds }
              ].map((unit, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 glass-card">
                  <div className="text-3xl md:text-5xl font-serif font-extrabold text-amber-300 glow-text-gold">
                    {String(unit.val).padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm text-slate-400 font-semibold uppercase mt-1">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Birthday Moment Banner */
          <div className="space-y-4 py-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-sm font-bold animate-pulse">
              <PartyPopper className="w-4 h-4" />
              <span>THE MOMENT IS HERE!</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-serif font-extrabold text-white glow-text-gold">
              IT'S YOUR DAY!!! 🎉🎂
            </h3>
            <p className="text-slate-300 text-lg md:text-xl max-w-lg mx-auto">
              The universe alignment is set to 100% celebration mode. Enjoy every single second!
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
};
