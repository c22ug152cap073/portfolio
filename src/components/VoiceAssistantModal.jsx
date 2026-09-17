import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, X, Sparkles, Volume2, ArrowRight, Bot, User, CornerDownLeft, RotateCcw } from 'lucide-react';
import { voiceEngine, matchVoiceQuery, soundManager, voiceKnowledgeBase } from '../utils/voiceEngine';

export const VoiceAssistantModal = ({ isOpen, onClose, onAction }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hi there! I'm Summiaya's AI Voice Assistant. Ask me anything about her skills, experience, ChatVerse NLP project, or MCA background!",
      action: { type: 'tour', label: 'Start Interactive Voice Tour' }
    }
  ]);

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = voiceEngine.subscribe((state) => {
      setIsSpeaking(state.isSpeaking);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen) {
      soundManager.playVoicePing();
      // Initialize SpeechRecognition if available
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (e) => {
          console.warn('Voice recognition error:', e);
          setIsListening(false);
        };
        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          if (transcript) {
            handleAsk(transcript);
          }
        };

        recognitionRef.current = recognition;
      }
    } else {
      stopListening();
      voiceEngine.stop();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSpeaking]);

  const toggleListening = () => {
    soundManager.playClick();
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        voiceEngine.stop();
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Could not start recognition:', err);
      }
    } else {
      alert('Speech recognition is not supported in this browser. You can still type your questions or click suggested topics below!');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const handleAsk = (textToAsk) => {
    const userText = textToAsk || query;
    if (!userText.trim()) return;

    soundManager.playPop();
    const match = matchVoiceQuery(userText);

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText
    };

    const aiMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: match.reply,
      action: match.action
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setQuery('');
    stopListening();

    // Speak AI response
    voiceEngine.speak(match.reply);
  };

  const handleActionClick = (action) => {
    soundManager.playClick();
    if (!action) return;
    if (action.type === 'tour') {
      onClose();
      onAction('start_tour');
    } else if (action.type === 'scroll') {
      onClose();
      document.getElementById(action.target)?.scrollIntoView({ behavior: 'smooth' });
    } else if (action.type === 'open_sandbox') {
      onClose();
      onAction('open_sandbox', action.project);
    } else if (action.type === 'open_brochure') {
      onClose();
      onAction('open_brochure');
    } else if (action.type === 'open_resume') {
      onClose();
      onAction('open_resume');
    }
  };

  const clearChat = () => {
    soundManager.playClick();
    voiceEngine.stop();
    setMessages([
      {
        id: 'welcome-cleared',
        sender: 'ai',
        text: "Chat cleared. What else would you like to know about Summiaya?",
        action: { type: 'tour', label: 'Start Voice Tour' }
      }
    ]);
  };

  if (!isOpen) return null;

  const samplePrompts = [
    "Tell me about your ChatVerse AI project",
    "What is your tech stack?",
    "Tell me about your internship at JRM Infotech",
    "What is your educational background?",
    "How can I contact Summiaya?"
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="AI Voice Assistant">
      <div className="voice-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="voice-modal-header">
          <div className="voice-header-title">
            <div className={`ai-orb-mini ${isSpeaking ? 'pulsing' : ''}`}>
              <Sparkles size={16} color="#38bdf8" />
            </div>
            <div>
              <h3>Summiaya AI Voice Assistant</h3>
              <span className="voice-status-indicator">
                {isListening ? '🎙️ Listening to you...' : isSpeaking ? '🔊 Speaking...' : '🟢 Ready to chat'}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className="icon-btn"
              onClick={clearChat}
              title="Reset conversation"
              aria-label="Clear chat"
            >
              <RotateCcw size={16} />
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={onClose}
              title="Close voice assistant"
              aria-label="Close voice assistant"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Visualizer Hero Area */}
        <div className="voice-hero-visualizer">
          <button
            type="button"
            className={`voice-big-orb ${isListening ? 'listening' : ''} ${isSpeaking ? 'speaking' : ''}`}
            onClick={toggleListening}
            title={isListening ? 'Click to stop listening' : 'Click to speak'}
            aria-label={isListening ? 'Stop microphone' : 'Start microphone'}
          >
            {isListening ? <MicOff size={32} /> : <Mic size={32} />}
            <div className="orb-ring ring-1"></div>
            <div className="orb-ring ring-2"></div>
          </button>
          <div className="voice-orb-hint">
            {isListening ? (
              <span className="listening-text">Listening... Speak now</span>
            ) : isSpeaking ? (
              <span className="speaking-text">Summiaya AI is speaking...</span>
            ) : (
              <span>Click the mic to speak or choose a topic below</span>
            )}
          </div>
        </div>

        {/* Chat / Messages Feed */}
        <div className="voice-messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`voice-message-row ${msg.sender === 'user' ? 'user-row' : 'ai-row'}`}>
              <div className="msg-avatar">
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="msg-bubble">
                <p>{msg.text}</p>
                {msg.action && (
                  <button
                    type="button"
                    className="msg-action-btn"
                    onClick={() => handleActionClick(msg.action)}
                  >
                    <span>{msg.action.label}</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div className="suggested-prompts-tray">
          <span className="tray-label">Quick Suggestions:</span>
          <div className="prompts-scroll">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                className="prompt-pill"
                onClick={() => handleAsk(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          className="voice-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(query);
          }}
        >
          <input
            type="text"
            className="voice-text-input"
            placeholder="Ask a question about Summiaya's portfolio..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className={`voice-input-mic-btn ${isListening ? 'active' : ''}`}
            onClick={toggleListening}
            title={isListening ? 'Stop listening' : 'Speak query'}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-sm voice-send-btn"
            disabled={!query.trim()}
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};
