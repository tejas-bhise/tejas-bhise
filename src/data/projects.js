// src/data/projects.js

export const PROJECTS = [
  {
    id: 1,
    title: "ClarifAiSQL",
    status: "Completed",
    tagline: "AI-powered natural language to SQL converter with comprehensive explanations and instant results",
    description: "Full-stack application that converts plain English to executable SQL queries, providing educational explanations and instant results.",
    technologies: ["Next.js 15", "TypeScript", "FastAPI", "Python", "Google Gemini API"],
    github: "https://github.com/tejasbhise/clarifaisql",
    live: "https://clarifaisql.vercel.app",
    image: null,
    challenge: "Non-technical users struggle to query databases without SQL knowledge, creating barriers to data access and insights.",
    solution: "Built a comprehensive system that converts natural language to SQL, provides detailed explanations, shows the generated query, and returns instant results—all in one interface.",
    features: [
      "Three-in-one output: SQL query, AI explanation, and direct results",
      "CSV drag-and-drop for instant database creation",
      "Real-time natural language to SQL conversion",
      "Automated schema detection with Google Gemini API",
      "Educational approach helping users learn SQL through AI explanations"
    ],
    deployment: "Vercel (Frontend) & Render (Backend)"
  },
  {
    id: 2,
    title: "Saarthi",
    status: "Completed",
    tagline: "AI Learning Companion - Making quality education accessible through immersive 3D AI tutoring",
    description: "3D AI tutoring platform with voice-based learning and real-time collaboration tools to help students who cannot afford private coaching.",
    technologies: ["Three.js", "Google Gemini API", "Node.js", "WebRTC", "Ready Player Me"],
    github: "https://github.com/tejasbhise/saarthi",
    live: "https://saarthi-ai.vercel.app",
    image: null,
    challenge: "Many students cannot afford private coaching classes and lack immediate assistance when doubts arise during self-study, hindering their learning progress.",
    solution: "Created an accessible 3D AI tutor that provides instant doubt resolution through both voice and text interactions, offering personalized learning support anytime, anywhere.",
    features: [
      "Interactive 3D avatar tutors with realistic lip-sync animation",
      "Dual interaction modes: voice chat and text messaging",
      "Real-time AI responses powered by Google Gemini 2.0 API",
      "Collaborative whiteboard for visual learning and problem-solving",
      "Session recording for review and continuous learning"
    ],
    deployment: "Vercel (Frontend) & Render (Backend)"
  },
  {
    id: 3,
    title: "Local E-Connect",
    status: "Copyright Holder",
    tagline: "Empowering local vendors through digital marketplace connection",
    description: "Platform designed to empower small local vendors by connecting them with broader markets and customers.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    github: null,
    live: null,
    image: null,
    challenge: "Small local vendors struggle to reach broader markets and compete with larger businesses online.",
    solution: "Built a digital marketplace platform specifically designed for local vendors to showcase products and connect with customers.",
    features: [
      "Vendor registration and profile management",
      "Product listing and categorization",
      "Customer discovery and connection features",
      "Sales tracking and analytics",
      "Mobile-responsive design for accessibility"
    ],
    deployment: "Copyright Registration No: L-133251/2023"
  }
];
