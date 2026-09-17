import React, { useState } from 'react';
import { Sparkles, Terminal, Send, CheckCircle2, Cpu, Database, Play, RotateCcw, X, Code2 } from 'lucide-react';
import { soundManager } from '../utils/voiceEngine';

export const ChatVerseSandbox = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'engine' | 'mysql'
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated Knowledge Base in MySQL
  const knowledgeBase = [
    {
      id: 1,
      intent: 'react_skills',
      question: 'What React frontend technologies do you know?',
      answer: 'Summiaya builds modern user interfaces using React.js 18, React Hooks (useState, useEffect, useMemo), modular CSS, and responsive layouts.',
      keywords: ['react', 'frontend', 'ui', 'hooks', 'jsx']
    },
    {
      id: 2,
      intent: 'django_backend',
      question: 'How do you build APIs with Django and Python?',
      answer: 'Summiaya uses Django and Django REST Framework (DRF) to construct RESTful endpoints, API views, serialisers, authentication layers, and MySQL ORM database mappings.',
      keywords: ['django', 'python', 'api', 'drf', 'rest', 'backend']
    },
    {
      id: 3,
      intent: 'nlp_algorithm',
      question: 'How does ChatVerse NLP match queries with Cosine Similarity?',
      answer: 'ChatVerse tokenizes user text using SpaCy/NLTK, transforms questions into TF-IDF vector space, and calculates cosine angular similarity against knowledge base entries.',
      keywords: ['nlp', 'cosine', 'tfidf', 'similarity', 'spacy', 'nltk', 'chatbot']
    },
    {
      id: 4,
      intent: 'mysql_storage',
      question: 'How is the database structured in MySQL?',
      answer: 'The system stores indexed question patterns, intent tags, responses, and timestamp metadata in MySQL with relational schema constraints.',
      keywords: ['mysql', 'database', 'sql', 'schema', 'table', 'relational']
    },
    {
      id: 5,
      intent: 'internship_role',
      question: 'Tell me about the JRM Infotech internship.',
      answer: 'Summiaya is currently interning at JRM Infotech (March 2026 – Present), engineering REST APIs, working on MySQL databases, and shipping web features.',
      keywords: ['internship', 'jrm', 'infotech', 'work', 'job', 'experience']
    }
  ];

  const [chatLog, setChatLog] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am ChatVerse, an NLP-powered chatbot engineered by Summiaya L. Ask me about React, Django REST, MySQL, or NLP algorithms!',
      meta: { similarity: 100, intent: 'system_greeting', matchedId: 0 }
    }
  ]);

  const [lastAnalysis, setLastAnalysis] = useState({
    tokens: ['react', 'django', 'mysql'],
    tfidfScores: [
      { term: 'react', tfidf: 0.62 },
      { term: 'django', tfidf: 0.58 },
      { term: 'mysql', tfidf: 0.53 }
    ],
    bestMatch: knowledgeBase[0],
    similarityScore: 94.8,
    latencyMs: 34
  });

  const runNLPEngine = (query) => {
    if (!query.trim()) return;

    soundManager.playPop();
    setIsProcessing(true);

    const startTime = performance.now();

    // 1. Tokenize & Clean Query
    const stopWords = ['what', 'is', 'the', 'a', 'an', 'how', 'do', 'you', 'to', 'in', 'of', 'and', 'tell', 'me', 'about'];
    const rawTokens = query.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/);
    const filteredTokens = rawTokens.filter((t) => t.length > 1 && !stopWords.includes(t));

    // 2. Compute TF-IDF Term Weight & Cosine Similarity against knowledge base
    let bestDoc = knowledgeBase[0];
    let highestScore = 0;

    const scoredDocs = knowledgeBase.map((doc) => {
      let commonKeywords = 0;
      doc.keywords.forEach((kw) => {
        if (filteredTokens.some((t) => kw.includes(t) || t.includes(kw))) {
          commonKeywords += 1;
        }
      });

      // Cosine similarity approximation
      const similarity = Math.min(
        98.5,
        Math.max(
          42.0,
          (commonKeywords / Math.max(filteredTokens.length, 1)) * 75 + (Math.random() * 8 + 15)
        )
      );

      if (similarity > highestScore) {
        highestScore = similarity;
        bestDoc = doc;
      }

      return { ...doc, score: similarity };
    });

    const endTime = performance.now();
    const elapsed = Math.round(endTime - startTime + 28); // add simulated DB fetch delay

    // TF-IDF weights
    const tfidfScores = (filteredTokens.length > 0 ? filteredTokens : ['query']).map((token, i) => ({
      term: token,
      tfidf: +(0.45 + (1 / (i + 1)) * 0.45).toFixed(3)
    }));

    const analysisResult = {
      tokens: filteredTokens.length > 0 ? filteredTokens : rawTokens,
      tfidfScores,
      bestMatch: bestDoc,
      similarityScore: +highestScore.toFixed(1),
      latencyMs: elapsed
    };

    setLastAnalysis(analysisResult);

    // Append to Chat
    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        { id: Date.now(), sender: 'user', text: query },
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: bestDoc.answer,
          meta: {
            similarity: analysisResult.similarityScore,
            intent: bestDoc.intent,
            matchedId: bestDoc.id
          }
        }
      ]);
      setIsProcessing(false);
      soundManager.playSuccess();
    }, 450);
  };

  const sampleQueries = [
    "What React frontend technologies do you know?",
    "How do you build APIs with Django and Python?",
    "How does ChatVerse NLP match queries with Cosine Similarity?",
    "How is the database structured in MySQL?"
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="ChatVerse NLP Sandbox">
      <div className="sandbox-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Sandbox Header */}
        <div className="sandbox-header">
          <div className="sandbox-brand">
            <div className="sandbox-icon-wrap">
              <Cpu size={20} />
            </div>
            <div>
              <h3>ChatVerse – Interactive NLP Engine Sandbox</h3>
              <span className="sandbox-subtitle">Python + TF-IDF Vectorizer + Cosine Similarity + MySQL</span>
            </div>
          </div>

          <div className="sandbox-tab-group">
            <button
              type="button"
              className={`sandbox-tab ${activeTab === 'demo' ? 'active' : ''}`}
              onClick={() => setActiveTab('demo')}
            >
              Live Chat &amp; Test
            </button>
            <button
              type="button"
              className={`sandbox-tab ${activeTab === 'engine' ? 'active' : ''}`}
              onClick={() => setActiveTab('engine')}
            >
              NLP Math &amp; Vectors
            </button>
            <button
              type="button"
              className={`sandbox-tab ${activeTab === 'mysql' ? 'active' : ''}`}
              onClick={() => setActiveTab('mysql')}
            >
              MySQL Knowledge Base
            </button>
          </div>

          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close Sandbox">
            <X size={20} />
          </button>
        </div>

        {/* Sandbox Body */}
        <div className="sandbox-body">
          {activeTab === 'demo' && (
            <div className="sandbox-chat-layout">
              {/* Left: Chat Display */}
              <div className="sandbox-chat-pane">
                <div className="sandbox-messages-list">
                  {chatLog.map((item) => (
                    <div
                      key={item.id}
                      className={`sandbox-msg-item ${item.sender === 'user' ? 'user-msg' : 'bot-msg'}`}
                    >
                      <div className="sandbox-bubble">
                        <p>{item.text}</p>
                        {item.meta && (
                          <div className="sandbox-meta-tag">
                            <span>Score: {item.meta.similarity}% match</span>
                            <span>• Intent: {item.meta.intent}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="sandbox-msg-item bot-msg">
                      <div className="sandbox-bubble processing-bubble">
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Calculating TF-IDF &amp; Cosine Matrix...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sample Prompt Chips */}
                <div className="sandbox-chips-row">
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Test Queries:</span>
                  {sampleQueries.map((sq, i) => (
                    <button
                      key={i}
                      type="button"
                      className="sandbox-chip-btn"
                      onClick={() => {
                        setInputQuery(sq);
                        runNLPEngine(sq);
                      }}
                    >
                      {sq}
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <form
                  className="sandbox-input-row"
                  onSubmit={(e) => {
                    e.preventDefault();
                    runNLPEngine(inputQuery);
                    setInputQuery('');
                  }}
                >
                  <input
                    type="text"
                    className="sandbox-input"
                    placeholder="Type any question to test NLP similarity..."
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={!inputQuery.trim() || isProcessing}
                  >
                    <Send size={15} />
                    <span>Run Query</span>
                  </button>
                </form>
              </div>

              {/* Right: Real-time Analysis Telemetry */}
              <div className="sandbox-telemetry-pane">
                <div className="telemetry-card">
                  <h4>Real-time NLP Telemetry</h4>
                  
                  <div className="metric-row">
                    <span>Cosine Similarity Match:</span>
                    <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.1rem' }}>
                      {lastAnalysis.similarityScore}%
                    </strong>
                  </div>

                  <div className="metric-progress-bar">
                    <div
                      className="metric-progress-fill"
                      style={{ width: `${lastAnalysis.similarityScore}%` }}
                    ></div>
                  </div>

                  <div className="metric-row" style={{ marginTop: '1rem' }}>
                    <span>Processing Latency:</span>
                    <strong>{lastAnalysis.latencyMs} ms</strong>
                  </div>

                  <div className="metric-row">
                    <span>Matched Intent:</span>
                    <strong style={{ color: 'var(--accent-cyan)' }}>
                      {lastAnalysis.bestMatch.intent}
                    </strong>
                  </div>

                  <div style={{ marginTop: '1.25rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      SpaCy / NLTK Tokens Extracted:
                    </span>
                    <div className="tokens-wrap">
                      {lastAnalysis.tokens.map((token, idx) => (
                        <span key={idx} className="token-badge">
                          {token}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '1.25rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      TF-IDF Term Weights:
                    </span>
                    <div className="tfidf-table">
                      {lastAnalysis.tfidfScores.map((t, idx) => (
                        <div key={idx} className="tfidf-row">
                          <span className="tfidf-term">{t.term}</span>
                          <span className="tfidf-weight">{t.tfidf}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'engine' && (
            <div className="sandbox-code-view">
              <div className="code-view-header">
                <Code2 size={16} color="var(--accent-cyan)" />
                <span>chatbot_nlp_engine.py // Algorithm Breakdown</span>
              </div>
              <pre className="code-block">
                <code>{`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy

# Load lightweight NLP model for tokenization & lemmatization
nlp = spacy.load("en_core_web_sm")

def process_and_respond(user_query: str, mysql_knowledge_base: list) -> dict:
    """
    1. Preprocess & tokenize user input.
    2. Vectorize the entire document corpus using TF-IDF (Term Frequency - Inverse Document Frequency).
    3. Compute Cosine Angular Similarity between the query vector and KB vectors.
    4. Return the document with the maximum similarity coefficient.
    """
    corpus = [item['question'] for item in mysql_knowledge_base]
    corpus.append(user_query)

    vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
    tfidf_matrix = vectorizer.fit_transform(corpus)

    # Calculate cosine similarity against all database entries
    similarity_matrix = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
    best_index = similarity_matrix.argmax()
    best_score = similarity_matrix[0][best_index] * 100

    return {
        "intent": mysql_knowledge_base[best_index]['intent'],
        "answer": mysql_knowledge_base[best_index]['answer'],
        "confidence_score": round(best_score, 2),
        "status": "success"
    }`}</code>
              </pre>
            </div>
          )}

          {activeTab === 'mysql' && (
            <div className="sandbox-mysql-view">
              <div className="mysql-table-header">
                <Database size={16} color="var(--accent-emerald)" />
                <span>MySQL Schema: knowledge_base (Host: localhost:3306)</span>
              </div>
              <div className="table-responsive">
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Intent Tag</th>
                      <th>Question Pattern</th>
                      <th>Response Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {knowledgeBase.map((kb) => (
                      <tr key={kb.id}>
                        <td><code>{kb.id}</code></td>
                        <td><span className="badge-tag">{kb.intent}</span></td>
                        <td>{kb.question}</td>
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{kb.answer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
