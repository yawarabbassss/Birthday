/**
 * Master Birthday Personalization Config
 * 
 * Edit any value below to completely customize the birthday experience!
 */
export const birthdayConfig = {
  // 1. Person Information
  // Leave name empty ("") if you want the visitor to enter their own name, or set a name (e.g., "Sarah")
  name: "", 
  
  // ISO date format "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss" for live countdown.
  // Example: "2026-08-27T00:00:00" or leave empty "" to trigger immediate birthday mode.
  birthdayDate: "2026-08-27T00:00:00", 

  // 2. Audio Settings
  // Optional background music MP3 URL. If left empty or unreachable, a beautiful ambient synth pad will play smoothly!
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
  
  // 3. Intro Teaser Messages
  teaser: {
    greeting: "Hey, {NAME}... 👀",
    subtitle: "Looks like someone has a special birthday today."
  },

  // 4. Hero Section
  hero: {
    title: "Happy Birthday, {NAME} 🎂",
    subheading1: "Today isn't just another day…",
    subheading2: "It’s your day.",
    ctaButton: "There’s a little surprise waiting for you ↓"
  },

  // 5. Interactive Questions
  quiz: {
    title: "But first… let's see how well you know yourself 😌",
    questions: [
      {
        id: 1,
        question: "If you could teleport anywhere right now, where would you go?",
        options: [
          { text: "Beach 🌊", response: "Sun, sand, and zero worries! Excellent choice 🏖️" },
          { text: "Mountains 🏔️", response: "Fresh air, epic views, and total serenity 🌲" },
          { text: "Somewhere completely random ✈️", response: "Living life on the edge! Love the spontaneous energy 🚀" },
          { text: "Straight to bed 😴", response: "The most valid answer in human history 🛌✨" }
        ]
      },
      {
        id: 2,
        question: "Your perfect birthday vibe?",
        options: [
          { text: "Big party 🎉", response: "Confetti, music, and being the star of the night! 🪩" },
          { text: "Dinner with favorite people 🍽️", response: "Intimate vibes, amazing food, and endless laughs 🥂" },
          { text: "Peace & quiet 🌙", response: "Cozy blanket, favorite show, total relaxation ☕" },
          { text: "Adventure mode 🚀", response: "Unlocking new core memories today! 🗺️" }
        ]
      },
      {
        id: 3,
        question: "Pick your birthday superpower.",
        options: [
          { text: "Unlimited money 💸", response: "Shopping spree unlocked forever! 🛍️" },
          { text: "Unlimited travel ✈️", response: "Passport stamped every single weekend 🌎" },
          { text: "Read minds 🧠", response: "Ooh, dangerous power! Keep those secrets safe 🤫" },
          { text: "Pause time ⏳", response: "More hours to sleep and enjoy life 🛌" }
        ]
      }
    ],
    summaryMessage: "Okay {NAME}… we’ve learned enough about you 😂"
  },

  // 6. Birthday Energy / Mood Generator
  moods: [
    {
      title: "Main Character Energy ✨",
      badge: "Iconic",
      description: "The spotlight follows you everywhere today. Own your golden hour!",
      color: "from-amber-400 to-pink-500"
    },
    {
      title: "Chaos Coordinator 🔥",
      badge: "Wildcard",
      description: "Bringing unhinged joy and unpredictable fun wherever you step.",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Soft Life Specialist 🌸",
      badge: "Pure Bliss",
      description: "Zero stress, luxury vibes, and iced coffees on repeat all day long.",
      color: "from-pink-400 to-purple-400"
    },
    {
      title: "Adventure Seeker 🚀",
      badge: "Explorer",
      description: "Ready to cross off bucket list items and make unforgettable stories.",
      color: "from-blue-400 to-indigo-600"
    },
    {
      title: "Professional Overthinker 😂",
      badge: "Relatable",
      description: "Wondering if 100 wishes are enough. (Spoiler: You deserve 10,000).",
      color: "from-purple-400 to-pink-600"
    },
    {
      title: "CEO of Having a Good Time 👑",
      badge: "Royalty",
      description: "Official executive decision: No bad moods permitted in your presence today.",
      color: "from-amber-300 to-yellow-500"
    }
  ],

  // 7. "You Deserve..." Section
  youDeserve: [
    { icon: "✨", text: "More reasons to smile every morning" },
    { icon: "🌍", text: "More breathtaking places to explore" },
    { icon: "❤️", text: "More genuine people who uplift your soul" },
    { icon: "🚀", text: "More exciting opportunities that align with your dreams" },
    { icon: "🌱", text: "More personal growth and self-love" },
    { icon: "🌙", text: "More peaceful, restful nights" },
    { icon: "🎯", text: "More goals achieved effortlessly" },
    { icon: "😂", text: "More belly-laughing, unforgettable moments" }
  ],

  // 8. Secret Surprise / Locked Box Section
  secretGift: {
    heading: "Okay… there’s still one more thing.",
    buttonText: "Unlock My Surprise 🔒🎁",
    unlockedTitle: "You unlocked the secret! ✨",
    unlockedMessage: "You made it this far… so you deserve a little extra happiness today.",
    finalHighlight: "Happy Birthday, {NAME}. ❤️"
  },

  // 9. Personal Memory / Reminder Letter
  memoryCard: {
    heading: "A little reminder for you… 📜",
    content: [
      "Life gets busy. Things change. People grow.",
      "But I hope this year brings you moments that make you stop for a second and think…",
      "‘Yeah. Life is actually pretty beautiful.’",
      "Keep being your authentic, wonderful self.",
      "And don't forget to enjoy the little things along the way."
    ],
    signature: "Always cheering for you ✨"
  },

  // 10. Birthday Wish Generator
  wishes: [
    "May this year surprise you in the best possible ways.",
    "May you find more reasons to laugh than reasons to worry.",
    "May your biggest plans become your favorite memories.",
    "May this year be ridiculously good to you.",
    "May every door you open lead to peace, joy, and abundance.",
    "May you always feel surrounded by warmth, comfort, and love.",
    "May your coffee be strong and your birthday cake be extra sweet!",
    "May you shine even brighter this year than ever before."
  ],

  // 11. Interactive Cake Section
  cake: {
    heading: "Make a wish… then blow out the candles 🎂",
    instruction: "Click on each candle flame or use the blow button to extinguish them!",
    blowButtonText: "Blow Out Candles 💨",
    candlesCount: 3,
    extinguishedMessage: "Wish locked in. 🤫✨"
  },

  // 12. Final Celebration Section
  final: {
    heading: "Happy Birthday, {NAME} ❤️",
    subheading: "Here's to another year of becoming everything you're meant to be.",
    replayButton: "Replay the Surprise 🔄",
    shareButton: "Share the Joy 🎁",
    footerText: "Made with ❤️ just for {NAME}"
  },

  // 13. Easter Eggs
  easterEggs: {
    starClickMessage: "⭐ You found a secret star! May all your wishes come true ✨",
    cakeClickMessage: "🎂 Double cake boost activated! Infinite sweet vibes for you!",
    konamiMessage: "🎉 SECRET CHEAT CODE UNLOCKED! Mega Confetti Explosion activated!"
  }
};
