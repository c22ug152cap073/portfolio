import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { X, Cpu, ShieldCheck, Code2, Award } from 'lucide-react';

const CERT_COLORS = ['#00d4ff', '#8b5cf6', '#34d399'];
const CERT_ICONS = { Cpu, ShieldCheck, Code2, Award };

const CertModal = ({ cert, color, onClose }) => {
  const Icon = CERT_ICONS[cert.icon] || Award;
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  return (
    <div className="cert-modal-overlay" role="dialog" aria-modal="true" aria-label={cert.title} onClick={onClose}>
      <div className="cert-modal-card" onClick={e => e.stopPropagation()}>
        <button className="cert-modal-close" onClick={onClose} aria-label="Close certificate">
          <X size={18} />
        </button>
        <div className="cert-modal-top" style={{ '--cert-color': color }}>
          <div className="cert-modal-icon-wrap" style={{ borderColor: color, color }}>
            <Icon size={36} aria-hidden="true" />
          </div>
          <div className="cert-modal-shine" aria-hidden="true" />
        </div>
        <div className="cert-modal-body">
          <div className="cert-modal-issuer">{cert.issuer}</div>
          <h3 className="cert-modal-title">{cert.title}</h3>
          <div className="cert-modal-badge" style={{ borderColor: color, color }}>
            CERTIFICATE OF COMPLETION
          </div>
          <p className="cert-modal-desc">
            This certificate acknowledges the successful completion of the <strong>{cert.title}</strong> program offered by <strong>{cert.issuer}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Certifications = () => {
  const { certifications } = portfolioData;
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Rotate orbit
  useEffect(() => {
    const animate = (time) => {
      if (!isPaused) {
        if (lastTimeRef.current) {
          const dt = (time - lastTimeRef.current) / 1000;
          setRotation(prev => (prev + 18 * dt) % 360);
        }
        lastTimeRef.current = time;
      } else {
        lastTimeRef.current = null;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused]);

  const total = certifications.length;

  return (
    <section id="certifications" className="section certs-section" ref={sectionRef} aria-labelledby="certs-heading">
      <div className="section-eyebrow">05 — LEARNING NEVER STOPS</div>

      <div className={`certs-header ${inView ? 'in-view' : ''}`}>
        <h2 id="certs-heading" className="section-big-title">
          Certification <span className="accent-violet">Orbit</span>
        </h2>
        <p className="section-subtitle">Hover to pause. Click any certificate to open it.</p>
      </div>

      <div className={`cert-orbit-scene ${inView ? 'visible' : ''}`} aria-label="Orbiting certifications">
        {/* Central glowing core */}
        <div className="cert-core" aria-hidden="true">
          <div className="cert-core-inner" />
          <div className="cert-core-ring ring-1" />
          <div className="cert-core-ring ring-2" />
          <div className="cert-core-ring ring-3" />
          <span className="cert-core-label">CERTIFIED</span>
        </div>

        {/* Orbit path rings */}
        <div className="cert-orbit-rings" aria-hidden="true">
          <div className="cert-orbit-ring" />
        </div>

        {/* Orbiting certificates */}
        {certifications.map((cert, i) => {
          const baseAngle = (360 / total) * i;
          const totalAngle = (baseAngle + rotation) % 360;
          const rad = (totalAngle * Math.PI) / 180;
          const orbitR = 200;
          const x = Math.cos(rad) * orbitR;
          const z = Math.sin(rad) * orbitR;
          const scale = (z + orbitR) / (2 * orbitR);
          const adjustedScale = 0.7 + scale * 0.5;
          const opacity = 0.5 + scale * 0.5;
          const Icon = CERT_ICONS[cert.icon] || Award;
          const color = CERT_COLORS[i % CERT_COLORS.length];
          const isHovered = hoveredIndex === i;
          const isFront = scale > 0.75;

          return (
            <div
              key={cert.id}
              className={`cert-orbit-item ${isHovered ? 'hovered' : ''} ${isFront ? 'front' : ''}`}
              style={{
                '--x': `${x}px`,
                '--scale': adjustedScale,
                '--opacity': opacity,
                '--cert-color': color,
                zIndex: Math.round(scale * 10),
                transform: `translateX(${x}px) scale(${isHovered ? adjustedScale * 1.15 : adjustedScale})`,
                opacity: isHovered ? 1 : opacity,
              }}
              onMouseEnter={() => { setIsPaused(true); setHoveredIndex(i); }}
              onMouseLeave={() => { setIsPaused(false); setHoveredIndex(null); }}
              onClick={() => setSelectedCert({ cert, color })}
              data-cursor="view"
              role="button"
              tabIndex={0}
              aria-label={`${cert.title} — click to view`}
              onKeyDown={e => { if (e.key === 'Enter') setSelectedCert({ cert, color }); }}
            >
              <div className="cert-card-face">
                <div className="cert-shine" aria-hidden="true" />
                <div className="cert-icon-area" style={{ color }}>
                  <Icon size={28} aria-hidden="true" />
                </div>
                <div className="cert-card-issuer">{cert.issuer}</div>
                <div className="cert-card-title">{cert.title}</div>
                <div className="cert-card-tag" style={{ borderColor: color, color }}>VIEW</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected cert modal */}
      {selectedCert && (
        <CertModal
          cert={selectedCert.cert}
          color={selectedCert.color}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
};
