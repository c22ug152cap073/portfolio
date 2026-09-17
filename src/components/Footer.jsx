import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const Footer = () => {
  const { footer } = portfolioData;

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-logo">
          <span className="footer-sl">SL</span>
        </div>
        <div className="footer-name">{footer.name}</div>
        <div className="footer-role">{footer.role}</div>
        <div className="footer-mantra" aria-label="Mantra">
          <span>CODE</span>
          <span className="footer-dot" aria-hidden="true">•</span>
          <span>CREATE</span>
          <span className="footer-dot" aria-hidden="true">•</span>
          <span>BUILD</span>
        </div>
        <div className="footer-copy">
          &copy; {footer.copyrightYear} {footer.name}
        </div>
      </div>
    </footer>
  );
};
