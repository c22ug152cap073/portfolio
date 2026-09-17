import React, { useState, useEffect } from 'react';
import { Sparkles, Mic, Volume2, VolumeX, Terminal as TerminalIcon, ArrowUp, Palette, HelpCircle } from 'lucide-react';
import { soundManager } from '../utils/voiceEngine';

export const FloatingControls = ({
  onOpenVoiceAssistant,
  onStartVoiceTour,
  currentTheme,
  onThemeChange,
  onOpenTerminal,
  isVoiceTourActive
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if inside input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'v' || e.key === 'V') {
        onOpenVoiceAssistant();
      } else if (e.key === 't' || e.key === 'T') {
        onOpenTerminal();
      } else if (e.key === '?') {
        setShowShortcuts((prev) => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpenVoiceAssistant, onOpenTerminal]);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playPop();
  };

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themes = [
    { id: 'cyber', name: 'Cyber Neon', color: '#38bdf8', icon: '🌌' },
    { id: 'emerald', name: 'Emerald Matrix', color: '#10b981', icon: '🌲' },
    { id: 'sunset', name: 'Cosmic Sunset', color: '#ec4899', icon: '🔮' },
    { id: 'titanium', name: 'Luxe Titanium', color: '#6366f1', icon: '☀️' }
  ];

  return (
    <>
      <aside className="floating-dock" aria-label="Quick Actions Dock">
        {/* Voice Tour Trigger Pill */}
        {!isVoiceTourActive && (
          <button
            type="button"
            className="floating-voice-tour-btn"
            onClick={() => {
              soundManager.playVoicePing();
              onStartVoiceTour();
            }}
            title="Start AI Voice Tour"
            aria-label="Start interactive AI voice tour"
          >
            <Sparkles size={16} />
            <span className="tour-text">AI Voice Tour</span>
            <span className="voice-badge-pulse"></span>
          </button>
        )}

        {/* AI Voice Assistant Orb */}
        <button
          type="button"
          className="dock-circle-btn voice-orb-btn"
          onClick={() => {
            soundManager.playClick();
            onOpenVoiceAssistant();
          }}
          title="Ask Summiaya AI Voice (Press V)"
          aria-label="Open AI Voice Assistant"
        >
          <Mic size={18} />
          <span className="dock-tooltip">Ask AI Voice (V)</span>
        </button>

        {/* Terminal Launcher */}
        <button
          type="button"
          className="dock-circle-btn"
          onClick={() => {
            soundManager.playClick();
            onOpenTerminal();
          }}
          title="Developer Shell (Press T)"
          aria-label="Open Developer Terminal"
        >
          <TerminalIcon size={17} />
          <span className="dock-tooltip">Terminal (T)</span>
        </button>

        {/* Theme Palette Trigger */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="dock-circle-btn"
            onClick={() => {
              soundManager.playClick();
              setShowThemePicker(!showThemePicker);
            }}
            title="Switch Theme"
            aria-label="Change color theme"
          >
            <Palette size={17} />
            <span className="dock-tooltip">Theme Palette</span>
          </button>

          {showThemePicker && (
            <div className="theme-picker-popover">
              <div className="theme-popover-header">Choose Aesthetics</div>
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`theme-option-btn ${currentTheme === t.id ? 'active' : ''}`}
                  onClick={() => {
                    soundManager.playPop();
                    onThemeChange(t.id);
                    setShowThemePicker(false);
                  }}
                >
                  <span className="theme-emoji">{t.icon}</span>
                  <span className="theme-name">{t.name}</span>
                  <span className="theme-dot" style={{ background: t.color }}></span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sound SFX Toggle */}
        <button
          type="button"
          className="dock-circle-btn"
          onClick={toggleSound}
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          <span className="dock-tooltip">{isMuted ? 'Unmute SFX' : 'Mute SFX'}</span>
        </button>

        {/* Shortcuts Help */}
        <button
          type="button"
          className="dock-circle-btn"
          onClick={() => setShowShortcuts(!showShortcuts)}
          title="Keyboard Shortcuts (?)"
          aria-label="Keyboard shortcuts guide"
        >
          <HelpCircle size={17} />
          <span className="dock-tooltip">Shortcuts (?)</span>
        </button>

        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            type="button"
            className="dock-circle-btn scroll-top-btn"
            onClick={scrollToTop}
            title="Back to Top"
            aria-label="Scroll back to top"
          >
            <ArrowUp size={17} />
            <span className="dock-tooltip">Top</span>
          </button>
        )}
      </aside>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="modal-backdrop" onClick={() => setShowShortcuts(false)} role="dialog" aria-modal="true">
          <div className="shortcuts-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>⌨️ Keyboard Shortcuts</h3>
              <button type="button" className="icon-btn" onClick={() => setShowShortcuts(false)}>✕</button>
            </div>
            <div className="shortcut-row">
              <span className="key-badge">V</span>
              <span>Open AI Voice Assistant / Speech Assistant</span>
            </div>
            <div className="shortcut-row">
              <span className="key-badge">T</span>
              <span>Open Developer Interactive Terminal (CLI)</span>
            </div>
            <div className="shortcut-row">
              <span className="key-badge">?</span>
              <span>Toggle Keyboard Shortcuts Guide</span>
            </div>
            <div className="shortcut-row">
              <span className="key-badge">Esc</span>
              <span>Close any open modal or drawer</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
