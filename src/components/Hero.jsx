import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, FileText, Terminal } from 'lucide-react';
import { GitHubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { soundManager } from '../utils/voiceEngine';

const CODE_LINES = [
  { indent: 0, tokens: [{ t: 'kw', v: 'const' }, { t: 'sp', v: ' developer = {' }] },
  { indent: 1, tokens: [{ t: 'key', v: '  name:' }, { t: 'str', v: ' "Summiaya",' }] },
  { indent: 1, tokens: [{ t: 'key', v: '  role:' }, { t: 'str', v: ' "Full Stack Developer",' }] },
  { indent: 1, tokens: [{ t: 'key', v: '  stack:' }, { t: 'sp', v: ' [' }] },
  { indent: 2, tokens: [{ t: 'str', v: '    "React.js",' }] },
  { indent: 2, tokens: [{ t: 'str', v: '    "Python",' }] },
  { indent: 2, tokens: [{ t: 'str', v: '    "Django",' }] },
  { indent: 2, tokens: [{ t: 'str', v: '    "MySQL"' }] },
  { indent: 1, tokens: [{ t: 'sp', v: '  ],' }] },
  { indent: 1, tokens: [{ t: 'key', v: '  passion:' }, { t: 'str', v: ' "Build. Learn. Grow."' }] },
  { indent: 0, tokens: [{ t: 'sp', v: '};' }] },
];

const ORBIT_ITEMS = [
  { label: 'React', color: '#61dafb', angle: 0, r: 140, size: 38, speed: 18 },
  { label: 'Python', color: '#3776ab', angle: 60, r: 160, size: 34, speed: 22 },
  { label: 'Django', color: '#092e20', border: '#44b78b', angle: 120, r: 145, size: 32, speed: 20 },
  { label: 'MySQL', color: '#4479a1', angle: 180, r: 155, size: 30, speed: 25 },
  { label: 'JS', color: '#f7df1e', angle: 240, r: 148, size: 32, speed: 19 },
  { label: 'Git', color: '#f05032', angle: 300, r: 162, size: 28, speed: 23 },
  { label: 'API', color: '#8b5cf6', angle: 330, r: 135, size: 30, speed: 21 },
];

export const Hero = ({ onOpenResume, onOpenSandbox }) => {
  const { personal } = portfolioData;
  const [visibleLines, setVisibleLines] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [orbAngles, setOrbAngles] = useState(ORBIT_ITEMS.map(o => o.angle));
  const rafRef = useRef(null);
  const lastTime = useRef(null);

  // Type code lines one by one
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= CODE_LINES.length) clearInterval(interval);
    }, 280);
    return () => clearInterval(interval);
  }, []);

  // Animate orbiting icons
  useEffect(() => {
    const animate = (time) => {
      if (lastTime.current) {
        const dt = (time - lastTime.current) / 1000;
        setOrbAngles(prev => prev.map((a, i) => (a + (360 / ORBIT_ITEMS[i].speed) * dt) % 360));
      }
      lastTime.current = time;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handle = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section" ref={heroRef} aria-label="Hero section">
      {/* Animated background grid */}
      <div
        className="hero-bg-grid"
        aria-hidden="true"
        style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
        }}
      />

      {/* Glowing orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true"
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }} />
      <div className="hero-orb hero-orb-2" aria-hidden="true"
        style={{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -15}px)` }} />

      <div className="hero-inner">
        {/* LEFT: Title + CTAs */}
        <div className="hero-left">
          <div className="hero-status-badge" aria-label="Status">
            <span className="status-pulse" aria-hidden="true" />
            <span>Available for Roles &amp; Internships</span>
          </div>

          <h1 className="hero-heading">
            <span className="hero-line hero-line-1" aria-hidden="true">HELLO,</span>
            <span className="hero-line hero-line-2">I'M <span className="hero-name-accent">SUMMIAYA.</span></span>
            <span className="hero-line hero-line-3">FULL STACK</span>
            <span className="hero-line hero-line-4">DEVELOPER.</span>
          </h1>

          <p className="hero-tagline">
            Building modern web applications,<br />APIs and intelligent solutions.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn btn-primary"
              onClick={() => { soundManager.playClick?.(); scrollTo('projects'); }}
              aria-label="Explore projects"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => { soundManager.playClick?.(); onOpenSandbox?.(); }}
              aria-label="Open NLP sandbox"
            >
              <Terminal size={15} aria-hidden="true" />
              <span>NLP Sandbox</span>
            </button>
            <button
              className="btn btn-outline"
              onClick={() => { soundManager.playClick?.(); onOpenResume?.(); }}
              aria-label="View resume"
            >
              <FileText size={15} aria-hidden="true" />
              <span>Resume</span>
            </button>
            <a
              href={portfolioData.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost hero-github-cta"
              aria-label="GitHub profile"
            >
              <GitHubIcon size={15} aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>

          <div className="hero-quick-stack">
            {['React.js', 'Python', 'Django', 'MySQL', 'REST APIs', 'NLP'].map(t => (
              <span key={t} className="stack-pill" data-cursor="tech">{t}</span>
            ))}
          </div>
        </div>

        {/* RIGHT: Developer Workspace */}
        <div className="hero-right" aria-label="Developer workspace visualization">
          {/* Orbit ring */}
          <div className="orbit-container" aria-hidden="true">
            <svg className="orbit-ring-svg" viewBox="0 0 360 360">
              <circle cx="180" cy="180" r="140" fill="none" stroke="rgba(0,212,255,0.08)" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="180" cy="180" r="160" fill="none" stroke="rgba(139,92,246,0.05)" strokeWidth="1" />
            </svg>

            {/* Orbiting tech icons */}
            {ORBIT_ITEMS.map((item, i) => {
              const angleRad = (orbAngles[i] * Math.PI) / 180;
              const cx = 180 + item.r * Math.cos(angleRad);
              const cy = 180 + item.r * Math.sin(angleRad);
              return (
                <div
                  key={item.label}
                  className="orbit-icon"
                  style={{
                    left: `${(cx / 360) * 100}%`,
                    top: `${(cy / 360) * 100}%`,
                    width: item.size,
                    height: item.size,
                    background: `${item.color}22`,
                    borderColor: item.border || item.color,
                    color: item.border || item.color,
                    fontSize: item.size < 32 ? '0.65rem' : '0.7rem',
                  }}
                  data-cursor="tech"
                >
                  {item.label}
                </div>
              );
            })}

            {/* Central code window */}
            <div className="hero-code-window">
              <div className="cw-header">
                <span className="cw-dot red" aria-hidden="true" />
                <span className="cw-dot yellow" aria-hidden="true" />
                <span className="cw-dot green" aria-hidden="true" />
                <span className="cw-filename">developer.js</span>
              </div>
              <div className="cw-body" role="code" aria-label="Code snippet">
                {CODE_LINES.slice(0, visibleLines).map((line, li) => (
                  <div key={li} className="cw-line">
                    <span className="cw-ln">{li + 1}</span>
                    <span className="cw-code">
                      {line.tokens.map((tok, ti) => (
                        <span key={ti} className={`tok-${tok.t}`}>{tok.v}</span>
                      ))}
                      {li === visibleLines - 1 && <span className="cw-cursor" aria-hidden="true">▌</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="scroll-line" />
        <span>SCROLL</span>
      </div>
    </section>
  );
};
