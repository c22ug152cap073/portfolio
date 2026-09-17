import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/portfolioData';

const FLOATING_LABELS = [
  { text: 'FULL STACK', x: 8, y: 20, speed: 0.012 },
  { text: 'API DEVELOPMENT', x: 72, y: 10, speed: -0.009 },
  { text: 'DATABASES', x: 85, y: 55, speed: 0.015 },
  { text: 'AI / NLP', x: 5, y: 70, speed: -0.011 },
  { text: 'RESPONSIVE DESIGN', x: 60, y: 88, speed: 0.008 },
  { text: 'REACT.JS', x: 40, y: 5, speed: -0.013 },
];

export const About = () => {
  const { about, personal } = portfolioData;
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handle = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section id="about" className="section about-section" ref={sectionRef} aria-labelledby="about-heading">
      {/* Section label */}
      <div className="section-eyebrow">01 — WHO IS SUMMIAYA?</div>

      {/* Large statement */}
      <div className={`about-statement ${inView ? 'in-view' : ''}`}>
        <h2 id="about-heading" className="about-big-text">
          I don't just<br />
          <span className="about-accent">write code.</span><br />
          I build <span className="about-accent-violet">experiences.</span>
        </h2>
      </div>

      {/* Floating labels — move with mouse */}
      <div className="about-labels-layer" aria-hidden="true">
        {FLOATING_LABELS.map((lbl, i) => (
          <div
            key={i}
            className={`about-float-label ${inView ? 'visible' : ''}`}
            style={{
              left: `${lbl.x}%`,
              top: `${lbl.y}%`,
              transform: `translate(${mousePos.x * lbl.speed * 100}px, ${mousePos.y * lbl.speed * 100}px)`,
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            {lbl.text}
          </div>
        ))}
      </div>

      {/* Body content */}
      <div className="about-content-grid">
        {/* Summary text */}
        <div className={`about-text-block ${inView ? 'in-view' : ''}`}>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="about-paragraph" style={{ transitionDelay: `${i * 0.15}s` }}>
              {p}
            </p>
          ))}

          <div className="about-meta">
            <div className="meta-chip">
              <span className="meta-dot" aria-hidden="true" />
              {personal.location}
            </div>
            <div className="meta-chip">
              <span className="meta-dot" aria-hidden="true" />
              MCA Student
            </div>
            <div className="meta-chip">
              <span className="meta-dot" aria-hidden="true" />
              {personal.email}
            </div>
          </div>
        </div>

        {/* Highlight cards */}
        <div className="about-highlight-grid">
          {about.highlights.map((card, i) => (
            <div
              key={card.id}
              className={`about-highlight-card ${inView ? 'in-view' : ''}`}
              style={{ transitionDelay: `${0.3 + i * 0.12}s` }}
            >
              <div className="ahc-glow" aria-hidden="true" />
              <h3 className="ahc-title">{card.title}</h3>
              <p className="ahc-desc">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
