import React, { useState, useEffect, useRef } from 'react';

const bootLines = [
  { text: 'INITIALIZING DEVELOPER PORTFOLIO...', delay: 0, color: 'var(--cyan)' },
  { text: 'LOADING SKILLS...', delay: 600, color: 'var(--text-muted)' },
  { text: 'LOADING PROJECTS...', delay: 1100, color: 'var(--text-muted)' },
  { text: 'LOADING EXPERIENCE...', delay: 1600, color: 'var(--text-muted)' },
  { text: '', delay: 2100, color: '' },
  { text: '> WELCOME, SUMMIAYA.', delay: 2400, color: 'var(--cyan)' },
];

export const IntroLoader = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [phase, setPhase] = useState('booting'); // 'booting' | 'welcome' | 'fading'
  const [opacity, setOpacity] = useState(1);
  const [skipped, setSkipped] = useState(false);
  const timersRef = useRef([]);

  const handleSkip = () => {
    setSkipped(true);
    timersRef.current.forEach(clearTimeout);
    setPhase('fading');
    setOpacity(0);
    setTimeout(() => onComplete(), 500);
  };

  useEffect(() => {
    // Reveal lines sequentially
    bootLines.forEach((line, i) => {
      const t = setTimeout(() => {
        if (!skipped) {
          setVisibleLines(prev => [...prev, i]);
          if (i === bootLines.length - 1) {
            setPhase('welcome');
          }
        }
      }, line.delay);
      timersRef.current.push(t);
    });

    // Auto-complete
    const autoComplete = setTimeout(() => {
      if (!skipped) {
        setPhase('fading');
        setOpacity(0);
        setTimeout(() => onComplete(), 700);
      }
    }, 3800);
    timersRef.current.push(autoComplete);

    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="intro-loader"
      style={{ opacity, transition: 'opacity 0.7s ease' }}
      aria-live="polite"
      aria-label="Portfolio loading sequence"
    >
      {/* Animated grid background */}
      <div className="intro-grid" aria-hidden="true" />

      {/* Scanline effect */}
      <div className="intro-scanline" aria-hidden="true" />

      {/* Central logo */}
      <div className={`intro-logo ${phase === 'welcome' ? 'glow-pulse' : ''}`} aria-hidden="true">
        <span className="intro-logo-sl">SL</span>
      </div>

      {/* Boot terminal */}
      <div className="intro-terminal" role="status">
        {bootLines.map((line, i) => (
          <div
            key={i}
            className={`intro-line ${visibleLines.includes(i) ? 'visible' : ''}`}
            style={{ '--line-color': line.color || 'transparent' }}
          >
            {line.text && (
              <>
                {i > 0 && i < bootLines.length - 1 && (
                  <span className="intro-check" aria-hidden="true">✓ </span>
                )}
                <span>{line.text}</span>
                {i === bootLines.length - 1 && (
                  <span className="intro-cursor" aria-hidden="true">█</span>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="intro-progress-wrap" aria-hidden="true">
        <div
          className="intro-progress-bar"
          style={{
            '--progress-w': `${(visibleLines.length / bootLines.length) * 100}%`
          }}
        />
      </div>

      {/* Skip button */}
      <button
        className="intro-skip-btn"
        onClick={handleSkip}
        aria-label="Skip intro animation"
      >
        SKIP INTRO ›
      </button>
    </div>
  );
};
