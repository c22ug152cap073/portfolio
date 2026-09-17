import React, { useState, useEffect, useRef } from 'react';

const TERMINAL_SEQUENCE = [
  { type: 'cmd', text: '$ whoami' },
  { type: 'out', text: 'Summiaya L', color: '#00d4ff' },
  { type: 'blank', text: '' },
  { type: 'cmd', text: '$ role' },
  { type: 'out', text: 'Full Stack Developer', color: '#a78bfa' },
  { type: 'blank', text: '' },
  { type: 'cmd', text: '$ frontend' },
  { type: 'out', text: '→ React.js', color: '#61dafb' },
  { type: 'blank', text: '' },
  { type: 'cmd', text: '$ backend' },
  { type: 'out', text: '→ Python', color: '#3776ab' },
  { type: 'out', text: '→ Django', color: '#44b78b' },
  { type: 'out', text: '→ Django REST Framework', color: '#44b78b' },
  { type: 'blank', text: '' },
  { type: 'cmd', text: '$ database' },
  { type: 'out', text: '→ MySQL', color: '#4479a1' },
  { type: 'out', text: '→ MongoDB', color: '#4db33d' },
  { type: 'blank', text: '' },
  { type: 'cmd', text: '$ ai_nlp' },
  { type: 'out', text: '→ NLTK  |  SpaCy  |  scikit-learn', color: '#f59e0b' },
  { type: 'out', text: '→ TF-IDF  |  Cosine Similarity', color: '#f59e0b' },
  { type: 'blank', text: '' },
  { type: 'cmd', text: '$ philosophy' },
  { type: 'out', text: 'Code.', color: '#00d4ff', delay: 80 },
  { type: 'out', text: 'Create.', color: '#8b5cf6', delay: 80 },
  { type: 'out', text: 'Learn.', color: '#34d399', delay: 80 },
  { type: 'out', text: 'Grow.', color: '#f59e0b', delay: 80 },
  { type: 'blank', text: '' },
  { type: 'cmd', text: '$ status' },
  { type: 'out', text: '✓ Available for Software Developer Roles & Internships', color: '#34d399' },
];

export const CodeTerminal = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const bottomRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let lineIdx = 0;
    let charIdx = 0;
    let timeout;

    const typeNext = () => {
      if (lineIdx >= TERMINAL_SEQUENCE.length) return;

      const line = TERMINAL_SEQUENCE[lineIdx];

      if (line.type === 'blank') {
        setVisibleLines(prev => [...prev, { ...line, id: lineIdx }]);
        lineIdx++;
        charIdx = 0;
        timeout = setTimeout(typeNext, 120);
        return;
      }

      if (line.type === 'out') {
        setVisibleLines(prev => [...prev, { ...line, id: lineIdx }]);
        lineIdx++;
        charIdx = 0;
        timeout = setTimeout(typeNext, line.delay || 180);
        return;
      }

      // Type command char by char
      if (charIdx < line.text.length) {
        setCurrentTyping(line.text.slice(0, charIdx + 1));
        setCurrentLineIndex(lineIdx);
        charIdx++;
        timeout = setTimeout(typeNext, 55);
      } else {
        setVisibleLines(prev => [...prev, { ...line, id: lineIdx }]);
        setCurrentTyping('');
        setCurrentLineIndex(-1);
        lineIdx++;
        charIdx = 0;
        timeout = setTimeout(typeNext, 350);
      }
    };

    timeout = setTimeout(typeNext, 500);
    return () => clearTimeout(timeout);
  }, [inView]);

  // Auto-scroll terminal
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [visibleLines, currentTyping]);

  return (
    <section id="terminal" className="section terminal-section" ref={sectionRef} aria-labelledby="terminal-heading">
      <div className="section-eyebrow">07 — BEHIND THE CODE</div>

      <div className={`terminal-header ${inView ? 'in-view' : ''}`}>
        <h2 id="terminal-heading" className="section-big-title">
          The <span className="accent-cyan">Terminal</span>
        </h2>
      </div>

      <div className={`terminal-window ${inView ? 'visible' : ''}`} role="log" aria-label="Developer terminal output" aria-live="polite">
        {/* Terminal title bar */}
        <div className="tw-header">
          <div className="tw-dots">
            <span className="tw-dot red" aria-hidden="true" />
            <span className="tw-dot yellow" aria-hidden="true" />
            <span className="tw-dot green" aria-hidden="true" />
          </div>
          <span className="tw-title">summiaya@portfolio:~</span>
          <span className="tw-lang">bash</span>
        </div>

        {/* Terminal body */}
        <div className="tw-body">
          {visibleLines.map((line) => (
            <div key={line.id} className={`tl ${line.type}`}>
              {line.type === 'cmd' && (
                <>
                  <span className="tl-prompt" aria-hidden="true">›</span>
                  <span className="tl-cmd">{line.text.replace('$ ', '')}</span>
                </>
              )}
              {line.type === 'out' && (
                <span className="tl-out" style={{ color: line.color }}>{line.text}</span>
              )}
              {line.type === 'blank' && <span />}
            </div>
          ))}

          {/* Currently typing line */}
          {currentTyping && (
            <div className="tl cmd typing">
              <span className="tl-prompt" aria-hidden="true">›</span>
              <span className="tl-cmd">{currentTyping.replace('$ ', '')}</span>
              <span className="tl-cursor blink" aria-hidden="true">█</span>
            </div>
          )}

          {/* Idle cursor */}
          {!currentTyping && visibleLines.length === TERMINAL_SEQUENCE.length && (
            <div className="tl cmd idle">
              <span className="tl-prompt" aria-hidden="true">›</span>
              <span className="tl-cursor blink" aria-hidden="true">█</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
};
