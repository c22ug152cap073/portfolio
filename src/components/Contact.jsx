import React, { useRef, useEffect, useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from './Icons';

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'EMAIL',
    key: 'email',
    href: (v) => `mailto:${v}`,
  },
  {
    icon: Phone,
    label: 'PHONE',
    key: 'phone',
    href: (v) => `tel:${v}`,
  },
  {
    icon: MapPin,
    label: 'LOCATION',
    key: 'location',
    href: null,
  },
  {
    icon: LinkedInIcon,
    label: 'LINKEDIN',
    key: 'linkedin',
    href: (v, data) => data.linkedinUrl,
  },
  {
    icon: GitHubIcon,
    label: 'GITHUB',
    key: 'github',
    href: (v, data) => data.githubUrl,
  },
];

export const Contact = () => {
  const { contact, personal } = portfolioData;
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="section contact-section" ref={sectionRef} aria-labelledby="contact-heading">
      {/* Background decoration */}
      <div className="contact-bg-glow" aria-hidden="true" />

      <div className="section-eyebrow">08 — FINAL DESTINATION</div>

      <div className={`contact-hero ${inView ? 'in-view' : ''}`}>
        <h2 id="contact-heading" className="contact-big-title">
          LET'S BUILD<br />
          <span className="contact-accent">SOMETHING.</span>
        </h2>
        <p className="contact-subtitle">
          Have an opportunity, project,<br />or idea? Let's connect.
        </p>
      </div>

      {/* Contact cards */}
      <div className="contact-grid">
        {CONTACT_ITEMS.map(({ icon: Icon, label, key, href }, i) => {
          const value = contact.info[key];
          const link = href ? href(value, contact.info) : null;

          return (
            <div
              key={key}
              className={`contact-card ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="cc-icon">
                <Icon size={22} aria-hidden="true" />
              </div>
              <div className="cc-label">{label}</div>
              {link ? (
                <a href={link} className="cc-value" target={(key === 'linkedin' || key === 'github') ? '_blank' : undefined}
                  rel={(key === 'linkedin' || key === 'github') ? 'noopener noreferrer' : undefined}>
                  {value}
                </a>
              ) : (
                <span className="cc-value">{value}</span>
              )}
              <div className="cc-glow" aria-hidden="true" />
            </div>
          );
        })}
      </div>

      {/* Main CTA */}
      <div className={`contact-cta-wrap ${inView ? 'visible' : ''}`}>
        <a
          href={`mailto:${personal.email}`}
          className="contact-cta-btn"
          aria-label="Send email to Summiaya"
        >
          <span>LET'S CONNECT</span>
          <ArrowRight size={22} aria-hidden="true" />
          <span className="cta-btn-glow" aria-hidden="true" />
        </a>
        <a
          href={personal.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-linkedin-btn"
          aria-label="Visit LinkedIn profile"
        >
          <LinkedInIcon size={18} aria-hidden="true" />
          <span>LinkedIn Profile</span>
        </a>
        <a
          href={personal.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-github-btn"
          aria-label="Visit GitHub profile"
        >
          <GitHubIcon size={18} aria-hidden="true" />
          <span>GitHub: c22ug152cap073</span>
        </a>
      </div>
    </section>
  );
};
