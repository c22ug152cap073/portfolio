import React, { useState, useEffect, useRef } from 'react';
import { Terminal, FileText } from 'lucide-react';
import { GitHubIcon } from './Icons';
import { soundManager } from '../utils/voiceEngine';
import { portfolioData } from '../data/portfolioData';

const navLinks = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'certifications', label: 'CERTIFICATIONS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar = ({ onOpenResume, onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
    );
    sections.forEach(s => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) => {
    soundManager.playClick?.();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          className="nav-logo"
          onClick={() => scrollTo('home')}
          aria-label="Go to top"
        >
          <span className="logo-sl">SL</span>
          <span className="logo-divider" aria-hidden="true" />
          <span className="logo-subtitle">SUMMIAYA L</span>
        </button>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollTo(link.id)}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="nav-active-bar" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Utility buttons */}
        <div className="nav-actions">
          <a
            href={portfolioData.personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-action-btn"
            title="GitHub (c22ug152cap073)"
            aria-label="Visit GitHub profile c22ug152cap073"
          >
            <GitHubIcon size={16} />
          </a>
          <button
            className="nav-action-btn"
            onClick={onOpenTerminal}
            title="Open Terminal"
            aria-label="Open developer terminal"
          >
            <Terminal size={16} />
          </button>
          <button
            className="nav-resume-btn"
            onClick={onOpenResume}
            aria-label="View resume"
          >
            <FileText size={14} />
            <span>Resume</span>
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-inner">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => scrollTo(link.id)}
              style={{ '--i': i }}
            >
              <span className="mobile-link-num">0{i + 1}</span>
              {link.label}
            </button>
          ))}
          <div className="mobile-menu-actions">
            <button className="btn btn-primary" onClick={() => { onOpenResume(); setMenuOpen(false); }}>
              <FileText size={15} />
              View Resume
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
