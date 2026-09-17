export const portfolioData = {
  personal: {
    name: "SUMMIAYA L",
    shortName: "Summiaya",
    title: "Full Stack Developer",
    badge: "FULL STACK DEVELOPER",
    location: "Hosur, Tamil Nadu, India",
    phone: "6369682663",
    email: "summiayasummiaya2004@gmail.com",
    linkedin: "linkedin.com/in/summiaya-1-25210a299",
    linkedinUrl: "https://www.linkedin.com/in/summiaya-1-25210a299",
    github: "github.com/c22ug152cap073",
    githubUrl: "https://github.com/c22ug152cap073",
    heroHeading: "Building Modern Web Experiences with Code & Creativity.",
    heroHighlight: "Full Stack Developer",
    heroSummary:
      "Motivated MCA student with hands-on experience building responsive web applications, RESTful APIs, and database-driven solutions using React.js, Python, Django, and MySQL.",
    status: "Available for Software Developer Roles & Internships"
  },

  about: {
    title: "About Me",
    subtitle: "Passionate about building scalable web applications and clean digital interfaces.",
    paragraphs: [
      "Motivated and detail-oriented MCA student with hands-on experience in full-stack web development, specializing in React.js, Python, Django, Django REST Framework, and MySQL.",
      "Proficient in designing responsive user interfaces, developing RESTful APIs, and building scalable web applications that enhance user experience.",
      "Strong passion for problem-solving and continuous learning drives a commitment to delivering high-quality software solutions. Eager to leverage technical expertise in a dynamic environment while pursuing professional growth as a Software Developer."
    ],
    highlights: [
      {
        id: "fullstack",
        title: "Full Stack Development",
        description: "End-to-end web architecture from responsive React frontends to robust Django backends.",
        icon: "Layers"
      },
      {
        id: "restapi",
        title: "REST API Development",
        description: "Designing, building, and integrating clean RESTful endpoints using Django REST Framework.",
        icon: "Network"
      },
      {
        id: "database",
        title: "Database Management",
        description: "Relational database modeling, query optimization, and structured storage with MySQL.",
        icon: "Database"
      },
      {
        id: "responsive",
        title: "Responsive Web Design",
        description: "Crafting modern, accessible, and device-agnostic interfaces using HTML5, CSS3, and JavaScript.",
        icon: "Layout"
      }
    ]
  },

  skills: {
    categories: [
      {
        id: "frontend",
        name: "Frontend",
        icon: "Layout",
        skills: [
          { name: "React.js", category: "frontend" },
          { name: "HTML", category: "frontend" },
          { name: "CSS", category: "frontend" },
          { name: "JavaScript", category: "frontend" },
          { name: "Responsive Web Design", category: "frontend" }
        ]
      },
      {
        id: "backend",
        name: "Backend",
        icon: "Server",
        skills: [
          { name: "Python", category: "backend" },
          { name: "Django", category: "backend" },
          { name: "Django REST Framework", category: "backend" },
          { name: "Node.js", category: "backend" },
          { name: "REST APIs", category: "backend" },
          { name: "API Integration", category: "backend" }
        ]
      },
      {
        id: "database",
        name: "Databases",
        icon: "Database",
        skills: [
          { name: "MySQL", category: "database" },
          { name: "MongoDB", category: "database" }
        ]
      },
      {
        id: "ai_nlp",
        name: "AI / NLP",
        icon: "Cpu",
        skills: [
          { name: "NLTK", category: "ai_nlp" },
          { name: "SpaCy", category: "ai_nlp" },
          { name: "scikit-learn", category: "ai_nlp" },
          { name: "TF-IDF", category: "ai_nlp" },
          { name: "Cosine Similarity", category: "ai_nlp" }
        ]
      },
      {
        id: "tools",
        name: "Tools",
        icon: "Wrench",
        skills: [
          { name: "Git", category: "tools" },
          { name: "GitHub", category: "tools" }
        ]
      }
    ]
  },

  experience: [
    {
      id: "jrm-infotech",
      role: "Web Developer Intern",
      company: "JRM Infotech",
      location: "Hosur, India",
      period: "March 2026 – Present",
      type: "Internship",
      keyTechnologies: ["Python", "Django", "Django REST Framework", "MySQL", "Git", "GitHub", "HTML", "CSS", "JavaScript"],
      responsibilities: [
        "Built and integrated RESTful APIs using Python, Django, and Django REST Framework for seamless front-end and back-end communication.",
        "Worked with MySQL to design, query, and manage relational databases efficiently.",
        "Collaborated with the development team using Git and GitHub for version control and project management.",
        "Debugged, tested, and optimized web applications to improve performance, functionality, and user experience.",
        "Partnered with designers to implement responsive website layouts.",
        "Developed user-friendly web applications using HTML, CSS, and JavaScript."
      ]
    }
  ],

  projects: [
    {
      id: "chatverse",
      title: "ChatVerse – AI-Powered Chatbot",
      type: "NLP & Full Stack Application",
      description:
        "Developed an NLP-based AI chatbot using Python and Django, implementing TF-IDF and Cosine Similarity for intelligent response generation with a MySQL-backed knowledge base.",
      technologies: [
        "Python",
        "Django",
        "MySQL",
        "NLTK",
        "SpaCy",
        "scikit-learn",
        "TF-IDF",
        "Cosine Similarity",
        "HTML",
        "CSS",
        "Bootstrap",
        "JavaScript"
      ],
      highlights: [
        "Natural Language Processing pipeline leveraging NLTK and SpaCy tokenization and preprocessing",
        "Intelligent document matching using TF-IDF vectorization and Cosine Similarity algorithms",
        "MySQL-backed dynamic knowledge base for scalable question-answer pair storage",
        "Clean web-based interface built with Bootstrap, CSS, and JavaScript"
      ],
      codeSnippet: {
        filename: "chatbot_engine.py",
        language: "python",
        code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy

nlp = spacy.load("en_core_web_sm")

def get_best_response(user_query, knowledge_base):
    # Process text & compute similarity
    corpus = [item['question'] for item in knowledge_base]
    corpus.append(user_query)
    
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(corpus)
    
    # Calculate cosine similarity with user query
    sim_scores = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
    best_idx = sim_scores.argmax()
    
    return knowledge_base[best_idx]['answer']`
      }
    },
    {
      id: "college-brochure",
      title: "College Brochure Website",
      type: "Frontend & Full Stack Web App",
      description:
        "Developed and deployed a responsive college brochure website using React.js and Node.js with reusable UI components, successfully hosted on the Adhiyamaan College server.",
      technologies: [
        "React.js",
        "Node.js",
        "HTML",
        "CSS",
        "JavaScript"
      ],
      highlights: [
        "Architected modular, reusable UI components in React.js for course catalogs and campus details",
        "Implemented a fully responsive design guaranteeing optimal viewing across desktops, tablets, and phones",
        "Node.js backend integration for dynamic routing and content delivery",
        "Production deployment and hosting on the institutional Adhiyamaan College server environment"
      ],
      codeSnippet: {
        filename: "BrochureCatalog.jsx",
        language: "javascript",
        code: `import React, { useState } from 'react';

export const DepartmentGrid = ({ departments }) => {
  const [selectedDept, setSelectedDept] = useState(null);

  return (
    <div className="dept-grid">
      {departments.map((dept) => (
        <article 
          key={dept.id} 
          className="dept-card"
          onClick={() => setSelectedDept(dept)}
        >
          <span className="badge">{dept.code}</span>
          <h3>{dept.name}</h3>
          <p>{dept.overview}</p>
        </article>
      ))}
    </div>
  );
};`
      }
    }
  ],

  education: [
    {
      id: "mca",
      degree: "Master of Science: Computer Applications",
      institution: "Adhiyamaan Engineering College",
      location: "Hosur, Krishnagiri, Tamil Nadu",
      period: "Expected July 2028",
      status: "In Progress",
      icon: "GraduationCap"
    },
    {
      id: "bca",
      degree: "Bachelor of Science: Computer Applications",
      institution: "St. Joseph's College of Arts and Science for Women",
      location: "Hosur, Krishnagiri, Tamil Nadu",
      period: "Expected December 2026",
      status: "In Progress",
      icon: "BookOpen"
    }
  ],

  certifications: [
    {
      id: "cert-1",
      title: "Embedded Systems Program",
      issuer: "D-I-Y-A",
      icon: "Cpu"
    },
    {
      id: "cert-2",
      title: "Exploring Cyber Security Tools for Digital Protection",
      issuer: "Professional Cybersecurity Training",
      icon: "ShieldCheck"
    },
    {
      id: "cert-3",
      title: "Certified Python Course",
      issuer: "Apollo Computer Educations",
      icon: "Code2"
    }
  ],

  languages: [
    { name: "English", code: "EN" },
    { name: "Tamil", code: "TA" },
    { name: "Urdu", code: "UR" },
    { name: "Hindi", code: "HI" }
  ],

  contact: {
    heading: "Let's Build Something Meaningful.",
    subheading: "I'm always interested in learning, building, and contributing to meaningful software projects.",
    info: {
      email: "summiayasummiaya2004@gmail.com",
      phone: "6369682663",
      location: "Hosur, Tamil Nadu, India",
      linkedin: "linkedin.com/in/summiaya-1-25210a299",
      linkedinUrl: "https://www.linkedin.com/in/summiaya-1-25210a299",
      github: "github.com/c22ug152cap073",
      githubUrl: "https://github.com/c22ug152cap073"
    }
  },

  footer: {
    name: "SUMMIAYA L",
    role: "Full Stack Developer",
    quote: "Building, learning, and growing through technology.",
    copyrightYear: 2026
  }
};
