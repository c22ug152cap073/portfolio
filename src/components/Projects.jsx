import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Terminal, Globe } from 'lucide-react';
import { soundManager } from '../utils/voiceEngine';

const PLANET_ORBITS = {
  chatverse: [
    { label: 'Python', angle: 0, r: 130, color: '#3776ab' },
    { label: 'Django', angle: 72, r: 145, color: '#44b78b' },
    { label: 'MySQL', angle: 144, r: 128, color: '#4479a1' },
    { label: 'NLTK', angle: 216, r: 140, color: '#f59e0b' },
    { label: 'SpaCy', angle: 288, r: 135, color: '#8b5cf6' },
  ],
  'college-brochure': [
    { label: 'React.js', angle: 0, r: 130, color: '#61dafb' },
    { label: 'Node.js', angle: 90, r: 140, color: '#339933' },
    { label: 'HTML', angle: 180, r: 125, color: '#e34f26' },
    { label: 'CSS', angle: 270, r: 138, color: '#1572b6' },
  ],
};

const Planet = ({ project, orbitItems, onOpenSandbox, onOpenBrochure, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [angles, setAngles] = useState(orbitItems.map(o => o.angle));
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const isChatverse = project.id === 'chatverse';

  useEffect(() => {
    const animate = (time) => {
      if (lastTimeRef.current) {
        const dt = (time - lastTimeRef.current) / 1000;
        setAngles(prev => prev.map((a, i) => (a + 20 * dt) % 360));
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleAction = () => {
    soundManager.playClick?.();
    if (isChatverse) onOpenSandbox?.();
    else onOpenBrochure?.();
  };

  return (
    <div
      className={`planet-system ${isExpanded ? 'expanded' : ''}`}
      style={{ '--planet-hue': isChatverse ? '260' : '200' }}
    >
      {/* Planet + orbiting icons */}
      <div className="planet-orbit-container" aria-hidden="true">
        {/* Orbit ring SVG */}
        <svg className="planet-ring-svg" viewBox="0 0 320 320">
          <circle cx="160" cy="160" r="130"
            fill="none" stroke="rgba(255,255,255,0.04)"
            strokeWidth="1" strokeDasharray="3 9" />
          {orbitItems.length > 4 && (
            <circle cx="160" cy="160" r="145"
              fill="none" stroke="rgba(255,255,255,0.02)"
              strokeWidth="1" />
          )}
        </svg>

        {/* Planet core */}
        <button
          className="planet-core"
          onClick={() => { setIsExpanded(!isExpanded); soundManager.playClick?.(); }}
          data-cursor="explore"
          aria-expanded={isExpanded}
          aria-label={`${project.title} — click to ${isExpanded ? 'collapse' : 'explore'}`}
        >
          <div className="planet-surface" />
          <div className="planet-atmosphere" aria-hidden="true" />
          <div className="planet-ring-equator" aria-hidden="true" />
          <span className="planet-name">{isChatverse ? 'ChatVerse' : 'College\nBrochure'}</span>
          <span className="planet-cta-hint">{isExpanded ? 'CLICK TO CLOSE' : 'CLICK TO EXPLORE'}</span>
        </button>

        {/* Orbiting tech icons */}
        {orbitItems.map((item, i) => {
          const rad = (angles[i] * Math.PI) / 180;
          const cx = 160 + item.r * Math.cos(rad);
          const cy = 160 + item.r * Math.sin(rad);
          return (
            <div
              key={item.label}
              className="planet-orbit-icon"
              style={{
                left: `${(cx / 320) * 100}%`,
                top: `${(cy / 320) * 100}%`,
                borderColor: item.color,
                color: item.color,
                background: `${item.color}15`,
              }}
              data-cursor="tech"
            >
              {item.label}
            </div>
          );
        })}
      </div>

      {/* Expanded project details */}
      <div className="planet-details" aria-live="polite">
        <div className="pd-type">{project.type}</div>
        <h3 className="pd-title">{project.title}</h3>
        <p className="pd-desc">{project.description}</p>

        <ul className="pd-highlights" aria-label="Project highlights">
          {project.highlights.map((h, i) => (
            <li key={i} className="pd-highlight-item">
              <span className="pd-bullet" aria-hidden="true">▹</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="pd-tech-row" role="list" aria-label="Technologies">
          {project.technologies.slice(0, 8).map((t, i) => (
            <span key={i} className="pd-tech-badge" role="listitem" data-cursor="tech">{t}</span>
          ))}
        </div>

        <div className="pd-actions">
          <button className="btn btn-primary btn-sm" onClick={handleAction}>
            {isChatverse ? <><Terminal size={14} /> NLP Sandbox</> : <><Globe size={14} /> Explore App</>}
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Discuss Tech
          </button>
        </div>
      </div>
    </div>
  );
};

export const Projects = ({ onOpenSandbox, onOpenBrochure }) => {
  const { projects } = portfolioData;
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="section projects-section" ref={sectionRef} aria-labelledby="projects-heading">
      <div className="section-eyebrow">04 — THINGS I'VE BUILT</div>

      <div className={`projects-header ${inView ? 'in-view' : ''}`}>
        <h2 id="projects-heading" className="section-big-title">
          Project <span className="accent-cyan">Universe</span>
        </h2>
        <p className="section-subtitle">
          Click any planet to explore the project within.
        </p>
      </div>

      {/* Universe canvas */}
      <div className="project-universe-canvas">
        {/* Starfield background */}
        <div className="universe-stars" aria-hidden="true">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                '--size': `${Math.random() * 2 + 1}px`,
                '--delay': `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Planets */}
        <div className="planets-row">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`planet-container ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.3}s` }}
            >
              <Planet
                project={project}
                orbitItems={PLANET_ORBITS[project.id] || []}
                onOpenSandbox={onOpenSandbox}
                onOpenBrochure={onOpenBrochure}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
