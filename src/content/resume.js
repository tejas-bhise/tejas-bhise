// ─────────────────────────────────────────────────────────────
// Resume content — synced with the latest resume PDF
// (public/Tejas_Bhise.pdf, Nov 2026). Where the PDF and the earlier
// site disagreed, the PDF wins. Items the one-page PDF omits but that
// were on the site (HSC/SSC, Student Ambassador, extra certifications)
// are kept.
// ─────────────────────────────────────────────────────────────

export const PUBLICATION = {
  label: 'IEEE Research Publication',
  title: 'FedShield – Secure Federated Learning with Anomaly-Based Defense',
  venue: 'IEEE ICCUBEA 2026',
  indexed: 'Indexed on IEEE Xplore',
  doi: '10.1109/ICCUBEA69821.2026.11702140',
  doiUrl: 'https://doi.org/10.1109/ICCUBEA69821.2026.11702140',
  xploreId: '11702140',
  xploreUrl: 'https://ieeexplore.ieee.org/document/11702140',
};

export const RESUME_PAGE = {
  name: 'Tejas Bhise',
  role: 'Python Backend Engineer & AI Developer',
  downloadTop: 'Download PDF Resume',
  downloadBottom: 'Download Complete Resume (PDF)',
  summaryTitle: 'Professional Summary',
  summary:
    'Python Backend Engineer & AI Developer with a strong interest in building scalable APIs and AI-powered applications that address real-world problems. Experienced in FastAPI and LLM integration, and committed to writing clean, maintainable code while continuously learning and improving as an engineer.',
  sections: {
    publication: 'Research Publication',
    skills: 'Technical Skills',
    education: 'Academic Journey',
    experience: 'Professional Experience',
    projects: 'Featured Projects',
    achievements: 'Achievements & Recognition',
    certifications: 'Certifications',
  },
};

export const contactInfo = [
  { icon: 'Globe', label: 'Portfolio', href: 'https://tejas-bhise.vercel.app' },
  { icon: 'Mail', label: 'Email', href: 'mailto:tejasbhise1013@gmail.com' },
  { icon: 'Github', label: 'GitHub', href: 'https://github.com/tejas-bhise' },
  { icon: 'Linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/tejas-bhise' },
];

export const skillCategories = [
  { title: 'LANGUAGES', icon: 'Code', skills: ['Python', 'SQL', 'JavaScript', 'TypeScript'] },
  { title: 'AI', icon: 'Zap', skills: ['LLMs', 'Generative AI', 'Prompt Engineering', 'Google Gemini API'] },
  {
    title: 'ML',
    icon: 'Brain',
    skills: ['Supervised Learning', 'Data Preprocessing', 'Model Evaluation', 'scikit-learn', 'PyTorch'],
  },
  { title: 'BACKEND & APIs', icon: 'Shield', skills: ['FastAPI', 'REST APIs', 'WebSocket', 'API Integration'] },
  {
    title: 'DATA & ANALYTICS',
    icon: 'Target',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Data Analysis', 'Data Visualization'],
  },
  { title: 'DATABASES', icon: 'Database', skills: ['MySQL', 'PostgreSQL', 'Redis'] },
  { title: 'CLOUD & DEPLOYMENT', icon: 'Cloud', skills: ['AWS', 'Vercel', 'Render'] },
  { title: 'FRONTEND', icon: 'Rocket', skills: ['React', 'Next.js 15', 'Three.js', 'TailwindCSS'] },
  {
    title: 'DEVELOPMENT TOOLS',
    icon: 'Briefcase',
    skills: ['Git', 'GitHub', 'Cursor', 'Antigravity', 'Jupyter Notebook', 'Google Colab'],
  },
];

export const education = [
  {
    degree: 'B.E. in Computer Science',
    institution: "PCET's Nutan Maharashtra Institute of Engineering and Technology",
    location: 'Pune, Maharashtra',
    duration: '2022 – 2026',
    status: 'Graduated 2026',
    university: 'Savitribai Phule Pune University (SPPU)',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Dr. D.Y.Patil Arts, Commerce & Science Junior College',
    location: 'Pune, Maharashtra',
    duration: '2020 – 2022',
    score: '65.00%',
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Jai Hind High School',
    location: 'Pune, Maharashtra',
    duration: '2019 – 2020',
    score: '76.00%',
  },
];

export const experience = [
  {
    role: 'AI / ML Intern',
    company: 'InternPe',
    location: 'Remote',
    duration: 'Dec 2024 – Jan 2025',
    type: 'Internship',
    responsibilities: [
      'Applied supervised learning, data preprocessing, and model evaluation techniques using scikit-learn.',
      'Trained and evaluated classification models using standard performance metrics.',
    ],
  },
  {
    role: 'Student Ambassador',
    company: 'LetsUpgrade',
    location: 'Remote',
    duration: 'Jul 2024 – Aug 2024',
    type: 'Leadership',
    responsibilities: [
      'Organized 5+ technical workshops and facilitated communication with 1000+ students, resulting in a 30% increase in event participation',
      'Promoted workshops through WhatsApp and Telegram groups, collaborating with fellow ambassadors to drive student engagement',
    ],
  },
];

