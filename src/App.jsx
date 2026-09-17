import React, { useState, useEffect } from 'react';
import { IntroLoader } from './components/IntroLoader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { CodeTerminal } from './components/CodeTerminal';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';
import { FloatingControls } from './components/FloatingControls';
import { ResumeModal } from './components/ResumeModal';
import { VoiceTourBar } from './components/VoiceTourBar';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { ChatVerseSandbox } from './components/ChatVerseSandbox';
import { BrochurePreviewModal } from './components/BrochurePreviewModal';
import { TerminalModal } from './components/TerminalModal';

export function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isVoiceTourActive, setIsVoiceTourActive] = useState(false);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('summiaya_theme') || 'cyber';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('summiaya_theme', currentTheme);
  }, [currentTheme]);

  const handleModalAction = (type) => {
    if (type === 'start_tour') setIsVoiceTourActive(true);
    else if (type === 'open_sandbox') setIsSandboxOpen(true);
    else if (type === 'open_brochure') setIsBrochureOpen(true);
    else if (type === 'open_resume') setIsResumeOpen(true);
  };

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Cinematic intro */}
      {!introComplete && (
        <IntroLoader onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main site */}
      <div className={`site-container theme-${currentTheme} ${introComplete ? 'site-ready' : 'site-hidden'}`}>
        {/* Particle canvas */}
        <ParticleBackground />

        {/* Navigation */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Main content — storytelling order */}
        <main id="main-content">
          <Hero
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenSandbox={() => setIsSandboxOpen(true)}
            onStartVoiceTour={() => setIsVoiceTourActive(true)}
          />
          <About />
          <Skills />
          <Experience />
          <Projects
            onOpenSandbox={() => setIsSandboxOpen(true)}
            onOpenBrochure={() => setIsBrochureOpen(true)}
          />
          <Certifications />
          <Education />
          <CodeTerminal />
          <Contact />
        </main>

        <Footer />

        {/* Floating utility dock */}
        <FloatingControls
          onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
          onStartVoiceTour={() => setIsVoiceTourActive(true)}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          isVoiceTourActive={isVoiceTourActive}
        />

        {/* Voice tour bar */}
        <VoiceTourBar
          isActive={isVoiceTourActive}
          onClose={() => setIsVoiceTourActive(false)}
        />

        {/* Modals */}
        <VoiceAssistantModal
          isOpen={isVoiceAssistantOpen}
          onClose={() => setIsVoiceAssistantOpen(false)}
          onAction={handleModalAction}
        />
        <ChatVerseSandbox
          isOpen={isSandboxOpen}
          onClose={() => setIsSandboxOpen(false)}
        />
        <BrochurePreviewModal
          isOpen={isBrochureOpen}
          onClose={() => setIsBrochureOpen(false)}
        />
        <TerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onAction={handleModalAction}
          onThemeChange={setCurrentTheme}
        />
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </>
  );
}

export default App;
