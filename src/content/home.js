// ─────────────────────────────────────────────────────────────
// Home page content. Copied verbatim from the original Home.jsx.
// CONTENT FREEZE: do not edit strings here without the owner's consent.
// ─────────────────────────────────────────────────────────────

export const HERO = {
  availability: 'Graduated 2026 · Open to Full-Time & Internship Opportunities',
  firstName: 'Tejas',
  lastName: 'Bhise',
  roleLead: 'Python Backend ',
  roleAccent: '& AI Engineer',
  intro:
    'Building AI-powered backend systems using Python, FastAPI, and LLMs. Focused on developing practical, scalable solutions for real-world problems.',
  primaryCta: 'View All Projects',
  secondaryCta: 'Download Resume',
};


export const RECOGNITION = {
  titleLead: 'Recognition ',
  titleAccent: '& Impact',
  subtitle: 'Achievements that demonstrate innovation, leadership, and commitment to excellence',
  items: [
    {
      icon: 'book',
      title: 'IEEE Research Publication',
      subtitle: 'FedShield · IEEE ICCUBEA 2026',
      description:
        'FedShield — Secure Federated Learning with Anomaly-Based Defense — published in IEEE ICCUBEA 2026 and indexed on IEEE Xplore.',
      detail: 'DOI: 10.1109/ICCUBEA69821.2026.11702140',
      href: 'https://ieeexplore.ieee.org/document/11702140',
    },
    {
      icon: 'award',
      title: 'Copyright Holder',
      subtitle: 'Local E-Connect',
      description:
        'Platform designed to empower small local vendors by connecting them with broader markets and customers, helping increase their sales and business growth',
      detail: 'Reg. No: L-133251/2023 · Copyright Office, Government of India',
    },
    {
      icon: 'star',
      title: 'AI Agent Engineer Hackathon Finalist',
      subtitle: 'Yophoria Innovation Challenge 2025',
      description:
        "Recognized for reaching the Grand Finale of India's premier AI Innovation Challenge focused on solving real-world problems in AI Agent Engineering",
      detail: 'Organized by YoLearn.ai & GLA University',
    },
    {
      icon: 'users',
      title: 'Student Ambassador',
      subtitle: 'LetsUpgrade Community',
      description:
        'Served as Student Ambassador, achieving 30% increase in event participation by organizing technical workshops that reached 1000+ students',
      detail: 'Gold Badge • Jul 2024 - Aug 2024',
    },
  ],
};

export const FEATURED = {
  title: 'Featured Projects',
  subtitle: 'AI-powered applications solving real-world challenges',
  cta: 'View All Projects',
  projects: [
    {
      slug: 'clarifaisql',
      title: 'ClarifaiSQL',
      status: 'Completed',
      tagline:
        'AI-powered natural language to SQL converter with comprehensive explanations and instant results',
      technologies: ['Next.js 15', 'TypeScript', 'FastAPI', 'Python'],
      deployment: 'Vercel (Frontend) & Render (Backend)',
      challenge:
        'Non-technical users struggle to query databases without SQL knowledge, creating barriers to data access and insights.',
      solution:
        'Built a comprehensive system that converts natural language to SQL, provides detailed explanations, shows the generated query, and returns instant results—all in one interface.',
      featuresLabel: 'Key Features',
      features: [
        'Three-in-one output: SQL query, AI explanation, and direct results',
        'CSV drag-and-drop for instant database creation',
        'Real-time natural language to SQL conversion',
        'Automated schema detection with Google Gemini API',
        'Educational approach helping users learn SQL through AI explanations',
      ],
    },
    {
      slug: 'saarthi',
      title: 'Saarthi',
      status: 'Completed',
      tagline:
        '24/7 real-time 3D AI tutor that provides immersive, LLM-powered learning support through voice and text, designed for students who cannot afford private coaching.',
      technologies: [
        'React',
        'Three.js',
        'FastAPI',
        'WebSocket',
        'Redis',
        'PostgreSQL',
        'Google Gemini API',
        'STT/TTS',
      ],
      deployment: 'Vercel (Frontend) & production-ready backend with live API endpoints',
      challenge:
        'Many students cannot afford private coaching classes and often get stuck during self-study with nobody to answer their doubts. This slows progress, weakens fundamentals, and reduces confidence over time.',
      solution:
        'Built a 24/7 real-time AI tutoring platform where a 3D virtual mentor answers questions over WebSockets, maintains conversation context in Redis, stores history in PostgreSQL, and delivers clear, step-by-step explanations through both voice and text.',
      featuresLabel: 'Technical Features',
      features: [
        'Real-time, multi-turn tutoring sessions over WebSockets with 24/7 availability from the browser.',
        'Redis-backed session memory and PostgreSQL storage for context-aware conversations and persistent session history.',
        'End-to-end AI pipeline: Speech-to-Text → prompt structuring → Gemini reasoning → response post-processing → Text-to-Speech → 3D avatar lip-sync.',
        'Three.js 3D tutor with dual interaction modes (voice chat + text chat) and early analytics layer for tracking sessions and learning patterns.',
      ],
    },
  ],
};

export const COMPETENCIES = {
  titleLead: 'Core ',
  titleAccent: 'Competencies',
  subtitle: 'Technical expertise and development capabilities',
  items: [
    {
      icon: 'server',
      title: 'Backend & AI Development',
      subtitle: 'Building scalable APIs and AI-powered applications',
      skills: [
        'Python & SQL',
        'FastAPI Framework',
        'RESTful API Design',
        'Google Gemini API',
        'Prompt Engineering',
        'LLM Applications',
      ],
    },
    {
      icon: 'chart',
      title: 'Data Science & ML',
      subtitle: 'Data analysis and machine learning fundamentals',
      skills: [
        'NumPy & Pandas',
        'scikit-learn',
        'Matplotlib & Seaborn',
        'Exploratory Data Analysis',
        'Model Training & Evaluation',
        'PyTorch & Federated Learning',
      ],
    },
    {
      icon: 'cloud',
      title: 'Development Tools',
      subtitle: 'Version control and cloud deployment',
      skills: ['Git & GitHub', 'AWS, Vercel & Render', 'Cursor & Antigravity', 'Jupyter Notebook', 'Google Colab'],
    },
  ],
};

export const CTA = {
  title: "Let's Build Something Great Together",
  body:
    'Actively seeking full-time roles and internships in AI, backend development, and data science. Open to opportunities in India and internationally, including Japan.',
  primary: 'Get In Touch',
  secondary: 'View Resume',
};
