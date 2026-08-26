import React, { createContext, useContext, useState, useEffect } from 'react';
import { birthdayConfig } from '../config/birthdayConfig';
import { setMuted as setAudioMuted } from '../utils/soundEffects';

const BirthdayContext = createContext();

export const BirthdayProvider = ({ children }) => {
  // 1. Initialize name state from localStorage or birthdayConfig
  const [name, setNameState] = useState(() => {
    const savedName = localStorage.getItem('birthday_person_name');
    if (savedName) return savedName;
    return birthdayConfig.name || '';
  });

  // 2. Journey step state:
  // step 0: Name entry (if no name)
  // step 1: Teaser intro ("Hey [Name]...")
  // step 2: Full experience unlocked
  const [step, setStep] = useState(() => {
    // If name is already present (e.g. pre-configured or in localStorage), start at teaser or main experience
    const savedName = localStorage.getItem('birthday_person_name');
    if (savedName || birthdayConfig.name) {
      return 1; // start at teaser transition
    }
    return 0; // show name entry modal
  });

  // Audio preference states
  const [soundMuted, setSoundMuted] = useState(() => {
    return localStorage.getItem('birthday_sound_muted') === 'true';
  });

  const [musicPlaying, setMusicPlaying] = useState(() => {
    return localStorage.getItem('birthday_music_playing') === 'true';
  });

  // Interactive Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});

  // Birthday Energy / Mood state
  const [userMood, setUserMood] = useState(null);

  // Secret Gift state
  const [unlockedGift, setUnlockedGift] = useState(false);

  // Candles state (3 candles)
  const [candlesExtinguished, setCandlesExtinguished] = useState([false, false, false]);
  const [allCandlesBlown, setAllCandlesBlown] = useState(false);

  // Easter Egg Notification Toast state
  const [easterEggToast, setEasterEggToast] = useState(null);

  // Sync mute with soundEffects module
  useEffect(() => {
    setAudioMuted(soundMuted);
    localStorage.setItem('birthday_sound_muted', soundMuted);
  }, [soundMuted]);

  useEffect(() => {
    localStorage.setItem('birthday_music_playing', musicPlaying);
  }, [musicPlaying]);

  const updateName = (newName) => {
    const trimmed = newName.trim() || 'Bestie';
    setNameState(trimmed);
    localStorage.setItem('birthday_person_name', trimmed);
  };

  const toggleSound = () => {
    setSoundMuted((prev) => !prev);
  };

  const toggleMusic = () => {
    setMusicPlaying((prev) => !prev);
  };

  const showToast = (message) => {
    setEasterEggToast(message);
    setTimeout(() => {
      setEasterEggToast(null);
    }, 4500);
  };

  const resetExperience = () => {
    setStep(1); // Return to teaser transition
    setUnlockedGift(false);
    setCandlesExtinguished([false, false, false]);
    setAllCandlesBlown(false);
    setQuizAnswers({});
    setUserMood(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to replace {NAME} placeholders in strings
  const formatText = (text) => {
    if (!text) return '';
    const displayName = name || 'Bestie';
    return text.replace(/\{NAME\}/g, displayName);
  };

  return (
    <BirthdayContext.Provider
      value={{
        name: name || 'Bestie',
        updateName,
        step,
        setStep,
        soundMuted,
        toggleSound,
        musicPlaying,
        setMusicPlaying,
        toggleMusic,
        quizAnswers,
        setQuizAnswers,
        userMood,
        setUserMood,
        unlockedGift,
        setUnlockedGift,
        candlesExtinguished,
        setCandlesExtinguished,
        allCandlesBlown,
        setAllCandlesBlown,
        easterEggToast,
        showToast,
        resetExperience,
        formatText,
        config: birthdayConfig
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export const useBirthday = () => useContext(BirthdayContext);
