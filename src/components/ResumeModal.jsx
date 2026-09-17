import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { LinkedInIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { personal, about, skills, experience, projects, education, certifications, languages } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h3 className="modal-title">Official Resume Preview</h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body / Formatted Resume Sheet */}
        <div className="modal-body">
          <div className="resume-preview-sheet">
            {/* Header */}
            <div className="resume-sheet-header">
              <h1 className="resume-sheet-title">{personal.name}</h1>
              <div className="resume-sheet-role">{personal.title}</div>
              <div className="resume-sheet-contact">
                {personal.location} &bull; {personal.phone} &bull; {personal.email} &bull; {personal.github} &bull; {personal.linkedin}
              </div>
            </div>

            {/* Professional Summary */}
            <div className="resume-sheet-section">
              <h2 className="resume-sheet-heading">Professional Summary</h2>
              <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                Motivated and detail-oriented MCA student with hands-on experience in full-stack web development, specializing in React.js, Python, Django, Django REST Framework, and MySQL. Proficient in designing responsive user interfaces, developing RESTful APIs, and building scalable web applications that enhance user experience. Strong passion for problem-solving and continuous learning.
              </p>
            </div>

            {/* Experience */}
            <div className="resume-sheet-section">
              <h2 className="resume-sheet-heading">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.92rem' }}>
                    <span>{exp.role} &mdash; {exp.company}</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>{exp.period}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{exp.location}</div>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="resume-sheet-section">
              <h2 className="resume-sheet-heading">Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '0.85rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                    {proj.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '0.2rem' }}>
                    {proj.technologies.join(', ')}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div className="resume-sheet-section">
              <h2 className="resume-sheet-heading">Technical Skills</h2>
              <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div><strong>Frontend:</strong> React.js, HTML, CSS, JavaScript, Responsive Web Design</div>
                <div><strong>Backend:</strong> Python, Django, Django REST Framework, Node.js, REST APIs, API Integration</div>
                <div><strong>Databases:</strong> MySQL, MongoDB</div>
                <div><strong>AI / NLP:</strong> NLTK, SpaCy, scikit-learn, TF-IDF, Cosine Similarity</div>
                <div><strong>Tools:</strong> Git, GitHub</div>
              </div>
            </div>

            {/* Education */}
            <div className="resume-sheet-section">
              <h2 className="resume-sheet-heading">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem' }}>
                    <span>{edu.degree}</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>{edu.period}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {edu.institution}, {edu.location}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications & Languages */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="resume-sheet-section">
                <h2 className="resume-sheet-heading">Certifications</h2>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {certifications.map((c) => (
                    <li key={c.id} style={{ marginBottom: '0.25rem' }}>{c.title} &mdash; {c.issuer}</li>
                  ))}
                </ul>
              </div>

              <div className="resume-sheet-section">
                <h2 className="resume-sheet-heading">Languages</h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {languages.map(l => l.name).join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={handlePrint}>
            <Printer size={15} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
