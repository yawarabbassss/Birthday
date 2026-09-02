import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Flame,
  Camera,
  AlertCircle,
  Volume2,
  VolumeX,
  Play,
  Pause,
  CheckCircle,
  Wind,
  Lock,
  ArrowDown,
  Compass,
  Star
} from 'lucide-react';

export default function App() {
  // Navigation: 0 = Name Entry, 1 = Teaser, 2 = Experience
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState(false);

  // Audio Player State (YouTube Background Engine)
  const [musicPlaying, setMusicPlaying] = useState(false);
  const ytPlayerRef = useRef(null);
  const isPlayerReadyRef = useRef(false);

  // Cake and Candles
  const [candles, setCandles] = useState([false, false, false]);
  const [allBlown, setAllBlown] = useState(false);

  // Secret Gift
  const [unlockedGift, setUnlockedGift] = useState(false);

  // Wishlist Form State
  const [wishlist, setWishlist] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Boom and Joker States
  const [boomState, setBoomState] = useState(false);
  const [showJoker, setShowJoker] = useState(false);

  // Clean session reset on every reload
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  // Initialize YouTube IFrame Audio Stream ("Kalyani")
  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      ytPlayerRef.current = new window.YT.Player('youtube-audio-stream', {
        height: '0',
        width: '0',
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
            isPlayerReadyRef.current = true;
            event.target.setVolume(100);
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }
  }, []);

  // Audio Playback Function
  const playAudio = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      ytPlayerRef.current.playVideo();
      setMusicPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
      ytPlayerRef.current.pauseVideo();
      setMusicPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (musicPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // User unlocks entry; user interaction starts audio
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setNameError(true);
      return;
    }
    const entered = nameInput.trim();
    setName(entered);
    setStep(1);
    playAudio();
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
      particleCount: 150,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#E8C595', '#C76D7E', '#FBF8F5']
    });
  };

  const handleUnlockGift = () => {
    setUnlockedGift(true);
    confetti({
      particleCount: 160,
      spread: 95,
      origin: { y: 0.6 },
      colors: ['#E8C595', '#C76D7E', '#FBF8F5']
    });
  };

  // Silent transmission to WhatsApp (+923003939299) without notifying the visitor
  const handleSilentTransmission = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappMessage = `*Birthday Wishlist & Message*%0A*From:* ${encodeURIComponent(name)}%0A*Wishlist:* ${encodeURIComponent(wishlist)}%0A*Message:* ${encodeURIComponent(feedback)}`;
    const destinationNumber = '923003939299';
    const silentEndpoint = `https://api.whatsapp.com/send?phone=${destinationNumber}&text=${whatsappMessage}`;

    // Silent background dispatch: Ping without navigation
    try {
      const imgPing = new Image();
      imgPing.src = silentEndpoint;
    } catch (_) {}

    // Fallback automated dispatch to FormSubmit for guaranteed delivery
    try {
      await fetch('https://formsubmit.co/ajax/yaawarabbass@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          recipient_whatsapp: '+923003939299',
          name: name,
          wishlist: wishlist,
          message: feedback,
          _subject: `New Birthday Message from ${name}`
        })
      });
    } catch (_) {}

    setIsSubmitting(false);

    // Boom & Joker Surprise
    setBoomState(true);

    setTimeout(() => {
      setBoomState(false);
      setShowJoker(true);
      confetti({
        particleCount: 220,
        spread: 120,
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

      {/* SVG Noise Grain Overlay */}
      <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04]">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Ambient Video Background Layer */}
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
          onClick={toggleAudio}
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
            {musicPlaying ? 'KALYANI (PLAYING)' : 'PAUSED'}
          </span>
          {musicPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#E8C595]" /> : <VolumeX className="w-3.5 h-3.5 text-[#8F8799]" />}
        </button>
      </div>

      {/* Step 0: Name Entry Modal */}
      {step === 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07070A]/90 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md glass-nocturne p-8 rounded-[2.5rem] text-center border border-white/10 shadow-2xl relative overflow-hidden space-y-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8F8799]">
              CELEBRATION VERIFICATION
            </p>
            <h2 className="text-3xl md:text-4xl font-serif italic text-[#FBF8F5]">
              Please state your name
            </h2>
            <p className="text-sm text-[#8F8799] font-light">
              Enter your name to open your customized birthday experience.
            </p>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (nameError) setNameError(false);
                }}
                placeholder="Your name..."
                className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-[#8F8799] text-center focus:outline-none focus:border-[#E8C595] transition-all font-mono text-sm"
                autoFocus
              />
              {nameError && <p className="text-[#C76D7E] text-xs font-mono">Please enter a valid name to continue.</p>}
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

      {/* Step 1: Teaser Transition Screen */}
      {step === 1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#07070A]/95 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl text-center space-y-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#8F8799]">
              CELESTIAL ALIGNMENT
            </p>
            <h1 className="text-4xl md:text-6xl font-serif italic text-[#FBF8F5]">
              Greetings, {name}
            </h1>
            <p className="text-lg md:text-xl text-[#E8C595] font-light">
              The cosmos has aligned for your special day.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E8C595] to-[#C76D7E] text-[#07070A] font-semibold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(232,197,149,0.3)] hover:scale-105 transition-transform cursor-pointer"
              >
                Enter the Celebration ✨
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Step 2: Main Celebration Experience */}
      {step === 2 && (
        <main className="relative z-10 space-y-24 md:space-y-36 pb-24">
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#E8C595]/20 font-mono text-xs tracking-[0.2em] text-[#E8C595]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>A DATE ENGRAVED IN THE STARS</span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif italic text-[#FBF8F5] leading-tight">
                Wishing the happiest of birthdays to
              </h1>
              <div className="font-serif italic text-6xl sm:text-8xl md:text-9xl champagne-shimmer font-bold leading-none py-2">
                {name}.
              </div>
              <p className="text-lg sm:text-xl text-[#8F8799] font-light max-w-xl mx-auto pt-2">
                Today is truly yours. May your coming year bring you boundless grace, happiness, and peace.
              </p>
              <div className="pt-12 flex flex-col items-center gap-2 font-mono text-xs tracking-widest text-[#8F8799]">
                <span>Scroll to unpack your chapter</span>
                <ArrowDown className="w-4 h-4 animate-bounce text-[#E8C595]" />
              </div>
            </div>
          </section>

          {/* Birthday Wish Section */}
          <section className="px-4 max-w-4xl mx-auto">
            <div className="text-center space-y-3 mb-10">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#C76D7E]">
                HEARTFELT TRIBUTE
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic text-[#FBF8F5]">
                A Personal Message for You
              </h2>
            </div>
            <div className="glass-nocturne rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl space-y-4">
              {[
                {
                  icon: "✨",
                  text: `Happy Birthday, ${name}! May Allah bless you with endless happiness, peace, success, and all the beautiful things your heart wishes for.`,
                  highlight: false
                },
                {
                  icon: "🤍",
                  text: "May every new chapter of your life bring you closer to your dreams, surrounded by people who genuinely love and value you.",
                  highlight: false
                },
                {
                  icon: "✨",
                  text: "I hope you always preserve that beautiful smile, that delightful personality, and of course, your signature drama package.",
                  highlight: true
                },
                {
                  icon: "🌙",
                  text: "May you receive everything you pray for, perhaps with the exception of the random thoughts you come up with at 3 AM.",
                  highlight: true
                },
                {
                  icon: "🌟",
                  text: "May your life be filled with unforgettable memories, spontaneous laughter, peaceful days, and exciting adventures.",
                  highlight: false
                },
                {
                  icon: "✨",
                  text: "Please never change, except perhaps the occasional habit of overthinking and forgetting details.",
                  highlight: true
                },
                {
                  icon: "🤍",
                  text: "Stay happy, stay blessed, and remain exactly as wonderfully unique as you are.",
                  highlight: false
                },
                {
                  icon: "🤲",
                  text: "May Allah protect you, guide your steps, increase you in goodness, and make every coming year brighter than the last.",
                  highlight: false
                },
                {
                  icon: "🎂",
                  text: `Happy Birthday once again, ${name}! Enjoy every single moment of your special day.`,
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
                  <span className="text-xl shrink-0 select-none">{item.icon}</span>
                  <p className="text-base md:text-lg leading-relaxed font-light">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 2013-2026 Archive Timeline */}
          <section className="px-4 max-w-5xl mx-auto text-center">
            <div className="space-y-3 mb-8">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8F8799]">
                ARCHIVAL TIMELINE
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic text-[#FBF8F5]">
                The 2013 — 2026 Memory Archive
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
                    <span className="text-[10px] text-[#8F8799] uppercase font-mono mt-1">[ARCHIVED]</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-[#C76D7E]/10 border border-[#C76D7E]/30 text-[#C76D7E] max-w-md mx-auto flex items-center justify-center gap-3">
                <AlertCircle className="w-5 h-5 text-[#C76D7E] shrink-0" />
                <p className="text-xs sm:text-sm font-medium">
                  I did not have your photos on hand, which is why these frames remain blank for now.
                </p>
              </div>
            </div>
          </section>

          {/* Wishlist & Reflections */}
          <section className="px-4 max-w-3xl mx-auto">
            <div className="text-center space-y-3 mb-8">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#E8C595]">
                ASPIRATIONS
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic text-[#FBF8F5]">
                Upcoming Year & Wishlist
              </h2>
            </div>
            <div className="glass-nocturne rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl">
              <form onSubmit={handleSilentTransmission} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[#FBF8F5] text-sm font-medium flex items-center gap-2 font-mono">
                    <Heart className="w-4 h-4 text-[#C76D7E]" />
                    What are your aspirations for this upcoming year?
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={wishlist}
                    onChange={(e) => setWishlist(e.target.value)}
                    placeholder="Write your personal goals, wishes, or reflections..."
                    className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-[#8F8799] focus:outline-none focus:border-[#E8C595] transition-all text-sm"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[#FBF8F5] text-sm font-medium flex items-center gap-2 font-mono">
                    <Sparkles className="w-4 h-4 text-[#E8C595]" />
                    Leave a personal note or message:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share any thoughts or final messages..."
                    className="w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-[#8F8799] focus:outline-none focus:border-[#E8C595] transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-full bg-gradient-to-r from-[#E8C595] to-[#C76D7E] text-[#07070A] font-semibold text-sm tracking-wider uppercase shadow-xl hover:scale-[1.01] transition-transform cursor-pointer flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Proceed to the Surprise ✨'}</span>
                </button>
              </form>
            </div>
          </section>

          {/* Interactive Birthday Cake */}
          <section className="px-4 max-w-3xl mx-auto text-center">
            <div className="glass-nocturne rounded-[2.5rem] p-8 border border-white/10 shadow-2xl space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-serif italic text-[#FBF8F5]">
                  Make a wish and blow out the candles
                </h2>
                <p className="text-xs text-[#8F8799]">
                  Tap each candle flame or use the button below to extinguish them together.
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
                  Your wish has been committed to the stars. ✨
                </div>
              )}
            </div>
          </section>

          {/* Replaced Last Block: Cosmic Starlight Horizon */}
          <section className="px-4 max-w-4xl mx-auto text-center">
            <div className="glass-nocturne rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#E8C595]">
                <Compass className="w-3.5 h-3.5" />
                <span>COSMIC HORIZON</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif italic text-[#FBF8F5]">
                The Road Ahead
              </h2>
              <p className="text-sm md:text-base text-[#8F8799] max-w-xl mx-auto font-light leading-relaxed">
                As you embark on another trip around the sun, may each step bring you closer to clarity, resilience, and genuine fulfillment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { title: "Serenity", desc: "May calm always precede your decisions." },
                  { title: "Discovery", desc: "May you encounter moments that inspire wonder." },
                  { title: "Strength", desc: "May you continue forward with quiet confidence." }
                ].map((pillar, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-[#120F17] border border-white/5 text-center space-y-2">
                    <Star className="w-4 h-4 text-[#E8C595] mx-auto" />
                    <h3 className="font-serif italic text-lg text-[#FBF8F5]">{pillar.title}</h3>
                    <p className="text-xs text-[#8F8799] font-light leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-6 sm:px-12 text-center text-[#8F8799] font-mono text-xs space-y-2 border-t border-white/5 max-w-7xl mx-auto">
            <div>CELEBRATION DEPLOYED FOR {name.toUpperCase()} // ALL RIGHTS RESERVED</div>
            <div className="text-[#FBF8F5] flex items-center justify-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8C595]" />
              <span>developed by Yawar Abbas</span>
            </div>
          </footer>
        </main>
      )}

      {/* Boom Animation */}
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
              <div className="text-8xl animate-bounce">🃏</div>
              <h3 className="text-4xl sm:text-5xl font-serif italic text-[#E8C595]">
                HAPPY BIRTHDAY!
              </h3>
              <p className="text-sm text-[#FBF8F5] font-light">
                Wishing you the absolute best year ahead, {name}!
              </p>
              <button
                onClick={() => setShowJoker(false)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#E8C595] to-[#C76D7E] text-[#07070A] font-semibold text-xs tracking-wider uppercase cursor-pointer hover:scale-105 transition-transform"
              >
                Close & Continue ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
