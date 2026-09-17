import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, X, Sparkles, Navigation } from 'lucide-react';
import { voiceEngine, tourSteps, soundManager } from '../utils/voiceEngine';

export const VoiceTourBar = ({ isActive, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.0);

  const currentStep = tourSteps[currentStepIndex];

  useEffect(() => {
    const unsubscribe = voiceEngine.subscribe((state) => {
      setIsSpeaking(state.isSpeaking);
      setIsPaused(state.isPaused);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isActive) {
      soundManager.playVoicePing();
      startStep(0);
    } else {
      voiceEngine.stop();
    }
  }, [isActive]);

  const startStep = (index) => {
    if (index < 0 || index >= tourSteps.length) {
      onClose();
      return;
    }

    setCurrentStepIndex(index);
    const step = tourSteps[index];

    // Auto scroll to target section
    const el = document.getElementById(step.sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Speak step text
    voiceEngine.speak(step.text, {
      onEnd: () => {
        // Auto advance to next step after brief pause if still on same step
        if (index + 1 < tourSteps.length) {
          setTimeout(() => {
            if (isActive) {
              startStep(index + 1);
            }
          }, 1400);
        }
      }
    });
  };

  const handlePlayPause = () => {
    soundManager.playClick();
    if (isSpeaking && !isPaused) {
      voiceEngine.pause();
    } else if (isPaused) {
      voiceEngine.resume();
    } else {
      startStep(currentStepIndex);
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentStepIndex + 1 < tourSteps.length) {
      startStep(currentStepIndex + 1);
    } else {
      voiceEngine.stop();
      onClose();
    }
  };

  const handlePrev = () => {
    soundManager.playClick();
    if (currentStepIndex > 0) {
      startStep(currentStepIndex - 1);
    }
  };

  const cycleRate = () => {
    soundManager.playPop();
    const rates = [1.0, 1.25, 1.5];
    const nextRate = rates[(rates.indexOf(rate) + 1) % rates.length];
    setRate(nextRate);
    voiceEngine.setRate(nextRate);
    if (isSpeaking) {
      voiceEngine.speak(currentStep.text);
    }
  };

  const handleClose = () => {
    soundManager.playClick();
    voiceEngine.stop();
    onClose();
  };

  if (!isActive) return null;

  const progressPercent = ((currentStepIndex + 1) / tourSteps.length) * 100;

  return (
    <div className="voice-tour-bar-container" role="region" aria-label="AI Voice Tour Controls">
      <div className="voice-tour-bar">
        {/* Step Indicator & Progress */}
        <div className="tour-progress-track">
          <div className="tour-progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>

        <div className="tour-bar-main">
          {/* Avatar / Visualizer */}
          <div className="tour-avatar-group">
            <div className={`tour-avatar-pulse ${isSpeaking && !isPaused ? 'active' : ''}`}>
              <Sparkles size={16} />
            </div>
            <div className="tour-info">
              <div className="tour-badge-row">
                <span className="tour-step-badge">{currentStep.badge}</span>
                <span className="tour-step-title">{currentStep.title}</span>
              </div>
              <p className="tour-caption">{currentStep.text}</p>
            </div>
          </div>

          {/* Audio Wave Bars */}
          <div className={`audio-wave-bars ${isSpeaking && !isPaused ? 'animating' : ''}`} aria-hidden="true">
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </div>

          {/* Player Controls */}
          <div className="tour-controls">
            <button
              type="button"
              className="tour-btn rate-btn"
              onClick={cycleRate}
              title="Voice Speed"
              aria-label={`Voice speed ${rate}x`}
            >
              {rate}x
            </button>

            <button
              type="button"
              className="tour-btn"
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              title="Previous Section"
              aria-label="Previous step"
            >
              <SkipBack size={16} />
            </button>

            <button
              type="button"
              className="tour-btn play-btn"
              onClick={handlePlayPause}
              title={isSpeaking && !isPaused ? 'Pause Voice' : 'Play Voice'}
              aria-label={isSpeaking && !isPaused ? 'Pause Voice' : 'Play Voice'}
            >
              {isSpeaking && !isPaused ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
            </button>

            <button
              type="button"
              className="tour-btn"
              onClick={handleNext}
              title="Next Section"
              aria-label="Next step"
            >
              <SkipForward size={16} />
            </button>

            <button
              type="button"
              className="tour-btn close-btn"
              onClick={handleClose}
              title="End Voice Tour"
              aria-label="Close voice tour"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
