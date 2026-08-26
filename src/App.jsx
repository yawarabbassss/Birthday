import React from 'react';
import { BirthdayProvider, useBirthday } from './context/BirthdayContext';
import { BackgroundEffects } from './components/BackgroundEffects';
import { NameEntryModal } from './components/NameEntryModal';
import { TeaserTransition } from './components/TeaserTransition';
import { HeroSection } from './components/HeroSection';
import { QuestionQuiz } from './components/QuestionQuiz';
import { MoodGenerator } from './components/MoodGenerator';
import { YouDeserveSection } from './components/YouDeserveSection';
import { SecretGiftSection } from './components/SecretGiftSection';
import { MemoryCardSection } from './components/MemoryCardSection';
import { WishGeneratorSection } from './components/WishGeneratorSection';
import { InteractiveCakeSection } from './components/InteractiveCakeSection';
import { CountdownSection } from './components/CountdownSection';
import { FinalSection } from './components/FinalSection';
import { FloatingMusicControls } from './components/FloatingMusicControls';
import { EasterEggsManager } from './components/EasterEggsManager';

const BirthdayAppContent = () => {
  const { step } = useBirthday();

  return (
    <div className="min-h-screen relative text-slate-100 selection:bg-purple-500 selection:text-white font-sans overflow-x-hidden">
      {/* Dynamic Particle Canvas & Gradient Background */}
      <BackgroundEffects />

      {/* Floating Audio & Mute Controls */}
      <FloatingMusicControls />

      {/* Hidden Easter Eggs & Achievement Toasts */}
      <EasterEggsManager />

      {/* Progressive Journey Flow */}
      {step === 0 && <NameEntryModal />}

      {step === 1 && <TeaserTransition />}

      {step === 2 && (
        <main className="relative z-10 space-y-12 md:space-y-24">
          <HeroSection />
          <QuestionQuiz />
          <MoodGenerator />
          <YouDeserveSection />
          <SecretGiftSection />
          <MemoryCardSection />
          <WishGeneratorSection />
          <InteractiveCakeSection />
          <CountdownSection />
          <FinalSection />
        </main>
      )}
    </div>
  );
};

export function App() {
  return (
    <BirthdayProvider>
      <BirthdayAppContent />
    </BirthdayProvider>
  );
}

export default App;
