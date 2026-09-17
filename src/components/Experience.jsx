import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/portfolioData';

export const Experience = () => {
  const { experience } = portfolioData;
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);
  const [visibleResponsibilities, setVisibleResponsibilities] = useState([]);
  const [visibleTechs, setVisibleTechs] = useState([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);

          // Animate timeline line drawing
          let prog = 0;
          const lineAnim = setInterval(() => {
            prog += 2;
            setLineProgress(Math.min(prog, 100));
            if (prog >= 60) {
              setCardVisible(true);
            }
            if (prog >= 100) clearInterval(lineAnim);
          }, 18);

          // Stagger responsibilities
          experience[0].responsibilities.forEach((_, i) => {
            setTimeout(() => {
              setVisibleResponsibilities(prev => [...prev, i]);
            }, 900 + i * 180);
          });

          // Stagger techs
          experience[0].keyTechnologies.forEach((_, i) => {
            setTimeout(() => {
              setVisibleTechs(prev => [...prev, i]);
            }, 1400 + i * 100);
          });
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className="section experience-section" ref={sectionRef} aria-labelledby="exp-heading">
      <div className="section-eyebrow">03 — THE JOURNEY SO FAR</div>

      <div className={`exp-header ${inView ? 'in-view' : ''}`}>
        <h2 id="exp-heading" className="section-big-title">
          Professional <span className="accent-violet">Timeline</span>
        </h2>
      </div>

      <div className="timeline-layout">
        {/* Glowing vertical line */}
        <div className="timeline-axis" aria-hidden="true">
          <div
            ref={lineRef}
            className="timeline-line-fill"
            style={{ height: `${lineProgress}%` }}
          />
          {/* Top node — start */}
          <div className={`timeline-node top-node ${inView ? 'visible' : ''}`}>
            <div className="node-ring" aria-hidden="true" />
            <span className="node-date">MARCH 2026</span>
          </div>
          {/* Bottom node — present */}
          <div className={`timeline-node bottom-node ${lineProgress >= 95 ? 'visible' : ''}`}>
            <div className="node-ring blink" aria-hidden="true" />
            <span className="node-date accent-cyan">PRESENT</span>
          </div>
        </div>

        {/* Experience cards */}
        <div className="timeline-cards">
          {experience.map((item) => (
            <article
              key={item.id}
              className={`exp-card ${cardVisible ? 'visible' : ''}`}
              aria-label={`${item.role} at ${item.company}`}
            >
              <div className="exp-card-header">
                <div>
                  <div className="exp-role-tag">{item.type}</div>
                  <h3 className="exp-role">{item.role}</h3>
                  <div className="exp-company-row">
                    <span className="exp-company">{item.company}</span>
                    <span className="exp-sep" aria-hidden="true">·</span>
                    <span className="exp-location">{item.location}</span>
                  </div>
                  <div className="exp-period">{item.period}</div>
                </div>
                <div className="exp-status-badge" aria-label="Currently active">
                  <span className="pulse-dot" aria-hidden="true" />
                  Active
                </div>
              </div>

              {/* Responsibilities — stagger in */}
              <ul className="exp-responsibilities" aria-label="Responsibilities">
                {item.responsibilities.map((resp, i) => (
                  <li
                    key={i}
                    className={`exp-resp-item ${visibleResponsibilities.includes(i) ? 'visible' : ''}`}
                    style={{ transitionDelay: `${i * 0.05}s` }}
                  >
                    <span className="resp-bullet" aria-hidden="true">▹</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies — stagger in */}
              <div className="exp-tech-section">
                <div className="exp-tech-label">Technologies Used</div>
                <div className="exp-tech-badges" role="list" aria-label="Technologies">
                  {item.keyTechnologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`tech-badge ${visibleTechs.includes(i) ? 'visible' : ''}`}
                      style={{ transitionDelay: `${i * 0.05}s` }}
                      role="listitem"
                      data-cursor="tech"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
