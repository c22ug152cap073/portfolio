import React from 'react';
import { Languages as LangIcon, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Languages = () => {
  const { languages } = portfolioData;

  return (
    <section id="languages" className="section section-alternate">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Communication</span>
          <h2 className="section-title">
            Language <span>Proficiency</span>
          </h2>
          <p className="section-subtitle">
            Languages spoken for multilingual communication and international team collaboration.
          </p>
        </div>

        <div className="languages-grid">
          {languages.map((lang) => (
            <div key={lang.name} className="lang-card">
              <span className="lang-code">{lang.code}</span>
              <span className="lang-name">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
