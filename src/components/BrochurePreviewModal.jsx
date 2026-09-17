import React, { useState } from 'react';
import { Layout, Globe, Server, CheckCircle2, X, ExternalLink, BookOpen, Building, Award, Activity } from 'lucide-react';
import { soundManager } from '../utils/voiceEngine';

export const BrochurePreviewModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('courses');

  if (!isOpen) return null;

  const departments = [
    {
      code: 'MCA',
      name: 'Master of Computer Applications',
      duration: '2 Years',
      seats: '60 Seats',
      desc: 'Advanced software engineering, full stack web development, cloud computing, and database management.'
    },
    {
      code: 'BCA',
      name: 'Bachelor of Computer Applications',
      duration: '3 Years',
      seats: '120 Seats',
      desc: 'Foundational computer science, programming in Python/C++, web development, and database concepts.'
    },
    {
      code: 'CSE',
      name: 'Computer Science & Engineering',
      duration: '4 Years',
      seats: '180 Seats',
      desc: 'Algorithms, operating systems, AI & Machine Learning, and distributed architectures.'
    },
    {
      code: 'IT',
      name: 'Information Technology',
      duration: '4 Years',
      seats: '120 Seats',
      desc: 'Network administration, cybersecurity, web applications, and enterprise systems.'
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="College Brochure Interactive Preview">
      <div className="brochure-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="brochure-header">
          <div className="brochure-brand">
            <div className="brochure-icon">
              <Globe size={20} />
            </div>
            <div>
              <h3>Adhiyamaan College Brochure Portal</h3>
              <span className="brochure-subtitle">Interactive Web App • React.js + Node.js Architecture</span>
            </div>
          </div>

          {/* Server Live Pill */}
          <div className="server-status-pill">
            <span className="server-dot"></span>
            <span>Server: 200 OK • 18ms Latency</span>
          </div>

          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close Preview">
            <X size={20} />
          </button>
        </div>

        {/* Browser Mock Navigation Bar */}
        <div className="mock-browser-bar">
          <div className="mock-dots">
            <span></span><span></span><span></span>
          </div>
          <div className="mock-address">
            https://adhiyamaan.ac.in/portal/brochure-2026/react-app
          </div>
        </div>

        {/* Brochure App Navigation */}
        <div className="brochure-nav-tabs">
          <button
            type="button"
            className={`brochure-tab ${activeSection === 'courses' ? 'active' : ''}`}
            onClick={() => {
              soundManager.playClick();
              setActiveSection('courses');
            }}
          >
            <BookOpen size={15} />
            <span>Academic Programs</span>
          </button>
          <button
            type="button"
            className={`brochure-tab ${activeSection === 'facilities' ? 'active' : ''}`}
            onClick={() => {
              soundManager.playClick();
              setActiveSection('facilities');
            }}
          >
            <Building size={15} />
            <span>Campus &amp; Labs</span>
          </button>
          <button
            type="button"
            className={`brochure-tab ${activeSection === 'server' ? 'active' : ''}`}
            onClick={() => {
              soundManager.playClick();
              setActiveSection('server');
            }}
          >
            <Activity size={15} />
            <span>Server Metrics</span>
          </button>
        </div>

        {/* Brochure Content Body */}
        <div className="brochure-body">
          {activeSection === 'courses' && (
            <div className="dept-grid-layout">
              {departments.map((dept) => (
                <div key={dept.code} className="dept-card-preview">
                  <div className="dept-card-top">
                    <span className="dept-badge">{dept.code}</span>
                    <span className="dept-duration">{dept.duration}</span>
                  </div>
                  <h4>{dept.name}</h4>
                  <p>{dept.desc}</p>
                  <div className="dept-meta">
                    <CheckCircle2 size={13} color="var(--accent-emerald)" />
                    <span>Intake: {dept.seats} • AICTE Approved</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'facilities' && (
            <div className="facilities-grid">
              <div className="facility-card">
                <h4>🖥️ Advanced Computing Lab</h4>
                <p>Equipped with high-performance workstations, Gigabit LAN, and modern development environments for React and Python development.</p>
              </div>
              <div className="facility-card">
                <h4>📚 Digital Central Library</h4>
                <p>Access to thousands of IEEE journals, technical papers, e-books, and research publications.</p>
              </div>
              <div className="facility-card">
                <h4>🌐 Innovation &amp; Incubation Hub</h4>
                <p>Collaborative project spaces for students building software applications and startup prototypes.</p>
              </div>
            </div>
          )}

          {activeSection === 'server' && (
            <div className="server-dashboard">
              <div className="server-metric-boxes">
                <div className="metric-box">
                  <span className="metric-lbl">Server Host</span>
                  <span className="metric-val">Adhiyamaan Institutional Node.js Server</span>
                </div>
                <div className="metric-box">
                  <span className="metric-lbl">Uptime</span>
                  <span className="metric-val" style={{ color: 'var(--accent-emerald)' }}>99.98%</span>
                </div>
                <div className="metric-box">
                  <span className="metric-lbl">HTTP Response Code</span>
                  <span className="metric-val" style={{ color: 'var(--accent-cyan)' }}>200 OK</span>
                </div>
                <div className="metric-box">
                  <span className="metric-lbl">Static Asset Caching</span>
                  <span className="metric-val">Enabled (Gzip/Brotli)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
