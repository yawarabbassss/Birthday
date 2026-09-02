import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Laugh,
  Flame,
  Camera,
  AlertCircle,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
  CheckCircle,
  Wind,
  Lock,
  ArrowDown
} from 'lucide-react';

export default function App() {
  // Step 0: Name entry, Step 1: Teaser, Step 2: Full experience
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState(false);

  // Audio Engine: YouTube background player for "Kalyani"
  const [musicPlaying, setMusicPlaying] = useState(false);
  const ytPlayerRef = useRef(null);

  // Interactive Cake / Candles State
  const [candles, setCandles] = useState([false, false, false]);
  const [allBlown, setAllBlown] = useState(false);

  // Secret Gift State
  const [unlockedGift, setUnlockedGift] = useState(false);

  // Wishlist & Feedback Inputs (Discreetly sent to email)
  const [wishlist, setWishlist] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Boom and Joker Surprise States
  const [boomState, setBoomState] = useState(false);
  const [showJoker, setShowJoker] = useState(false);

  // Reset session cleanly on every reload
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  // Initialize background YouTube audio
  useEffect(() => {
    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        ytPlayerRef.current = new window.YT.Player('youtube-audio-stream', {
          videoId: 'xvT1jH8B9AM',
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: 'xvT1jH8B9AM',
            modestbranding: 1,
            rel: 0,
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

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setNameError(true);
      return;
    }
    const entered = nameInput.trim();
    setName(entered);
    setStep(1);

    // Unmute & play background music
    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      ytPlayerRef.current.playVideo();
      setMusicPlaying(true);
    }
  };

  const extinguishCandle = (idx) => {
    if (candles[idx]) return;
    const updated = [...candles];
    updated[idx] = true;
    setCandles(updated);
    if (updated.every((val) => val === true)) {
      triggerAllBlown();
    }
  };

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
      colors: ['#E8C595', '#C76D7E', '#FBF8F5']
    });
  };

  const handleUnlockGift = () => {
    setUnlockedGift(true);
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#E8C595', '#C76D7E', '#FBF8F5']
    });
  };

  // Submit wishlist & message silently to email, then trigger boom + joker
  const handleWishlistSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/yaawarabbass@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user_name: name,
          wishlist_upcoming_year: wishlist,
          personal_message: feedback,
          _subject: `Birthday Note & Wishlist from ${name}`
        })
      });
    } catch (err) {
      // Fall through smoothly
    }

    setIsSubmitting(false);

    // Boom Animation Trigger
    setBoomState(true);

    setTimeout(() => {
      setBoomState(false);
      setShowJoker(true);
      confetti({
        particleCount: 260,
        spread: 130,
        origin: { y: 0.5 },
        colors: ['#E8C595', '#C76D7E', '#FBF8F5']
      });
    }, 1100);
  };

  const yearsTimeline = Array.from({ length: 2026 - 2013 + 1 }, (_, i) => 2013 + i);

  return (
    <div className="min-h-screen bg-[#07070A] text-[#FBF8F5] selection:bg-[#C76D7E] selection:text-white font-sans relative overflow-x-hidden">
      {/* Hidden YouTube Audio Streamer */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none opacity-0">
        <div id="youtube-audio-stream" />
      </div>

      {/* SVG Film-Stock Grain Overlay */}
      <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04]">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Ambient Celestial Video Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(7,7,10,0.4) 0%, #07070A 90%)'
          }}
        />
      </div>

      {/* Floating Audio Controller */}
      <div className="fixed top-6 right-6 z-40">
        <button
          onClick={toggleMusic}
          className="glass-pill px-4 py-2.5 rounded-full flex items-center gap-3 border border-white/10 text-xs font-mono text-[#FBF8F5] shadow-lg hover:border-[#E8C595]/40 transition-colors cursor-pointer"
        >
          <div className="flex items-end gap-1 h-3.5">
            {[0.5, 1, 0.7, 0.4].map((scale, i) => (
              <motion.span
                key={i}
                className="w-0.5 bg-[#E8C595] rounded-full inline-block"
                animate={{ height: musicPlaying ? ['20%', `${scale * 100}%`, '20%'] : '25%' }}
                transition={{ repeat: Infinity, duration: 0.8 + i * 0.2, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <span className="hidden sm:inline text-[#8F8799]">
            {musicPlaying ? 'KALYANI (LIVE)' : 'PAUSED'}
          </span>
          {musicPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#E8C595]" /> : <VolumeX className="w-3.5 h-3.5 text-[#8F8799]" />}
        </button>
      </div>

      {/* STEP 0: Modal Asking for User's Name */}
      {step === 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07070A]/90 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md glass-nocturne p-8 rounded-[2.5rem] text-center border border-white/10 shadow-2xl relative overflow-hidden space-y-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8F8799]">
              IDENTITY VERIFICATION
            </p>
            <h2 className="text-3xl md:text-4xl font-serif italic text-[#FBF8F5]">
              Wait... who are you?
            </h2>
            <p className="text-sm text-[#8F8799] font-light">
              Enter your name to unlock your personalized birthday experience.
            </p>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (nameError) setNameError(false);
                }}
                placeholder="Enter your name..."
                className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-[#8F8799] text-center focus:outline-none focus:border-[#E8C595] transition-all font-mono text-sm"
                autoFocus
              />
              {nameError && <p className="text-[#C76D7E] text-xs font-mono">Please enter your name!</p>}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#E8C595] to-[#C76D7E] text-[#07070A] font-semibold text-sm tracking-wider uppercase shadow-lg shadow-[#E8C595]/20 hover:scale-[1.02] cursor-pointer transition-transform"
              >
                Let's Go ✨
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* STEP 1: Teaser Screen */}
      {step === 1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#07070A]/95 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl text-center space-y-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8F8799]">
              DESTINED ALIGNMENT
            </p>
            <h1 className="text-4xl md:text-6xl font-serif italic text-[#FBF8F5]">
              Hey, {name}... 🥹
            </h1>
            <p className="text-lg md:text-xl text-[#E8C595] font-light">
              Looks like someone has a very special celebration today.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E8C595] to-[#C76D7E] text-[#07070A] font-semibold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(232,197,149,0.3)] hover:scale-105 transition-transform cursor-pointer"
              >
                Unlock Celebration ✨
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* STEP 2: Main Experience */}
      {step === 2 && (
        <main className="relative z-10 space-y-24 md:space-y-36 pb-24">
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#E8C595]/20 font-mono text-xs tracking-[0.2em] text-[#E8C595]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>A DATE CARVED IN THE STARS</span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif italic text-[#FBF8F5] leading-tight">
                Wishing the happiest of birthdays to
              </h1>
              <div className="font-serif italic text-6xl sm:text-8xl md:text-9xl champagne-shimmer font-bold leading-none py-2">
                {name}.
              </div>
              <p className="text-lg sm:text-xl text-[#8F8799] font-light max-w-xl mx-auto pt-2">
                Today isn't just another date on the calendar. The cosmos lights up exclusively for you.
              </p>
              <div className="pt-12 flex flex-col items-center gap-2 font-mono text-xs tracking-widest text-[#8F8799]">
                <span>Scroll to unpack your chapter</span>
                <ArrowDown className="w-4 h-4 animate-bounce text-[#E8C595]" />
              </div>
            </div>
          </section>

          {/* Section: Your Exact Birthday Wish (Funny & Heartfelt) */}
          <section className="px-4 max-w-4xl mx-auto">
            <div className="text-center space-y-3 mb-10">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#C76D7E]">
                A TRIBUTE FOR YOU
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic text-[#FBF8F5]">
                A Message from the Heart (and Mind 😂)
              </h2>
            </div>
            <div className="glass-nocturne rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl space-y-4">
              {[
                {
                  icon: "🥹💗✨",
                  text: `Happy Birthday, ${name}! 🥹💗✨ May Allah bless you with endless happiness, peace, success, and all the beautiful things your heart wishes for.`,
                  highlight: false
                },
                {
                  icon: "🤍",
                  text: "May every new chapter of your life bring you closer to your dreams, surrounded by people who genuinely love and value you. 🤍",
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
                  className={`p-4 md:p-5 rounded-2xl border flex items-start gap-4 transition-all duration-300 ${
                    item.highlight
                      ? 'bg-[#E8C595]/10 border-[#E8C595]/30 text-[#E8C595]'
                      : 'bg-white/5 border-white/5 text-[#FBF8F5]/90'
                  }`}
                >
                  <span className="text-2xl shrink-0 select-none">{item.icon}</span>
                  <p className="text-base md:text-lg leading-relaxed font-light">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: 2013-2026 Empty Photo Timeline */}
          <section className="px-4 max-w-5xl mx-auto text-center">
            <div className="space-y-3 mb-8">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8F8799]">
                ARCHIVAL TIMELINE
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic text-[#FBF8F5]">
                The 2013 — 2026 Archive
              </h2>
            </div>
            <div className="glass-nocturne rounded-[2.5rem] p-6 md:p-8 border border-white/10 shadow-2xl space-y-6">
              <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
                {yearsTimeline.map((yr) => (
                  <div
                    key={yr}
                    className="min-w-[130px] sm:min-w-[160px] h-44 rounded-2xl bg-[#120F17] border border-white/5 flex flex-col items-center justify-center p-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                      <Camera className="w-5 h-5 text-[#8F8799]" />
                    </div>
                    <span className="font-mono text-xl text-[#E8C595]">{yr}</span>
                    <span className="text-[10px] text-[#8F8799] uppercase font-mono mt-1">[EMPTY]</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-[#C76D7E]/10 border border-[#C76D7E]/30 text-[#C76D7E] max-w-md mx-auto flex items-center justify-center gap-3">
                <AlertCircle className="w-5 h-5 text-[#C76D7E] shrink-0" />
                <p className="text-xs sm:text-sm font-medium">
                  Honestly, I didn't have your pictures, so that's why this whole timeline is empty! 😂📸
                </p>
              </div>
            </div>
          </section>

          {/* Section: Wishlist & Secret Thoughts */}
          <section className="px-4 max-w-3xl mx-auto">
            <div className="text-center space-y-3 mb-8">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#E8C595]">
                YOUR CHAPTER
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic text-[#FBF8F5]">
                Upcoming Year & Wishlist
              </h2>
            </div>
            <div className="glass-nocturne rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl">
              <form onSubmit={handleWishlistSubmit} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[#FBF8F5] text-sm font-medium flex items-center gap-2 font-mono">
                    <Heart className="w-4 h-4 text-[#C76D7E]" />
                    What do you want in this upcoming year? (Your Wishlist)
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={wishlist}
                    onChange={(e) => setWishlist(e.target.value)}
                    placeholder="Write all your wishes, goals, or demands..."
                    className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-[#8F8799] focus:outline-none focus:border-[#E8C595] transition-all text-sm"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[#FBF8F5] text-sm font-medium flex items-center gap-2 font-mono">
                    <Sparkles className="w-4 h-4 text-[#E8C595]" />
                    Leave a note or message:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Drop a note, roasted remarks, or your thoughts... 😂"
                    className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-[#8F8799] focus:outline-none focus:border-[#E8C595] transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-full bg-gradient-to-r from-[#E8C595] to-[#C76D7E] text-[#07070A] font-semibold text-sm tracking-wider uppercase shadow-xl hover:scale-[1.01] transition-transform cursor-pointer flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  <span>{isSubmitting ? 'Securing...' : 'Move to Surprise 💥'}</span>
                </button>
              </form>
            </div>
          </section>

          {/* Section: Interactive Cake */}
          <section className="px-4 max-w-3xl mx-auto text-center">
            <div className="glass-nocturne rounded-[2.5rem] p-8 border border-white/10 shadow-2xl space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-serif italic text-[#FBF8F5]">
                  Make a wish & blow out the candles
                </h2>
                <p className="text-xs text-[#8F8799]">
                  Tap each flame individually or click the button below!
                </p>
              </div>
              <div className="flex justify-center items-end gap-8 my-4">
                {candles.map((extinguished, idx) => (
                  <div key={idx} onClick={() => extinguishCandle(idx)} className="cursor-pointer flex flex-col items-center">
                    <div className="h-8 flex items-center justify-center">
                      {!extinguished ? (
                        <div className="w-4 h-7 bg-gradient-to-t from-[#C76D7E] via-[#E8C595] to-white rounded-full blur-[1px] shadow-[0_0_15px_#E8C595] animate-pulse" />
                      ) : (
                        <span className="text-xs text-[#8F8799] font-mono">💨</span>
                      )}
                    </div>
                    <div className="w-3 h-14 bg-gradient-to-b from-[#E8C595] to-[#C76D7E] rounded-t shadow" />
                  </div>
                ))}
              </div>
              <div className="w-64 sm:w-80 h-16 bg-[#120F17] border border-white/10 rounded-2xl mx-auto flex items-center justify-center font-mono text-sm tracking-widest text-[#E8C595] shadow-lg">
                HAPPY BIRTHDAY {name.toUpperCase()}
              </div>
              {!allBlown ? (
                <button
                  onClick={handleBlowAll}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E8C595] to-[#C76D7E] text-[#07070A] font-semibold text-xs tracking-wider uppercase shadow-xl cursor-pointer hover:scale-105 transition-transform"
                >
                  <Wind className="w-4 h-4 inline mr-2" />
                  Blow Out Candles
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-[#E8C595]/10 text-[#E8C595] font-mono text-sm inline-flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E8C595]" />
                  Wish locked into the stars! ✨
                </div>
              )}
            </div>
          </section>

          {/* Section: Secret Surprise Box */}
          <section className="px-4 max-w-2xl mx-auto text-center">
            <div className="glass-nocturne rounded-[2.5rem] p-8 border border-white/10 shadow-2xl space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif italic text-[#FBF8F5]">
                A Final Locked Gift
              </h2>
              {!unlockedGift ? (
                <div className="space-y-6">
                  <div onClick={handleUnlockGift} className="text-8xl cursor-pointer hover:scale-110 transition-transform">
                    🎁
                  </div>
                  <button
                    onClick={handleUnlockGift}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E8C595] to-[#C76D7E] text-[#07070A] font-semibold text-xs tracking-wider uppercase shadow-xl cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Lock className="w-4 h-4 inline mr-2" />
                    Unlock My Surprise
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-8xl animate-bounce">🎉</div>
                  <p className="text-xl font-serif italic text-[#FBF8F5]">
                    "You made it this far, so you deserve a little extra happiness today and always."
                  </p>
                  <h3 className="text-3xl font-serif italic text-[#E8C595]">
                    Happy Birthday, {name}! 🤍
                  </h3>
                </div>
              )}
            </div>
          </section>

          {/* The Architect's Signature Footer */}
          <footer className="py-12 px-6 sm:px-12 text-center text-[#8F8799] font-mono text-xs space-y-2 border-t border-white/5 max-w-7xl mx-auto">
            <div>CELEBRATION DEPLOYED FOR {name.toUpperCase()} // ALL RIGHTS RESERVED</div>
            <div className="text-[#FBF8F5] flex items-center justify-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8C595]" />
              <span>developed by Yawar Abbas</span>
            </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#07070A]/95 pointer-events-none"
          >
            <span className="text-7xl sm:text-9xl font-serif italic font-bold text-[#E8C595] drop-shadow-[0_0_35px_rgba(232,197,149,0.7)]">
              💥 BOOM! 💥
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Joker Modal */}
      <AnimatePresence>
        {showJoker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07070A]/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="max-w-md w-full glass-nocturne p-8 rounded-[2.5rem] text-center border border-[#C76D7E]/40 shadow-[0_0_60px_rgba(199,109,126,0.3)] space-y-6"
            >
              <div className="text-9xl animate-bounce">🃏</div>
              <h3 className="text-4xl sm:text-5xl font-serif italic text-[#E8C595]">
                HAPPY BIRTHDAY!
              </h3>
              <p className="text-sm text-[#FBF8F5] font-light">
                Did you really think it was going to be serious? 😂 Have the most wonderful year ahead, {name}!
              </p>
              <button
                onClick={() => setShowJoker(false)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#E8C595] to-[#C76D7E] text-[#07070A] font-semibold text-xs tracking-wider uppercase cursor-pointer hover:scale-105 transition-transform"
              >
                Close & Keep The Music Playing 🎶
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
