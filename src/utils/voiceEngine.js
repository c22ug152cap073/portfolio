/**
 * Summiaya L - AI Voice Engine & Audio Controller
 * Uses Web Speech API (SpeechSynthesis & SpeechRecognition) + Web Audio API
 */

// --- Web Audio SFX Synthesizer ---
class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playBeep(freq = 440, type = 'sine', duration = 0.1, gainValue = 0.05) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // AudioContext not allowed before user gesture
    }
  }

  playClick() {
    this.playBeep(800, 'triangle', 0.04, 0.03);
  }

  playPop() {
    this.playBeep(520, 'sine', 0.08, 0.04);
  }

  playSuccess() {
    if (this.muted) return;
    this.playBeep(587.33, 'sine', 0.1, 0.04); // D5
    setTimeout(() => this.playBeep(880, 'sine', 0.15, 0.04), 80); // A5
  }

  playVoicePing() {
    if (this.muted) return;
    this.playBeep(659.25, 'sine', 0.08, 0.04); // E5
    setTimeout(() => this.playBeep(987.77, 'sine', 0.12, 0.04), 70); // B5
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }
}

export const soundManager = new SoundManager();

// --- AI Voice Knowledge Base for Summiaya L ---
export const voiceKnowledgeBase = [
  {
    tags: ['who', 'about', 'introduction', 'summiaya', 'bio', 'name'],
    question: "Who is Summiaya?",
    reply: "Hello! I am Summiaya L, a motivated Full Stack Developer and MCA student based in Hosur, Tamil Nadu. I specialize in building responsive React frontends, robust Python and Django REST backends, and intelligent NLP solutions with MySQL databases.",
    action: { type: 'scroll', target: 'about', label: 'View About Section' }
  },
  {
    tags: ['skills', 'tech', 'stack', 'technologies', 'languages', 'frameworks', 'frontend', 'backend'],
    question: "What is your technical stack and skills?",
    reply: "My core technical stack includes React.js, JavaScript, HTML5, and modern CSS on the frontend. On the backend, I build RESTful APIs with Python, Django, and Django REST Framework, backed by MySQL and MongoDB. I also work with NLP tools like NLTK, SpaCy, and scikit-learn.",
    action: { type: 'scroll', target: 'skills', label: 'Explore Skills Matrix' }
  },
  {
    tags: ['chatverse', 'nlp', 'chatbot', 'ai', 'machine learning', 'tfidf', 'cosine'],
    question: "Tell me about your ChatVerse AI project.",
    reply: "ChatVerse is an AI-powered conversational chatbot I developed using Python, Django, and MySQL. It leverages SpaCy and NLTK for text preprocessing and applies TF-IDF vectorization with Cosine Similarity algorithms to intelligently match user queries with our knowledge base.",
    action: { type: 'open_sandbox', project: 'chatverse', label: 'Launch ChatVerse NLP Sandbox' }
  },
  {
    tags: ['college', 'brochure', 'website', 'react project', 'portal', 'adhiyamaan'],
    question: "Tell me about the College Brochure project.",
    reply: "The College Brochure is a production-ready responsive web portal built with React.js and Node.js. It features modular department catalogs and campus details, and is successfully hosted on the Adhiyamaan College server infrastructure.",
    action: { type: 'open_brochure', label: 'Open Brochure Interactive Preview' }
  },
  {
    tags: ['internship', 'experience', 'jrm', 'work', 'job', 'company'],
    question: "What is your work experience at JRM Infotech?",
    reply: "I am currently working as a Web Developer Intern at JRM Infotech since March 2026. My responsibilities include developing and integrating RESTful APIs with Django REST Framework, managing MySQL relational databases, and crafting responsive frontend components with Git workflow.",
    action: { type: 'scroll', target: 'experience', label: 'See Internship Details' }
  },
  {
    tags: ['education', 'degree', 'mca', 'bca', 'study', 'college', 'university'],
    question: "What is your educational background?",
    reply: "I am currently pursuing my Master of Science in Computer Applications (MCA) at Adhiyamaan Engineering College, expected in July 2028. Prior to this, I completed my BCA at St. Joseph's College for Women, graduating in December 2026.",
    action: { type: 'scroll', target: 'education', label: 'View Education' }
  },
  {
    tags: ['contact', 'email', 'phone', 'hire', 'reach', 'message', 'interview', 'opportunity'],
    question: "How can I contact or hire Summiaya?",
    reply: "You can reach me directly via email at summiayasummiaya2004@gmail.com or by phone at +91 6369682663. You can also connect with me on LinkedIn or leave a message through the contact form below!",
    action: { type: 'scroll', target: 'contact', label: 'Jump to Contact Form' }
  },
  {
    tags: ['resume', 'cv', 'download', 'pdf'],
    question: "Can I see or download your resume?",
    reply: "Certainly! You can view my complete interactive resume right here on the portfolio or download a clean print-ready PDF format.",
    action: { type: 'open_resume', label: 'Open Resume Viewer' }
  }
];

