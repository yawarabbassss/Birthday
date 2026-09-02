import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, Flame, Check, Stars, ArrowDown, Heart } from 'lucide-react';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const ytPlayerRef = useRef(null);
  const htmlAudioRef = useRef(null);

  // Chapter 01: Interactive Evasive Key Quiz State
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [evasiveAttempts, setEvasiveAttempts] = useState(0);
  const [tooltip, setTooltip] = useState('');
  const [quizUnlocked, setQuizUnlocked] = useState(false);

  // Chapter 02: Starlight Candle State
  const [candleLit, setCandleLit] = useState(true);
  const [candleProgress, setCandleProgress] = useState(0);
  const candleHoldInterval = useRef(null);

  // 09.09 Live Clock Ticker
  const [timeTicker, setTimeTicker] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeTicker(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize YouTube Background Audio Player (Kalyani)
  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      ytPlayerRef.current = new window.YT.Player('youtube-player', {
        videoId: 'xvT1jH8B9AM',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: 'xvT1jH8B9AM',
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(0);
          }
        }
      });
    };

    if (window.YT && window.YT.Player && !ytPlayerRef.current) {
      window.onYouTubeIframeAPIReady();
    }
  }, []);

  // "Curtain Call" Entry Gate Trigger: Unlocks audio with smooth fade-in
  const handleEnterCelebration = () => {
    setEntered(true);
    let started = false;

    // 1. Attempt YouTube Background Audio Engine
    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      try {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
        started = true;
        let volume = 0;
        const fadeYt = setInterval(() => {
          volume = Math.min(100, volume + 4);
          if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === 'function') {
            ytPlayerRef.current.setVolume(volume);
          }
          if (volume >= 100) clearInterval(fadeYt);
        }, 100);
      } catch (e) {
        started = false;
      }
    }

    // 2. Fallback to HTML5 audio if local /kalyani.mp3 is available
    if (!started && htmlAudioRef.current) {
      htmlAudioRef.current.volume = 0;
      htmlAudioRef.current.play().then(() => {
        setIsPlaying(true);
        let vol = 0;
        const fadeIn = setInterval(() => {
          vol = Math.min(1, vol + 0.04);
          if (htmlAudioRef.current) htmlAudioRef.current.volume = vol;
          if (vol >= 1) clearInterval(fadeIn);
        }, 100);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleAudio = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.getPlayerState === 'function') {
      const state = ytPlayerRef.current.getPlayerState();
      if (state === window.YT.PlayerState.PLAYING) {
        ytPlayerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      }
      return;
    }

    if (htmlAudioRef.current) {
      if (isPlaying) {
        htmlAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        htmlAudioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Flying Button Physics Engine
  const handleEvasiveHover = () => {
    if (evasiveAttempts === 0) {
      const randomX = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 80) + 90);
      const randomY = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 60) + 40);
      setBtnOffset({ x: randomX, y: randomY });
      setTooltip("Too slow! Try again 😉");
      setEvasiveAttempts(1);
    }
  };

  const handleCorrectChoice = () => {
    setQuizUnlocked(true);
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E8C595', '#C76D7E', '#FAF8F5']
    });
  };

  // Starlight Candle 3-Second Hold
  const startBlowing = () => {
    if (!candleLit) return;
    candleHoldInterval.current = setInterval(() => {
      setCandleProgress((prev) => {
        if (prev >= 100) {
          clearInterval(candleHoldInterval.current);
          extinguishCandle();
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const stopBlowing = () => {
    if (candleHoldInterval.current) {
      clearInterval(candleHoldInterval.current);
      if (candleLit) setCandleProgress(0);
    }
  };

  const extinguishCandle = () => {
    setCandleLit(false);
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.7 },
      colors: ['#E8C595', '#C76D7E', '#FBF8F5'],
      scalar: 1.2
    });
  };

  return (
    <div className="relative min-h-screen bg-[#07070A] text-[#FBF8F5] selection:bg-[#C76D7E] selection:text-white font-sans overflow-x-hidden">
      {/* Hidden YouTube Audio Streamer */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none opacity-0">
        <div id="youtube-player"></div>
      </div>
      {/* HTML5 Audio Local Fallback */}
      <audio ref={htmlAudioRef} src="/kalyani.mp3" loop preload="auto" />

      {/* SVG Film-Stock Grain Filter */}
      <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04]">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Persistent Ambient Celestial Background */}
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

      {/* "Curtain Call" Entry Gate */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07070A] p-6 text-center"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(199,109,126,0.18),transparent_65%)]" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 relative z-10 max-w-md"
            >
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8F8799]">
                AN EXPERIENCE FOR ZAINII
              </p>
              <h1 className="font-serif italic text-4xl sm:text-5xl text-[#FBF8F5] leading-tight">
                A date carved in the stars.
              </h1>
              <p className="text-sm text-[#8F8799] font-light leading-relaxed">
                Step inside the celestial rose nocturne prepared exclusively for your 9th of September celebration.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleEnterCelebration}
                  className="relative group px-8 py-4 rounded-full bg-gradient-to-r from-[#E8C595] to-[#C76D7E] text-[#07070A] font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_30px_rgba(232,197,149,0.3)] hover:shadow-[0_0_50px_rgba(232,197,149,0.6)] cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Enter the Celebration
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div className="absolute -inset-1 rounded-full bg-white/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Island Navigation & Real-time Audio Visualizer */}
      <header className="fixed top-6 inset-x-0 z-40 max-w-5xl mx-auto px-4 pointer-events-none">
        <div className="flex items-center justify-between">
          <div className="pointer-events-auto glass-pill px-5 py-2.5 rounded-full flex items-center gap-3 shadow-lg">
            <span className="font-mono text-xs tracking-widest text-[#E8C595]">
              ZAINII // 09.09
            </span>
          </div>

          <button
            onClick={toggleAudio}
            className="pointer-events-auto glass-pill px-4 py-2.5 rounded-full flex items-center gap-3 border border-white/10 text-xs font-mono text-[#FBF8F5] shadow-lg hover:border-[#E8C595]/40 transition-colors cursor-pointer"
            title={isPlaying ? "Pause Kalyani" : "Play Kalyani"}
          >
            <div className="flex items-end gap-1 h-3.5">
              {[0.5, 1, 0.7, 0.4].map((scale, i) => (
                <motion.span
                  key={i}
                  className="w-0.5 bg-[#E8C595] rounded-full inline-block"
                  animate={{ height: isPlaying ? ['20%', `${scale * 100}%`, '20%'] : '25%' }}
                  transition={{ repeat: Infinity, duration: 0.8 + i * 0.2, ease: 'easeInOut' }}
                />
              ))}
            </div>
            <span className="hidden sm:inline text-[#8F8799]">
              {isPlaying ? "KALYANI (LIVE)" : "PAUSED"}
            </span>
            {isPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#E8C595]" /> : <VolumeX className="w-3.5 h-3.5 text-[#8F8799]" />}
          </button>
        </div>
      </header>

      {/* Main Experience Flow */}
      <main className="relative z-10 space-y-28 md:space-y-40 pb-20">
        {/* The Hero Canvas: 09.09 Moment */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-28">
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#E8C595]/20 font-mono text-xs tracking-[0.2em] text-[#E8C595]"
            >
              <Stars className="w-3.5 h-3.5" />
              <span>A DATE CARVED IN THE STARS — 9TH SEPTEMBER</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="space-y-2"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#FBF8F5]/90">
                Wishing the happiest of birthdays to
              </h2>
              <h1 className="font-serif italic text-6xl sm:text-8xl md:text-9xl champagne-shimmer font-bold leading-none py-2">
                Zainii.
              </h1>
            </motion.div>

            {/* Monospace September 9th Live Clock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-2 font-mono text-sm tracking-widest text-[#8F8799] flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#C76D7E] animate-ping" />
              <span>SEPTEMBER 09 // UTC TICKER: {timeTicker}</span>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-16 flex flex-col items-center gap-2 font-mono text-xs tracking-widest text-[#8F8799]"
            >
              <span>Scroll to unpack your chapter</span>
              <ArrowDown className="w-4 h-4 animate-bounce text-[#E8C595]" />
            </motion.div>
          </div>
        </section>

        {/* Chapter 01: The Interactive "Evasive Key" Quiz */}
        <section className="px-4 max-w-2xl mx-auto">
          <div className="glass-nocturne rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="space-y-6">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#C76D7E]">
                CHAPTER 01 // THE KEY
              </span>

              <h3 className="font-serif italic text-3xl sm:text-4xl text-[#FBF8F5] leading-snug">
                "Before we unlock your gift... are you officially the coolest person born on September 9th?"
              </h3>

              {!quizUnlocked ? (
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative min-h-[120px]">
                  {/* Option A (The True Key) */}
                  <button
                    onClick={handleCorrectChoice}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E8C595] to-[#C76D7E] text-[#07070A] font-medium text-sm tracking-wider uppercase transition-transform active:scale-95 shadow-lg shadow-[#E8C595]/20 cursor-pointer"
                  >
                    Obviously, 100% Yes
                  </button>

                  {/* Option B (The Evasive Springing Target) */}
                  <motion.div
                    animate={{ x: btnOffset.x, y: btnOffset.y }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="relative inline-block"
                  >
                    <button
                      onMouseEnter={handleEvasiveHover}
                      onClick={() => {
                        if (evasiveAttempts > 0) handleCorrectChoice();
                      }}
                      className="px-8 py-4 rounded-full glass-pill border border-white/10 hover:border-white/20 text-[#8F8799] text-sm tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      Not sure, maybe?
                    </button>
                    {tooltip && (
                      <span className="absolute -top-8 inset-x-0 mx-auto font-mono text-[10px] text-[#E8C595] whitespace-nowrap">
                        {tooltip}
                      </span>
                    )}
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-[#E8C595]/10 border border-[#E8C595]/30 text-[#E8C595] space-y-2"
                >
                  <p className="font-mono text-xs tracking-widest uppercase">
                    Verification Confirmed
                  </p>
                  <p className="font-serif italic text-xl text-[#FBF8F5]">
                    Correct answer, Zainii. You unlocked the vault below.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Chapter 02: "The Vault of Wishes" */}
        <section className="px-4 max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#E8C595]">
              CHAPTER 02 // BESPOKE SURPRISE
            </span>
            <h2 className="font-serif italic text-4xl sm:text-5xl text-[#FBF8F5]">
              The Vault of Wishes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {/* Card 1: The Constellation */}
            <div className="glass-nocturne rounded-[2rem] p-8 border border-white/10 flex flex-col justify-between hover:border-[#E8C595]/30 transition-all duration-300">
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#8F8799] uppercase tracking-widest">01 // CONSTELLATION</span>
                <h4 className="font-serif italic text-2xl text-[#E8C595]">Z & 9 Alignment</h4>
                <p className="text-xs text-[#8F8799] leading-relaxed">
                  Interactive astral node. Linking the stellar coordinates of September 9th.
                </p>
              </div>

              <div className="h-44 my-6 rounded-xl bg-black/40 border border-white/5 relative flex items-center justify-center overflow-hidden group">
                <svg className="w-36 h-36 stroke-[#E8C595]/40 group-hover:stroke-[#E8C595] transition-colors duration-500" viewBox="0 0 100 100">
                  <circle cx="20" cy="25" r="2.5" fill="#FAF8F5" />
                  <circle cx="80" cy="25" r="2.5" fill="#FAF8F5" />
                  <circle cx="20" cy="75" r="2.5" fill="#FAF8F5" />
                  <circle cx="80" cy="75" r="2.5" fill="#FAF8F5" />
                  <line x1="20" y1="25" x2="80" y2="25" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="80" y1="25" x2="20" y2="75" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="20" y1="75" x2="80" y2="75" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="50" cy="45" r="12" fill="none" strokeWidth="1" />
                  <line x1="62" y1="45" x2="62" y2="65" strokeWidth="1" />
                </svg>
                <span className="absolute bottom-3 font-mono text-[10px] text-[#8F8799]">
                  STEL.0909 // ACTIVE
                </span>
              </div>
            </div>

            {/* Card 2: The Written Heart */}
            <div className="glass-nocturne rounded-[2rem] p-8 border border-white/10 flex flex-col justify-between hover:border-[#C76D7E]/40 transition-all duration-300">
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#8F8799] uppercase tracking-widest">02 // THE TRIBUTE</span>
                <h4 className="font-serif italic text-2xl text-[#C76D7E]">The Written Heart</h4>
              </div>

              <blockquote className="my-6 font-serif italic text-lg sm:text-xl text-[#FBF8F5] leading-relaxed border-l-2 border-[#C76D7E]/50 pl-4 py-2">
                "May your year ahead be as luminous as midnight stars, filled with unyielding joy, boundless horizons, and moments that take your breath away."
              </blockquote>

              <span className="font-mono text-xs text-[#8F8799] text-right">
                — EXCLUSIVELY FOR ZAINII
              </span>
            </div>

            {/* Card 3: The Digital Candle Wish */}
            <div className="glass-nocturne rounded-[2rem] p-8 border border-white/10 flex flex-col justify-between hover:border-[#E8C595]/30 transition-all duration-300">
              <div className="space-y-3">
                <span className="font-mono text-xs text-[#8F8799] uppercase tracking-widest">03 // CELEBRATION ARTIFACT</span>
                <h4 className="font-serif italic text-2xl text-[#E8C595]">The Birthday Wish</h4>
                <p className="text-xs text-[#8F8799] leading-relaxed">
                  Hold the button for 3 seconds to make a wish and extinguish the candle.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center my-6 space-y-4">
                <div className="relative h-16 flex items-center justify-center">
                  {candleLit ? (
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-5 h-8 bg-gradient-to-t from-[#C76D7E] via-[#E8C595] to-white rounded-full blur-[1px] shadow-[0_0_20px_#E8C595]"
                    />
                  ) : (
                    <span className="font-mono text-xs text-[#8F8799]">
                      [WISH SECURED IN STARS]
                    </span>
                  )}
                </div>

                {candleLit ? (
                  <button
                    onMouseDown={startBlowing}
                    onMouseUp={stopBlowing}
                    onTouchStart={startBlowing}
                    onTouchEnd={stopBlowing}
                    className="relative px-6 py-3 rounded-full bg-white/5 border border-[#E8C595]/30 text-xs font-mono text-[#E8C595] overflow-hidden cursor-pointer active:scale-95 transition-transform"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Flame className="w-3.5 h-3.5" />
                      Hold to Blow Out
                    </span>
                    <div
                      className="absolute left-0 inset-y-0 bg-[#E8C595]/30 transition-all duration-75"
                      style={{ width: `${candleProgress}%` }}
                    />
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#E8C595]">
                    <Check className="w-4 h-4" />
                    <span>LOCKED FOREVER</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 03: The Memory Horizon (Polaroid Drift) */}
        <section className="px-4 max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8F8799]">
              CHAPTER 03 // GALLERY
            </span>
            <h3 className="font-serif italic text-3xl sm:text-4xl text-[#FBF8F5]">
              The Memory Horizon
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
            {[
              {
                title: "Luminescent Radiance",
                sub: "Captured in time",
                img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
                tilt: "-rotate-2"
              },
              {
                title: "Nocturne Elegance",
                sub: "Midnight dreams",
                img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
                tilt: "rotate-2"
              },
              {
                title: "Golden Hour Glow",
                sub: "09.09 Odyssey",
                img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
                tilt: "-rotate-1"
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04, rotate: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-[#120F17] p-4 rounded-2xl border border-white/10 shadow-2xl ${card.tilt} transition-transform duration-300`}
              >
                <div className="overflow-hidden rounded-xl h-64 bg-black/40">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="pt-4 px-1 flex justify-between items-baseline">
                  <div>
                    <h5 className="font-serif italic text-lg text-[#FBF8F5]">{card.title}</h5>
                    <p className="font-mono text-[10px] text-[#8F8799] uppercase">{card.sub}</p>
                  </div>
                  <span className="font-mono text-xs text-[#E8C595]">0{i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The Architect's Signature Footer */}
        <footer className="rounded-t-[3rem] border-t border-white/5 bg-[#120F17]/80 backdrop-blur-md py-12 px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="font-mono text-xs tracking-widest text-[#8F8799] text-center sm:text-left">
              09.09 // FOR ZAINII // ALL RIGHTS RESERVED
            </div>
            <div className="font-mono text-xs tracking-wider text-[#FBF8F5] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8C595]" />
              <span>developed by Yawar Abbas</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
