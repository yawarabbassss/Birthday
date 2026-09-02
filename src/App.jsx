import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Laugh,
  Send,
  Camera,
  AlertCircle,
  Flame,
  CheckCircle,
  Wind,
  Lock,
  Wand2,
  RefreshCw,
  Clock,
  PartyPopper,
  Music,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Mail,
  Smile
} from 'lucide-react';

export default function App() {
  // Step 0: Name entry, Step 1: Teaser, Step 2: Full interactive site
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState(false);

  // Audio Engine (YouTube background stream for "Kalyani")
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const ytPlayerRef = useRef(null);

  // Cake / Candles State
  const [candles, setCandles] = useState([false, false, false]);
  const [allBlown, setAllBlown] = useState(false);

  // Secret Gift State
  const [unlockedGift, setUnlockedGift] = useState(false);

  // Wish Generator State
  const wishesList = [
    "May this year surprise you in the best possible ways.",
    "May you find more reasons to laugh than reasons to overthink.",
    "May your biggest plans become your favorite memories.",
    "May this year be ridiculously good to you.",
    "May every door you open lead to peace, joy, and abundance.",
    "May you always feel surrounded by warmth, comfort, and real love."
  ];
  const [wishIdx, setWishIdx] = useState(0);

  // Questionnaire & Feedback Form State
  const [wishlistText, setWishlistText] = useState('');
  const [bestMomentText, setBestMomentText] = useState('');
  const [repeatMomentText, setRepeatMomentText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Surprise Animation Overlay States
  const [boomState, setBoomState] = useState(false);
  const [showJoker, setShowJoker] = useState(false);

  // 1. Reset everything fresh on page reload (no caching)
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  // 2. Initialize YouTube Background Audio Player
  useEffect(() => {
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        ytPlayerRef.current = new window.YT.Player('youtube-streamer', {
          videoId: 'xvT1jH8B9AM',
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: 'xvT1jH8B9AM',
            modestbranding: 1,
            fs: 0
          },
          events: {
            onReady: (event) => {
              if (musicPlaying) event.target.playVideo();
            }
          }
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = initPlayer;
      document.body.appendChild(tag);
    } else {
      initPlayer();
    }
  }, []);

  const toggleMusic = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      if (musicPlaying) {
        ytPlayerRef.current.pauseVideo();
        setMusicPlaying(false);
      } else {
        ytPlayerRef.current.playVideo();
        setMusicPlaying(true);
      }
    } else {
      setMusicPlaying(!musicPlaying);
    }
  };

  // Name submission handler
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setNameError(true);
      return;
    }
    const finalName = nameInput.trim();
    setName(finalName);
    setStep(1);

    // Auto-start music playback
    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      ytPlayerRef.current.playVideo();
      setMusicPlaying(true);
    }
  };

  // Blow single candle
  const extinguishCandle = (idx) => {
    if (candles[idx]) return;
    const updated = [...candles];
    updated[idx] = true;
    setCandles(updated);
    if (updated.every((val) => val === true)) {
      triggerAllBlown();
    }
  };

  // Blow all candles
  const handleBlowAll = () => {
    setCandles([true, true, true]);
    triggerAllBlown();
  };

  const triggerAllBlown = () => {
    setAllBlown(true);
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#fbbf24']
    });
  };

  // Unlock Gift Box
  const handleUnlockGift = () => {
    setUnlockedGift(true);
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f472b6', '#a855f7']
    });
  };

  // Form Submission & Boom Surprise Trigger
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      user_name: name,
      wishlist_upcoming_year: wishlistText,
      best_moment_of_this_year: bestMomentText,
      moment_wished_to_come_again: repeatMomentText,
      feedback_message_for_yawar: feedbackText,
      _subject: `Birthday Note & Wishlist from ${name}!`
    };

    try {
      await fetch('https://formsubmit.co/ajax/yaawarabbass@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      // Continue without breaking UI if offline
    }

    setIsSubmitting(false);

    // Trigger Boom Sequence
    setBoomState(true);

    setTimeout(() => {
      setBoomState(false);
      setShowJoker(true);
      confetti({
        particleCount: 300,
        spread: 140,
        origin: { y: 0.5 },
        colors: ['#ef4444', '#f59e0b', '#8b5cf6', '#ec4899']
      });
    }, 1100);
  };

  const yearsTimeline = Array.from({ length: 2026 - 2013 + 1 }, (_, i) => 2013 + i);

  return (
    <div className="min-h-screen bg-[#050515] text-[#f8fafc] font-sans selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
      {/* Hidden YouTube Streamer Element */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none opacity-0">
        <div id="youtube-streamer" />
      </div>

      {/* Floating Ambient Music Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={() => setSoundMuted(!soundMuted)}
          className="w-12 h-12 rounded-full glass-card border border-white/20 text-white flex items-center justify-center shadow-lg hover:border-purple-400 cursor-pointer"
        >
          {soundMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-purple-300" />}
        </button>
        <button
          onClick={toggleMusic}
          className={`px-5 py-3 rounded-full border glass-card text-white font-medium text-sm md:text-base flex items-center gap-2 shadow-xl cursor-pointer transition-all duration-300 ${
            musicPlaying
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-pink-400 shadow-purple-500/40 animate-pulse'
              : 'hover:border-purple-400/50 border-white/20'
          }`}
        >
          <Music className={`w-5 h-5 ${musicPlaying ? 'text-amber-300 animate-spin' : 'text-slate-300'}`} />
          <span>{musicPlaying ? 'Kalyani Playing 🎶' : 'Play Song 🎶'}</span>
          {musicPlaying ? <Pause className="w-4 h-4 ml-1" /> : <Play className="w-4 h-4 ml-1" />}
        </button>
      </div>

      {/* STEP 0: Modal Asking for User's Name */}
      {step === 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md glass-card p-8 rounded-3xl text-center border border-white/20 shadow-2xl relative overflow-hidden space-y-6"
          >
            <div className="text-6xl animate-bounce">✨</div>
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white glow-text-purple">
                Wait... who are you?
              </h2>
              <p className="text-slate-300 text-sm md:text-base">
                Enter your name to unlock your personalized birthday universe.
              </p>
            </div>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (nameError) setNameError(false);
                }}
                placeholder="Enter your name..."
                className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-lg text-center focus:outline-none focus:border-purple-400 transition-all glass-card"
                autoFocus
              />
              {nameError && <p className="text-red-400 text-xs font-medium">Please enter your name!</p>}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-white font-bold text-lg shadow-lg hover:brightness-110 cursor-pointer transition-transform active:scale-95"
              >
                Let's Go ✨
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* STEP 1: Teaser Transition Screen */}
      {step === 1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-white glow-text-purple">
              Hey, {name}... 🥹
            </h1>
            <p className="text-xl md:text-2xl text-pink-300 font-medium">
              Looks like someone has a very special birthday today.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 text-white font-bold text-xl shadow-2xl hover:scale-105 transition-transform cursor-pointer"
              >
                Unlock Birthday Magic ✨
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* STEP 2: Main Website Experience */}
      {step === 2 && (
        <main className="relative z-10 space-y-20 md:space-y-32 pb-24">
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-purple-400/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                <span>CELEBRATING YOU TODAY</span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-extrabold text-white leading-tight glow-text-purple">
                Happy Birthday, <span className="bg-gradient-to-r from-purple-300 via-pink-400 to-amber-200 bg-clip-text text-transparent">{name}</span>!
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 font-light">
                Today isn't just another day. It's your day.
              </p>
              <div className="text-8xl py-4 animate-bounce">🎂</div>
            </div>
          </section>

          {/* Section: Funny Birthday Wishes */}
          <section className="px-4 max-w-4xl mx-auto">
            <div className="text-center space-y-3 mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs font-semibold">
                <Laugh className="w-4 h-4 text-pink-400" />
                <span>UNFILTERED BIRTHDAY TRUTHS</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white glow-text-pink">
                A Special Message for {name}
              </h2>
            </div>
            <div className="glass-card rounded-3xl p-6 md:p-10 border border-white/20 shadow-2xl space-y-4">
              {[
                {
                  icon: "🥹💗✨",
                  text: `Happy Birthday, ${name}! May Allah bless you with endless happiness, peace, success, and all the beautiful things your heart wishes for.`,
                  highlight: false
                },
                {
                  icon: "🤍",
                  text: "May every new chapter of your life bring you closer to your dreams, surrounded by people who genuinely love and value you.",
                  highlight: false
                },
                {
                  icon: "😂😭",
                  text: "I hope you always keep that beautiful smile, that crazy little personality, and of course… your unlimited drama package 😂😭",
                  highlight: true
                },
                {
                  icon: "🌙👀",
                  text: "May you get everything you pray for, except maybe the things you ask for at 3 AM when your brain has clearly stopped working. 😭😂",
                  highlight: true
                },
                {
                  icon: "✨",
                  text: "May your life be full of unforgettable memories, random laughter, peaceful days, exciting adventures, and people who make you feel truly special.",
                  highlight: false
                },
                {
                  icon: "🧠💀",
                  text: "And please, never change… unless it’s your habit of overthinking and forgetting everything. That one can definitely go. 😂",
                  highlight: true
                },
                {
                  icon: "🫶🏻💗",
                  text: "Stay happy. Stay blessed. Stay exactly as wonderfully weird as you are. 🫶🏻💗",
                  highlight: false
                },
                {
                  icon: "🤲🏻✨",
                  text: "May Allah protect you, guide you, increase you in goodness, and make every coming year of your life better than the one before.",
                  highlight: false
                },
                {
                  icon: "👀😂💗",
                  text: `Happy Birthday once again, ${name}! 🎂✨ Now go enjoy your day… before someone reminds you that you’re getting older. 👀😂💗`,
                  highlight: true
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 md:p-5 rounded-2xl border flex items-start gap-4 ${
                    item.highlight
                      ? 'bg-amber-400/10 border-amber-400/30 text-amber-200'
                      : 'bg-white/5 border-white/10 text-slate-200'
                  }`}
                >
                  <span className="text-2xl shrink-0 select-none">{item.icon}</span>
                  <p className="text-base md:text-lg leading-relaxed font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: 2013-2026 Timeline */}
          <section className="px-4 max-w-5xl mx-auto text-center">
            <div className="space-y-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-semibold">
                <Camera className="w-4 h-4 text-purple-400" />
                <span>PHOTO TIMELINE ARCHIVES</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white glow-text-purple">
                2013 — 2026 Memory Vault
              </h2>
            </div>
            <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl space-y-6">
              <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
                {yearsTimeline.map((yr) => (
                  <div
                    key={yr}
                    className="min-w-[130px] sm:min-w-[160px] h-44 rounded-2xl glass-card border border-white/10 flex flex-col items-center justify-center p-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-2">
                      <Camera className="w-5 h-5 text-slate-500" />
                    </div>
                    <span className="font-serif text-2xl font-bold text-white">{yr}</span>
                    <span className="text-[10px] text-slate-500 uppercase mt-1">[EMPTY]</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-400/30 text-pink-200 max-w-md mx-auto flex items-center justify-center gap-3">
                <AlertCircle className="w-5 h-5 text-pink-400 shrink-0" />
                <p className="text-sm font-medium">
                  Honestly, I didn't have your pictures, so that's why this whole timeline is empty! 😂📸
                </p>
              </div>
            </div>
          </section>

          {/* Section: Wishlist & Questions (Sent to yaawarabbass@gmail.com) */}
          <section className="px-4 max-w-3xl mx-auto">
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>CONFIDENTIAL QUESTIONNAIRE</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white glow-text-gold">
                Your Upcoming Year & Memories
              </h2>
            </div>
            <div className="glass-card rounded-3xl p-6 md:p-10 border border-white/20 shadow-2xl">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-slate-200 font-semibold text-sm md:text-base flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    What do you genuinely want in this upcoming year? (Your Wishlist)
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={wishlistText}
                    onChange={(e) => setWishlistText(e.target.value)}
                    placeholder="Write all your goals, wishes, or demands..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-200 font-semibold text-sm md:text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    What was the best moment of this year?
                  </label>
                  <input
                    type="text"
                    required
                    value={bestMomentText}
                    onChange={(e) => setBestMomentText(e.target.value)}
                    placeholder="That one memory that made you genuinely happy..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-200 font-semibold text-sm md:text-base flex items-center gap-2">
                    <Smile className="w-4 h-4 text-purple-300" />
                    A moment you wish would come again?
                  </label>
                  <input
                    type="text"
                    required
                    value={repeatMomentText}
                    onChange={(e) => setRepeatMomentText(e.target.value)}
                    placeholder="A memory or feeling you'd relive in a heartbeat..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-slate-200 font-semibold text-sm md:text-base flex items-center gap-2">
                    <Mail className="w-4 h-4 text-pink-400" />
                    Feedback / Message for Yawar (Sent directly to yaawarabbass@gmail.com):
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Compliments, roasts, or a review of this site! 😂"
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all text-sm md:text-base"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-slate-950 font-extrabold text-xl shadow-2xl hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-3"
                >
                  <Flame className="w-6 h-6 animate-pulse" />
                  <span>{isSubmitting ? 'Sending to Yawar...' : 'Move to Surprise 💥'}</span>
                </button>
              </form>
            </div>
          </section>

          {/* Interactive Cake Section */}
          <section className="px-4 max-w-3xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-8 border border-white/20 shadow-2xl space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white glow-text-purple">
                  Make a wish & blow out the candles
                </h2>
                <p className="text-slate-300 text-sm md:text-base">
                  Tap each candle flame or hit the button below!
                </p>
              </div>
              <div className="flex justify-center items-end gap-8 my-4">
                {candles.map((extinguished, idx) => (
                  <div key={idx} onClick={() => extinguishCandle(idx)} className="cursor-pointer flex flex-col items-center">
                    <div className="h-8 flex items-center justify-center">
                      {!extinguished ? (
                        <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full blur-[1px] shadow-[0_0_15px_rgba(251,191,36,0.9)] animate-pulse" />
                      ) : (
                        <span className="text-xs text-slate-500 font-bold">💨</span>
                      )}
                    </div>
                    <div className="w-3 h-14 bg-gradient-to-b from-pink-400 to-purple-500 rounded-t shadow" />
                  </div>
                ))}
              </div>
              <div className="w-64 sm:w-80 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center font-bold text-white shadow-lg">
                HAPPY BIRTHDAY {name.toUpperCase()}
              </div>
              {!allBlown ? (
                <button
                  onClick={handleBlowAll}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 text-white font-bold text-lg shadow-xl cursor-pointer hover:scale-105 transition-transform"
                >
                  <Wind className="w-5 h-5 inline mr-2" />
                  Blow Out Candles
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-400/20 text-amber-200 font-bold text-xl inline-flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-amber-300" />
                  Wish locked into the stars! ✨
                </div>
              )}
            </div>
          </section>

          {/* Secret Gift Box */}
          <section className="px-4 max-w-2xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-8 border border-amber-400/30 shadow-2xl space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white glow-text-gold">
                A Final Locked Gift
              </h2>
              {!unlockedGift ? (
                <div className="space-y-6">
                  <div onClick={handleUnlockGift} className="text-8xl cursor-pointer hover:scale-110 transition-transform">
                    🎁
                  </div>
                  <button
                    onClick={handleUnlockGift}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-slate-950 font-extrabold text-lg shadow-xl cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Lock className="w-5 h-5 inline mr-2" />
                    Unlock My Surprise
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-8xl animate-bounce">🎉</div>
                  <p className="text-2xl font-serif text-slate-100">
                    "You made it this far, so you deserve a little extra happiness today and always."
                  </p>
                  <h3 className="text-3xl font-serif font-bold text-pink-400 glow-text-pink">
                    Happy Birthday, {name}! 🤍
                  </h3>
                </div>
              )}
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-4 text-center text-slate-400 text-xs md:text-sm font-mono space-y-2 border-t border-white/5">
            <div>CELEBRATION DEPLOYED FOR {name.toUpperCase()}</div>
            <div className="text-slate-300 font-semibold">developed by Yawar Abbas</div>
          </footer>
        </main>
      )}

      {/* BOOM! Animation Overlay */}
      <AnimatePresence>
        {boomState && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 2.5, 4], opacity: [1, 1, 0] }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 pointer-events-none"
          >
            <span className="text-7xl sm:text-9xl font-extrabold text-amber-300 glow-text-gold">
              💥 BOOM! 💥
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Joker Modal */}
      <AnimatePresence>
        {showJoker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="max-w-md w-full glass-card p-8 rounded-3xl text-center border border-pink-400 shadow-[0_0_60px_rgba(236,72,153,0.6)] space-y-6"
            >
              <div className="text-9xl animate-bounce">🃏</div>
              <h3 className="text-4xl sm:text-5xl font-serif font-extrabold text-amber-300 glow-text-gold">
                HAPPY BIRTHDAY!
              </h3>
              <p className="text-lg text-slate-100 font-medium">
                Did you really think it was going to be serious? 😂 Have the most wonderful year ahead, {name}!
              </p>
              <button
                onClick={() => setShowJoker(false)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-base cursor-pointer hover:scale-105 transition-transform"
              >
                Close & Enjoy the Music 🎶
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