// --- Guided Voice Tour Steps ---
export const tourSteps = [
  {
    id: 'intro',
    title: 'Welcome & Introduction',
    sectionId: 'home',
    badge: 'Step 1 of 5',
    text: "Welcome to my portfolio! I'm Summiaya L, a Full Stack Developer specializing in React.js, Python, Django, and MySQL. I craft clean, scalable web applications and intelligent digital experiences.",
    highlightSelector: '.hero-title'
  },
  {
    id: 'skills',
    title: 'Technical Stack & Tools',
    sectionId: 'skills',
    badge: 'Step 2 of 5',
    text: "Here is my core technical stack. I build high-performance frontends with React, robust backend architectures using Django REST Framework, and handle complex data with MySQL and NLP algorithms.",
    highlightSelector: '#skills'
  },
  {
    id: 'experience',
    title: 'Professional Internship',
    sectionId: 'experience',
    badge: 'Step 3 of 5',
    text: "At JRM Infotech, I work as a Web Developer Intern, developing RESTful APIs, optimizing MySQL queries, and collaborating closely with design teams to deliver responsive production features.",
    highlightSelector: '#experience'
  },
  {
    id: 'projects',
    title: 'Featured AI & Web Projects',
    sectionId: 'projects',
    badge: 'Step 4 of 5',
    text: "Check out my featured projects including ChatVerse, an NLP-powered chatbot using TF-IDF and Cosine Similarity, and the Adhiyamaan College responsive brochure web application.",
    highlightSelector: '#projects'
  },
  {
    id: 'contact',
    title: "Let's Connect & Collaborate",
    sectionId: 'contact',
    badge: 'Step 5 of 5',
    text: "I am actively seeking software developer roles and internships. Feel free to download my resume, test my interactive sandbox, or drop me a message to discuss opportunities!",
    highlightSelector: '#contact'
  }
];

// --- Speech Synthesis Engine ---
class VoiceEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.preferredVoice = null;
    this.rate = 1.0;
    this.pitch = 1.0;
    this.isSpeaking = false;
    this.isPaused = false;
    this.onStateChangeCallbacks = new Set();
    this.currentUtterance = null;

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    
    // Choose natural voice if available
    const naturalVoice = this.voices.find(
      v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('Microsoft')) && v.lang.startsWith('en')
    ) || this.voices.find(v => v.lang.startsWith('en')) || this.voices[0];

    this.preferredVoice = naturalVoice || null;
  }

  subscribe(callback) {
    this.onStateChangeCallbacks.add(callback);
    return () => this.onStateChangeCallbacks.delete(callback);
  }

  notify(state) {
    this.onStateChangeCallbacks.forEach(cb => cb(state));
  }

  speak(text, { onStart, onEnd, onBoundary } = {}) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    if (!this.preferredVoice && this.voices.length > 0) {
      this.loadVoices();
    }
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.lang = 'en-US';

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      this.notify({ isSpeaking: true, isPaused: false, text });
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.notify({ isSpeaking: false, isPaused: false, text: '' });
      if (onEnd) onEnd();
    };

    utterance.onerror = (err) => {
      console.warn('Speech synthesis error:', err);
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.notify({ isSpeaking: false, isPaused: false, text: '' });
      if (onEnd) onEnd();
    };

    if (onBoundary) {
      utterance.onboundary = (e) => onBoundary(e);
    }

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.notify({ isSpeaking: true, isPaused: true });
    }
  }

  resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notify({ isSpeaking: true, isPaused: false });
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.notify({ isSpeaking: false, isPaused: false, text: '' });
    }
  }

  setRate(rate) {
    this.rate = rate;
  }
}

export const voiceEngine = new VoiceEngine();

// --- Query Intent Matcher for Voice Q&A ---
export function matchVoiceQuery(query) {
  if (!query || typeof query !== 'string') {
    return voiceKnowledgeBase[0];
  }

  const cleanQuery = query.toLowerCase();

  let bestMatch = null;
  let maxScore = 0;

  for (const item of voiceKnowledgeBase) {
    let score = 0;
    for (const tag of item.tags) {
      if (cleanQuery.includes(tag)) {
        score += tag.length > 4 ? 2 : 1;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 0) {
    return bestMatch;
  }

  // Fallback reply
  return {
    question: query,
    reply: "Summiaya L is a Full Stack Developer with expertise in React, Python, Django REST, and MySQL. Feel free to check out her projects, skills, or download her resume!",
    action: { type: 'scroll', target: 'projects', label: 'View Projects' }
  };
}
