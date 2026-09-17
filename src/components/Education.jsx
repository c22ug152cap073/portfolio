import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/portfolioData';

const STARS_BG = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

export const Education = () => {
  const { education } = portfolioData;
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Node positions for constellation
  const nodePositions = [
    { x: 28, y: 35 },
    { x: 70, y: 60 },
  ];

  // Extra decorative constellation nodes
  const decoNodes = [
    { x: 15, y: 20, size: 4 },
    { x: 45, y: 15, size: 3 },
    { x: 80, y: 25, size: 5 },
    { x: 55, y: 75, size: 3 },
    { x: 12, y: 72, size: 4 },
    { x: 88, y: 80, size: 3 },
    { x: 35, y: 85, size: 2 },
    { x: 92, y: 45, size: 3 },
  ];

  return (
    <section id="education" className="section education-section" ref={sectionRef} aria-labelledby="edu-heading">
      <div className="section-eyebrow">06 — EDUCATION CONSTELLATION</div>

      <div className={`edu-header ${inView ? 'in-view' : ''}`}>
        <h2 id="edu-heading" className="section-big-title">
          Academic <span className="accent-cyan">Journey</span>
        </h2>
      </div>

      <div className="constellation-canvas" role="list" aria-label="Education constellation">
        {/* Background stars */}
        <div className="constellation-starfield" aria-hidden="true">
          {STARS_BG.map(star => (
            <div
              key={star.id}
              className="bg-star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Connection SVG line */}
        <svg
          className="constellation-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {inView && (
            <line
              x1={nodePositions[0].x}
              y1={nodePositions[0].y}
              x2={nodePositions[1].x}
              y2={nodePositions[1].y}
              stroke="url(#constellationGrad)"
              strokeWidth="0.3"
              strokeDasharray="1 2"
              className="constellation-line"
            />
          )}
          {/* Decorative lines */}
          {decoNodes.map((node, i) => {
            const target = i % 2 === 0 ? nodePositions[0] : nodePositions[1];
            return (
              <line
                key={i}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.2"
              />
            );
          })}
          <defs>
            <linearGradient id="constellationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Decorative mini nodes */}
        {decoNodes.map((node, i) => (
          <div
            key={i}
            className="deco-star-node"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
              animationDelay: `${i * 0.5}s`,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Main education nodes */}
        {education.map((edu, i) => (
          <div
            key={edu.id}
            className={`edu-node-wrap ${inView ? 'visible' : ''} ${hoveredNode === edu.id ? 'hovered' : ''}`}
            style={{
              left: `${nodePositions[i].x}%`,
              top: `${nodePositions[i].y}%`,
              transitionDelay: `${0.4 + i * 0.3}s`,
            }}
            onMouseEnter={() => setHoveredNode(edu.id)}
            onMouseLeave={() => setHoveredNode(null)}
            role="listitem"
            data-cursor="journey"
            aria-label={`${edu.degree} at ${edu.institution}`}
          >
            {/* Glow rings */}
            <div className="edu-node-glow" aria-hidden="true">
              <div className="edu-ring edu-ring-1" />
              <div className="edu-ring edu-ring-2" />
            </div>

            {/* Node dot */}
            <div className="edu-node-dot" aria-hidden="true" />

            {/* Info card */}
            <div className="edu-node-card">
              <div className="enc-status">{edu.status}</div>
              <h3 className="enc-degree">{edu.degree}</h3>
              <div className="enc-institution">{edu.institution}</div>
              <div className="enc-location">{edu.location}</div>
              <div className="enc-period">{edu.period}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