export const featuredProjects = [
  {
    name: 'FedShield – Secure Federated Learning with Anomaly-Based Defense',
    tech: 'Python, PyTorch, ResNet-18, CIFAR-10, SVHN (OOD), Federated Learning',
    icon: 'Shield',
    badge: 'Published · IEEE ICCUBEA 2026',
    highlights: [
      'Developed a federated learning defense framework that inspects client model updates before aggregation to detect malicious updates associated with backdoor and poisoning attacks.',
      'Engineered a dual-signal Guardian Layer combining behavioral shift analysis on an OOD SVHN proxy dataset with last-layer gradient analysis to compute client trust scores and reject suspicious updates.',
      'Assessed BadNets, model replacement, and label-flipping attacks across 5 clients; achieved 100% malicious-client detection in evaluated scenarios and reduced backdoor accuracy to 3.5%.',
    ],
  },
  {
    name: 'Saarthi – Real-Time 3D AI Tutor Platform',
    tech: 'React, Three.js, FastAPI, WebSocket, Redis, PostgreSQL, Google Gemini',
    icon: 'Rocket',
    highlights: [
      'Built a real-time AI tutoring platform that enables students to ask questions and receive spoken responses from an interactive 3D AI tutor.',
      'Engineered an end-to-end voice AI pipeline (Speech-to-Text → Gemini API → Text-to-Speech → 3D avatar lip-sync) for real-time interaction.',
      'Integrated WebSocket, Redis, and PostgreSQL for real-time communication, session memory, and persistent data storage, with an analytics dashboard for learning activity.',
    ],
  },
  {
    name: 'ClarifaiSQL – Natural Language to SQL Converter',
    tech: 'Next.js, TypeScript, FastAPI, Python, Gemini API, SQLite',
    icon: 'Zap',
    highlights: [
      'Created a full-stack AI application that converts natural-language questions about uploaded CSV data into executable SQL queries with explanations and results.',
      'Built a FastAPI backend that creates an in-memory SQLite database, builds prompts using the uploaded schema and user question, and uses Gemini to generate SQL queries.',
      'Integrated an interactive Next.js interface for CSV upload, natural-language querying, real-time execution, and result visualization.',
    ],
  },
  {
    name: 'Operis – AI Operational Decision Intelligence',
    tech: 'FastAPI, PostgreSQL, SQLAlchemy, LLM APIs',
    icon: 'Brain',
    highlights: [
      'Built signal aggregation pipeline combining operational data from multiple sources into structured decision insights',
      'Designed scoring logic to prioritize signals requiring attention using rule-based evaluation cycles',
      'Integrated LLM summarization layer to convert operational activity into clear executive-level insights',
    ],
  },
];

export const certifications = [
  { name: 'Machine Learning Model Deployment with FastAPI', issuer: 'Udemy', icon: 'Rocket' },
  { name: 'Python for Data Science', issuer: 'Udemy', icon: 'BookOpen' },
  { name: 'ChatGPT Generative AI', issuer: 'Udemy', icon: 'Zap' },
  { name: 'AI for All', issuer: 'Infosys', icon: 'Target' },
];

export const achievements = [
  {
    icon: 'BookOpen',
    title: 'IEEE Research Publication',
    subtitle: 'FedShield · IEEE ICCUBEA 2026',
    description: 'FedShield published in IEEE ICCUBEA 2026 and indexed on IEEE Xplore.',
    badge: 'DOI: 10.1109/ICCUBEA69821.2026.11702140',
    href: 'https://ieeexplore.ieee.org/document/11702140',
    featured: true,
  },
  {
    icon: 'Award',
    title: 'Copyright Registration',
    subtitle: 'Local E-Connect · Copyright Office, Government of India',
    description:
      'Copyright registered for a concept focused on improving digital visibility, market access, and sales opportunities for small local vendors',
    badge: 'Registration No.: L-133251/2023',
  },
  {
    icon: 'Star',
    title: 'AI Agent Engineer Hackathon Finalist',
    subtitle: 'Yophoria Innovation Challenge 2025',
    description:
      "Recognized for reaching the Grand Finale of India's premier AI Innovation Challenge focused on solving real-world problems in AI Agent Engineering",
    badge: 'Organized by YoLearn.ai & GLA University',
  },
  {
    icon: 'Users',
    title: 'Student Ambassador',
    subtitle: 'LetsUpgrade Community',
    description: 'Achieved 30% increase in event participation by organizing technical workshops that reached 1000+ students',
    badge: 'Gold Badge • Jul 2024 - Aug 2024',
  },
];
