import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  {
    id: 'frontend',
    label: 'TRACK 01 // FRONTEND',
    color: '#00d4ff',
    skills: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Responsive Web Design', 'React.js', 'HTML', 'CSS', 'JavaScript', 'Responsive Web Design'],
  },
  {
    id: 'backend',
    label: 'TRACK 02 // BACKEND',
    color: '#8b5cf6',
    skills: ['Python', 'Django', 'Django REST Framework', 'Node.js', 'REST APIs', 'API Integration', 'Python', 'Django', 'Django REST Framework', 'Node.js'],
  },
  {
    id: 'database',
    label: 'TRACK 03 // DATABASE',
    color: '#34d399',
    skills: ['MySQL', 'MongoDB', 'Relational Design', 'Query Optimization', 'MySQL', 'MongoDB', 'Relational Design', 'Query Optimization'],
  },
  {
    id: 'ai_nlp',
    label: 'TRACK 04 // AI / NLP',
    color: '#f59e0b',
    skills: ['NLTK', 'SpaCy', 'scikit-learn', 'TF-IDF', 'Cosine Similarity', 'NLTK', 'SpaCy', 'scikit-learn', 'TF-IDF', 'Cosine Similarity'],
  },
  {
    id: 'tools',
    label: 'TRACK 05 // TOOLS',
    color: '#ec4899',
    skills: ['Git', 'GitHub', 'Version Control', 'Collaboration', 'Git', 'GitHub', 'Version Control', 'Collaboration'],
  },
];

const CATEGORIES = {
  'React.js': 'Frontend', 'HTML': 'Frontend', 'CSS': 'Frontend', 'JavaScript': 'Frontend',
  'Responsive Web Design': 'Frontend', 'Python': 'Backend', 'Django': 'Backend',
  'Django REST Framework': 'Backend', 'Node.js': 'Backend', 'REST APIs': 'Backend',
  'API Integration': 'Backend', 'MySQL': 'Database', 'MongoDB': 'Database',
  'Relational Design': 'Database', 'Query Optimization': 'Database',
  'NLTK': 'AI / NLP', 'SpaCy': 'AI / NLP', 'scikit-learn': 'AI / NLP',
  'TF-IDF': 'AI / NLP', 'Cosine Similarity': 'AI / NLP',
  'Git': 'Tools', 'GitHub': 'Tools', 'Version Control': 'Tools', 'Collaboration': 'Tools',
};

const TrainTrack = ({ track, index }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const trainRef = useRef(null);

  const handleSkillHover = (skill, e) => {
    setHoveredSkill(skill);
    setHoverPos({ x: e.clientX, y: e.clientY });
    setIsPaused(true);
  };

  const handleSkillLeave = () => {
    setHoveredSkill(null);
    setIsPaused(false);
  };

  // Alternate direction for even/odd tracks
  const reverse = index % 2 === 1;

  return (
    <div className="train-track-wrap" style={{ '--track-color': track.color }}>
      {/* Track label */}
      <div className="track-label" aria-label={track.label}>
        <span className="track-label-line" aria-hidden="true" />
        <span className="track-label-text">{track.label}</span>
        <span className="track-label-line" aria-hidden="true" />
      </div>

      {/* Rails */}
      <div className="track-rails" aria-hidden="true">
        <div className="rail rail-top" />
        <div className="rail rail-bottom" />
        {/* Sleepers */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="rail-sleeper" style={{ left: `${i * 5.26}%` }} />
        ))}
        {/* Track lights */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="track-light" style={{ left: `${i * 25}%`, '--delay': `${i * 0.4}s` }} />
        ))}
      </div>

      {/* Train (scrolling carriages) */}
      <div className="train-viewport" role="list" aria-label={`${track.label} technologies`}>
        <div
          ref={trainRef}
          className={`train-belt ${reverse ? 'reverse' : ''} ${isPaused ? 'paused' : ''}`}
        >
          {/* Locomotive */}
          <div className="locomotive" aria-hidden="true">
            <div className="loco-body" style={{ background: track.color }}>
              <div className="loco-window" />
              <div className="loco-light" style={{ background: track.color }} />
            </div>
            <div className="loco-smoke">
              {[0, 1, 2].map(i => (
                <div key={i} className="smoke-puff" style={{ '--sd': `${i * 0.3}s` }} />
              ))}
            </div>
          </div>

          {/* Skill carriages */}
          {track.skills.map((skill, i) => (
            <div
              key={`${skill}-${i}`}
              className="train-carriage"
              role="listitem"
              data-cursor="tech"
              onMouseEnter={(e) => handleSkillHover(skill, e)}
              onMouseLeave={handleSkillLeave}
              onMouseMove={(e) => setHoverPos({ x: e.clientX, y: e.clientY })}
              style={{ '--carriage-color': track.color }}
              aria-label={`${skill} — ${CATEGORIES[skill] || track.label}`}
            >
              <div className="carriage-body">
                <div className="carriage-window" aria-hidden="true" />
                <div className="carriage-window" aria-hidden="true" />
                <span className="carriage-label">{skill}</span>
              </div>
              <div className="carriage-wheels" aria-hidden="true">
                <div className="wheel" />
                <div className="wheel" />
              </div>
              <div className="carriage-connector" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* Hover info panel — portal to body */}
      {hoveredSkill && (
        <div
          className="skill-info-panel"
          style={{ left: hoverPos.x + 16, top: hoverPos.y - 60 }}
          aria-live="polite"
        >
          <div className="sip-tech">{hoveredSkill}</div>
          <div className="sip-cat">
            <span className="sip-cat-dot" style={{ background: track.color }} aria-hidden="true" />
            {CATEGORIES[hoveredSkill] || 'Technology'}
          </div>
        </div>
      )}
    </div>
  );
};

export const Skills = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills-section" ref={sectionRef} aria-labelledby="skills-heading">
      <div className="section-eyebrow">02 — MY TECH JOURNEY</div>

      <div className={`skills-header ${inView ? 'in-view' : ''}`}>
        <h2 id="skills-heading" className="section-big-title">
          The <span className="accent-cyan">Skill</span> Train
        </h2>
        <p className="section-subtitle">
          Hover any carriage to pause the train and inspect the technology.
        </p>
      </div>

      <div className={`train-system ${inView ? 'visible' : ''}`}>
        {TRACKS.map((track, i) => (
          <TrainTrack key={track.id} track={track} index={i} />
        ))}
      </div>
    </section>
  );
};
