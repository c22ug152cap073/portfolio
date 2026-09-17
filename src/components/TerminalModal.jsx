import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/voiceEngine';

export const TerminalModal = ({ isOpen, onClose, onAction, onThemeChange }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Summiaya L — Developer Shell v2.4.0 [x86_64-node-react]' },
    { type: 'system', text: 'Type "help" to view available developer commands, or "voice" for AI tour.' }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      soundManager.playPop();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    soundManager.playClick();
    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts[1] ? parts[1].toLowerCase() : '';

    const newHistory = [...history, { type: 'prompt', text: `$ ${raw}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available commands:
  whoami            - Display developer background summary
  skills            - List frontend, backend, database & NLP technical skills
  projects          - Display featured project portfolio
  nlp-test          - Launch interactive ChatVerse NLP engine sandbox
  brochure          - Launch Adhiyamaan College Brochure explorer
  voice             - Start interactive AI Voice Tour
  resume            - Open interactive resume modal
  github            - Open developer GitHub profile (c22ug152cap073)
  contact           - View developer contact coordinates
  theme <name>      - Switch theme (cyber, emerald, sunset, titanium)
  clear             - Clear terminal screen
  exit              - Close terminal session`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `Summiaya L | Full Stack Developer & MCA Student
Location: Hosur, Tamil Nadu, India
Specialization: React.js, Python, Django, Django REST Framework, MySQL, NLP
Status: Available for Software Developer Roles & Internships`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Frontend : React.js, HTML5, CSS3, JavaScript (ES6+), Responsive UI
Backend  : Python, Django, Django REST Framework, Node.js, REST APIs
Database : MySQL (Relational Modeling, Indexing), MongoDB
AI & NLP : SpaCy, NLTK, scikit-learn, TF-IDF, Cosine Similarity
Tools    : Git, GitHub, VS Code, Postman, Vite`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `1. ChatVerse – AI Chatbot (Python, Django, SpaCy, NLTK, TF-IDF, MySQL)
2. College Brochure Website (React.js, Node.js, Hosted on College Server)`
        });
        break;

      case 'nlp-test':
      case 'chatverse':
        newHistory.push({ type: 'output', text: 'Launching ChatVerse NLP Sandbox...' });
        setTimeout(() => {
          onClose();
          onAction('open_sandbox', 'chatverse');
        }, 500);
        break;

      case 'brochure':
        newHistory.push({ type: 'output', text: 'Launching College Brochure Explorer...' });
        setTimeout(() => {
          onClose();
          onAction('open_brochure');
        }, 500);
        break;

      case 'voice':
      case 'tour':
        newHistory.push({ type: 'output', text: 'Starting AI Voice Tour...' });
        setTimeout(() => {
          onClose();
          onAction('start_tour');
        }, 500);
        break;

      case 'resume':
        newHistory.push({ type: 'output', text: 'Opening Resume...' });
        setTimeout(() => {
          onClose();
          onAction('open_resume');
        }, 400);
        break;

      case 'github':
        newHistory.push({
          type: 'output',
          text: `GitHub Profile: https://github.com/c22ug152cap073
Username: c22ug152cap073
Opening profile in new tab...`
        });
        window.open('https://github.com/c22ug152cap073', '_blank');
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: summiayasummiaya2004@gmail.com
Phone: +91 6369682663
GitHub: https://github.com/c22ug152cap073 (c22ug152cap073)
LinkedIn: https://www.linkedin.com/in/summiaya-1-25210a299
Location: Hosur, Tamil Nadu, India`
        });
        break;

      case 'theme':
        if (['cyber', 'emerald', 'sunset', 'titanium'].includes(arg)) {
          onThemeChange(arg);
          newHistory.push({ type: 'output', text: `Theme switched to: ${arg}` });
        } else {
          newHistory.push({
            type: 'error',
            text: 'Usage: theme <cyber | emerald | sunset | titanium>'
          });
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" for a list of available commands.`
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Developer Terminal">
      <div className="terminal-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Terminal Titlebar */}
        <div className="terminal-titlebar">
          <div className="ide-dots">
            <span className="ide-dot red" onClick={onClose} style={{ cursor: 'pointer' }}></span>
            <span className="ide-dot yellow"></span>
            <span className="ide-dot green"></span>
          </div>
          <div className="terminal-title-text">
            <TerminalIcon size={14} color="var(--accent-cyan)" />
            <span>summiaya@dev-box: ~/portfolio (bash)</span>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close terminal">
            <X size={16} />
          </button>
        </div>

        {/* Terminal Screen */}
        <div className="terminal-screen" onClick={() => document.getElementById('term-input')?.focus()}>
          {history.map((item, index) => (
            <div key={index} className={`terminal-line ${item.type}`}>
              <pre>{item.text}</pre>
            </div>
          ))}

          {/* Prompt Row */}
          <form
            className="terminal-prompt-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
          >
            <span className="prompt-label">summiaya@portfolio:~$</span>
            <input
              id="term-input"
              type="text"
              className="prompt-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
