import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Github,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Calendar,
  Users,
  Award,
  Zap,
  Target,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Lock,
  Code2,
  Server,
  Monitor,
  Brain,
  BarChart3,
  Network,
  Database,
  Cloud,
  GitBranch,
} from "lucide-react";
import { useState, useRef } from "react";
import PageWrapper from "../components/PageWrapper";

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

// Main white card — light black border always visible
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl bg-[#F8FAFC] border border-slate-300 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-slate-400 hover:shadow-[0_8px_32px_rgba(79,70,229,0.14)] ${className}`}
  >
    {children}
  </div>
);

// Inner colored blocks
const InnerBlock = ({ children, theme = "neutral", className = "" }) => {
  const themes = {
    neutral: "bg-slate-100 border-slate-300",
    orange:  "bg-orange-100 border-orange-300",
    emerald: "bg-emerald-100 border-emerald-300",
    blue:    "bg-blue-100 border-blue-300",
    purple:  "bg-purple-100 border-purple-300",
    cyan:    "bg-cyan-100 border-cyan-300",
    amber:   "bg-amber-100 border-amber-300",
    yellow:  "bg-yellow-100 border-yellow-300",
    violet:  "bg-violet-100 border-violet-300",
    teal:    "bg-teal-100 border-teal-300",
  };
  return (
    <div className={`${themes[theme]} rounded-xl p-5 border ${className}`}>
      {children}
    </div>
  );
};

// Unified neutral sub-item box (same style everywhere)
const SubItem = ({ children, className = "" }) => (
  <div className={`bg-white border border-slate-200 rounded-lg p-3 text-xs font-medium text-slate-700 leading-relaxed ${className}`}>
    {children}
  </div>
);

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Neutral tech pill — same light-black in all project cards
const TechPill = ({ tech }) => (
  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-300 rounded-lg text-xs font-medium hover:bg-slate-200 hover:text-slate-800 transition-colors cursor-default">
    {tech}
  </span>
);

const Projects = ({ setPage }) => {
  const [expandedProject, setExpandedProject] = useState(null);
  const toggleProject = (id) =>
    setExpandedProject(expandedProject === id ? null : id);

  const completedProjects = [
    {
      id: 1,
      title: "ClarifAiSQL",
      type: "Personal Project • Self-Developed",
      tagline:
        "Enabling non-technical users to query databases using plain English instead of SQL.",
      technologies: ["Python", "FastAPI", "Google Gemini API", "SQL", "JavaScript", "React"],
      github: "https://github.com/tejas-bhise/ClarifaiSQL",
      githubPrivate: false,
      live: "https://clarifaisql.vercel.app",
      status: "Deployed & Maintained",
      gradient: "from-cyan-500 to-blue-500",
      problem:
        "Non-technical users struggle to access database information because writing SQL queries requires technical expertise.",
      solution:
        "Developed a web application that converts natural language into SQL, displays the generated query with AI-powered explanation, and returns instant results.",
      myRole: [
        "Designed and developed the full-stack application from scratch.",
        "Designed RESTful APIs and handled backend logic using FastAPI.",
        "Integrated Google Gemini API for natural language to SQL conversion.",
        "Implemented CSV upload and automatic database/table creation.",
        "Deployed frontend on Vercel and backend on Render.",
      ],
      technicalChallenge:
        "Implemented dynamic schema extraction from uploaded CSV files to generate accurate SQL queries.",
      impact: "Used for demonstrations and peer testing.",
      features: [
        "Natural language to SQL query conversion.",
        "CSV upload with automatic database creation.",
        "AI-powered query explanations.",
        "Real-time query execution and results display.",
        "User-friendly interface for non-technical users.",
        "Drag-and-drop file upload functionality.",
      ],
    },
    {
      id: 2,
      title: "Saarthi",
      type: "Personal Project • Self-Developed",
      tagline:
        "Expanding access to quality learning through a 24/7, real-time 3D AI tutor for students who cannot afford private coaching.",
      technologies: ["React", "Three.js", "FastAPI", "WebSocket", "Redis", "PostgreSQL", "Google Gemini API", "STT/TTS services"],
      github: null,
      githubPrivate: true,
      live: "https://saarthi-ai-iota.vercel.app",
      status: "Deployed • Production-ready backend",
      gradient: "from-purple-500 to-pink-500",
      problem:
        "Many school and college students cannot afford private coaching, and during self-study they often get stuck on doubts with nobody to ask. This leads to slow progress, weak fundamentals, and loss of confidence over time.",
      solution:
        "Saarthi is a real-time AI tutoring platform where students interact with a 3D virtual tutor available 24/7. The system uses WebSockets for low-latency conversations, Redis for session memory, PostgreSQL for persistent history, and a structured LLM pipeline to deliver clear, step-by-step explanations through both voice and text.",
      myRole: [
        "Designed the end-to-end architecture for the real-time AI tutoring platform.",
        "Built FastAPI backend services with WebSocket endpoints, Redis session store, and PostgreSQL persistence.",
        "Engineered a structured prompt workflow around Google Gemini API for academic Q&A.",
        "Implemented the full voice pipeline: STT → prompt structuring → Gemini → TTS → 3D avatar lip sync.",
        "Developed the React + Three.js frontend with interactive 3D tutor and chat interface.",
        "Created analytics views to track sessions and learning progress.",
      ],
      technicalChallenge:
        "Synchronizing streaming voice input, LLM responses, and 3D avatar lip-sync animations over WebSocket, while keeping conversation context consistent across Redis and PostgreSQL without blocking real-time UX.",
      impact:
        "Demonstrates ability to design and ship a production-style AI system combining LLM workflows, real-time communication, stateful backends, and 3D UX. Full walkthrough available on request.",
      features: [
        "Real-time tutoring sessions over WebSockets with 24/7 access.",
        "Redis-backed session memory for context-aware conversations.",
        "PostgreSQL storage for session logs and analytics.",
        "Full voice pipeline: STT, Gemini reasoning, TTS output.",
        "3D tutor avatar with lip-sync animations tied to audio.",
        "Dual modes: voice chat and text chat.",
        "Analytics layer for session counts and learning patterns.",
      ],
    },
  ];

  const academicProject = {
    id: 3,
    title: "FedShield",
    subtitle: "Enhancing Security in Federated Learning through Anomaly-Based Backdoor Detection",
    type: "Final Year Project",
    tagline:
      "Detecting and preventing stealthy backdoor attacks in federated learning systems to ensure secure and trustworthy collaborative AI.",
    technologies: ["Python", "Federated Learning (Flower)", "PyTorch/TensorFlow", "CNN", "Anomaly Detection", "CIFAR-10", "MNIST", "Streamlit"],
    status: "In Development",
    supervisor: "Prof. Rahul Patil",
    expectedCompletion: "2026",
    recognition: "Novel functional-analysis-based defense mechanism proposed as core contribution.",
    gradient: "from-orange-500 to-red-500",
    problem:
      "Federated learning models can be secretly poisoned with hidden backdoors while appearing accurate, making them unsafe and unreliable.",
    solution:
      "Designing and implementing a novel functional-analysis-based defense mechanism to detect anomalous model updates and prevent backdoor attacks in federated learning environments.",
    myRole: [
      "Contributing to backend implementation and system architecture.",
      "Designing anomaly-based Guardian defense mechanism.",
      "Implementing backdoor attack (BadNets) for experimental evaluation.",
      "Developing experimental pipeline for performance analysis.",
    ],
    progress: [
      "Federated learning baseline system designed.",
      "Anomaly-based Guardian defense design finalized.",
      "Backdoor attack (BadNets) implementation in progress.",
      "Experimental evaluation pipeline defined.",
    ],
  };

  const futureProject = {
    id: 4,
    title: "Prarambh AI",
    subtitle: "Startup ideas to blueprint in 60 sec",
    tagline:
      "Helping founders convert raw startup ideas into validated, execution-ready blueprints within minutes.",
    technologies: ["Python", "FastAPI", "LLM APIs", "JavaScript", "React", "Dashboard UI", "Database TBD"],
    status: "In Progress",
    gradient: "from-blue-500 to-cyan-500",
    purpose:
      "To address the zero-to-one gap where founders fail due to lack of idea validation, strategy, and guidance before building.",
    completed:
      "Frontend dashboard UI designed and implemented with responsive layout and structured workflows.",
    pending:
      "Backend API development, LLM integration, database design, and deployment.",
    live: "https://pararambh-frontend.vercel.app",
    github: "https://github.com/tejas-bhise/pararambh-frontend",
    expectedCompletion: "2026",
  };

  const techStackGrid = [
    { category: "Languages", icon: <Code2 className="w-4 h-4 text-white" />, color: "from-blue-500 to-blue-700", items: ["Python", "JavaScript", "SQL"] },
    { category: "Backend", icon: <Server className="w-4 h-4 text-white" />, color: "from-purple-500 to-purple-700", items: ["FastAPI", "RESTful APIs"] },
    { category: "Frontend", icon: <Monitor className="w-4 h-4 text-white" />, color: "from-cyan-500 to-cyan-700", items: ["React", "Three.js", "Streamlit"] },
    { category: "AI & LLMs", icon: <Brain className="w-4 h-4 text-white" />, color: "from-green-500 to-green-700", items: ["Google Gemini API", "STT/TTS APIs"] },
    { category: "Machine Learning", icon: <BarChart3 className="w-4 h-4 text-white" />, color: "from-indigo-500 to-indigo-700", items: ["PyTorch", "TensorFlow", "CNN", "Anomaly Detection"] },
    { category: "Federated Learning", icon: <Network className="w-4 h-4 text-white" />, color: "from-pink-500 to-pink-700", items: ["Flower Framework"] },
    { category: "Databases", icon: <Database className="w-4 h-4 text-white" />, color: "from-orange-500 to-orange-700", items: ["PostgreSQL", "Redis", "SQLite (in-memory)"] },
    { category: "Deployment", icon: <Cloud className="w-4 h-4 text-white" />, color: "from-emerald-500 to-emerald-700", items: ["Vercel", "Render"] },
    { category: "Version Control", icon: <GitBranch className="w-4 h-4 text-white" />, color: "from-slate-500 to-slate-700", items: ["Git", "GitHub"] },
  ];

  const isAnyCompletedExpanded = completedProjects.some((p) => p.id === expandedProject);

  return (
    <PageWrapper>
      <div className="min-h-screen w-full bg-[#0F172A] font-sans">
        <section className="pt-28 pb-16">
          <div className="max-w-5xl mx-auto px-6">

            {/* ── HEADER ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-lg mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">My Projects</h1>
              <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
                AI-powered applications and full-stack solutions built with modern technologies.
              </p>
            </motion.div>

            {/* ── COMPLETED PROJECTS ── */}
            <div className={`grid gap-6 mb-20 ${isAnyCompletedExpanded ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
              {completedProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  layout
                >
                  <Card className="h-full flex flex-col">
                    <div className="p-6 flex-1 flex flex-col">

                      <div className="flex justify-between items-start mb-4 gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shrink-0`}>
                            <Lightbulb className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 leading-tight">{project.title}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">{project.type}</p>
                          </div>
                        </div>
                        <span className="shrink-0 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 size={10} /> Live
                        </span>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{project.tagline}</p>

                      {/* Tech pills — neutral light-black */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.technologies.map((tech) => (
                          <TechPill key={tech} tech={tech} />
                        ))}
                      </div>

                      <div className="mt-auto space-y-2">
                        <div className="flex gap-2 flex-wrap">
                          <a href={project.live} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors">
                            <ExternalLink size={12} /> Live Demo
                          </a>
                          {project.githubPrivate ? (
                            <div className="relative group/tooltip">
                              <button disabled className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-400 rounded-lg text-xs font-semibold border border-slate-200 cursor-not-allowed">
                                <Lock size={12} /> Private Repo
                              </button>
                              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50">
                                Repository is private due to confidentiality.
                              </div>
                            </div>
                          ) : (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors">
                              <Github size={12} /> GitHub
                            </a>
                          )}
                        </div>
                        <button
                          onClick={() => toggleProject(project.id)}
                          className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 transition-all text-xs font-semibold w-full justify-center rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-100 cursor-pointer"
                        >
                          {expandedProject === project.id ? <> Less Details <ChevronUp size={13} /> </> : <> Details <ChevronDown size={13} /> </>}
                        </button>
                      </div>
                    </div>

                    {/* ── EXPANDED PANEL ── */}
                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-slate-200 pt-5 space-y-4">

                            {/* Problem / Solution */}
                            <div className="grid md:grid-cols-2 gap-3">
                              <InnerBlock theme="orange">
                                <div className="flex items-center gap-2 mb-2">
                                  <Target className="w-3.5 h-3.5 text-orange-500" />
                                  <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider">The Problem</h4>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">{project.problem}</p>
                              </InnerBlock>
                              <InnerBlock theme="emerald">
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">The Solution</h4>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">{project.solution}</p>
                              </InnerBlock>
                            </div>

                            {/* Role — blue block, white sub-items */}
                            <InnerBlock theme="blue">
                              <div className="flex items-center gap-2 mb-3">
                                <Users className="w-3.5 h-3.5 text-blue-600" />
                                <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">My Role & Contributions</h4>
                              </div>
                              <div className="grid md:grid-cols-2 gap-2">
                                {project.myRole.map((role, i) => (
                                  <SubItem key={i}>{role}</SubItem>
                                ))}
                              </div>
                            </InnerBlock>

                            {/* Technical Challenge */}
                            <InnerBlock theme="purple">
                              <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-3.5 h-3.5 text-purple-600" />
                                <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider">Key Technical Challenge</h4>
                              </div>
                              <p className="text-sm text-slate-700 leading-relaxed">{project.technicalChallenge}</p>
                            </InnerBlock>

                            {/* Features — cyan block, white sub-items */}
                            <InnerBlock theme="cyan">
                              <div className="flex items-center gap-2 mb-3">
                                <TrendingUp className="w-3.5 h-3.5 text-cyan-600" />
                                <h4 className="text-xs font-bold text-cyan-700 uppercase tracking-wider">Key Features</h4>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {project.features.map((feature, i) => (
                                  <SubItem key={i} className="flex items-start gap-2">
                                    <span className="text-cyan-500 shrink-0 mt-0.5">•</span>
                                    <span>{feature}</span>
                                  </SubItem>
                                ))}
                              </div>
                            </InnerBlock>

                            {/* Status / Impact */}
                            <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-5 text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-slate-500">Status: <span className="text-emerald-600 font-semibold">{project.status}</span></span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Award className="w-3.5 h-3.5 text-blue-500" />
                                <span className="text-slate-500">Impact: <span className="text-slate-700">{project.impact}</span></span>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* ── ACADEMIC PROJECT ── */}
            <AnimatedSection className="mb-20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Academic Project</h2>
              </div>

              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Card>
                  <div className="p-6">

                    <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${academicProject.gradient} flex items-center justify-center shrink-0`}>
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 leading-tight">{academicProject.title}</h3>
                          <span className="inline-block mt-1 bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-orange-200">
                            In Development
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-orange-600 mb-1">{academicProject.subtitle}</p>
                    <p className="text-xs text-slate-500 mb-3">{academicProject.type}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{academicProject.tagline}</p>

                    {/* Tech pills — neutral */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {academicProject.technologies.map((tech) => (
                        <TechPill key={tech} tech={tech} />
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-5 mb-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Users size={12} className="text-indigo-500" />
                        <span>{academicProject.supervisor}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-emerald-600" />
                        <span>Expected {academicProject.expectedCompletion}</span>
                      </div>
                    </div>

                    <InnerBlock theme="amber" className="mb-4">
                      <div className="flex items-start gap-2.5">
                        <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700">{academicProject.recognition}</p>
                      </div>
                    </InnerBlock>

                    <div className="flex items-center justify-between">
                      <div className="text-xs flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                        <span className="text-slate-500">Status: <span className="text-orange-500 font-semibold">{academicProject.status}</span></span>
                      </div>
                      <button
                        onClick={() => toggleProject(academicProject.id)}
                        className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 transition-all text-xs font-semibold rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-100 cursor-pointer"
                      >
                        {expandedProject === academicProject.id ? <> Less Details <ChevronUp size={13} /> </> : <> Details <ChevronDown size={13} /> </>}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedProject === academicProject.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-slate-200 pt-5 space-y-4">

                          {/* Problem — orange, Solution — emerald */}
                          <div className="grid md:grid-cols-2 gap-3">
                            <InnerBlock theme="orange">
                              <div className="flex items-center gap-2 mb-2">
                                <Target className="w-3.5 h-3.5 text-orange-500" />
                                <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider">The Problem</h4>
                              </div>
                              <p className="text-slate-700 text-sm leading-relaxed">{academicProject.problem}</p>
                            </InnerBlock>
                            <InnerBlock theme="emerald">
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">The Solution</h4>
                              </div>
                              <p className="text-slate-700 text-sm leading-relaxed">{academicProject.solution}</p>
                            </InnerBlock>
                          </div>

                          {/* Role — violet (different from orange Problem block) */}
                          <InnerBlock theme="violet">
                            <div className="flex items-center gap-2 mb-3">
                              <Users className="w-3.5 h-3.5 text-violet-600" />
                              <h4 className="text-xs font-bold text-violet-700 uppercase tracking-wider">My Role & Contributions</h4>
                            </div>
                            <div className="grid md:grid-cols-2 gap-2">
                              {academicProject.myRole.map((role, i) => (
                                <SubItem key={i}>{role}</SubItem>
                              ))}
                            </div>
                          </InnerBlock>

                          {/* Progress — teal (different from all above) */}
                          <InnerBlock theme="teal">
                            <div className="flex items-center gap-2 mb-3">
                              <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                              <h4 className="text-xs font-bold text-teal-700 uppercase tracking-wider">Current Progress</h4>
                            </div>
                            <div className="grid md:grid-cols-2 gap-2">
                              {academicProject.progress.map((item, i) => (
                                <SubItem key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </SubItem>
                              ))}
                            </div>
                          </InnerBlock>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            </AnimatedSection>

            {/* ── PRARAMBH AI ── */}
            <AnimatedSection className="mb-20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Currently Building</h2>
              </div>

              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Card>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${futureProject.gradient} flex items-center justify-center`}>
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{futureProject.title}</h3>
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200 mt-0.5">
                          <TrendingUp size={10} /> In Progress
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-cyan-600 mb-1 italic font-medium">{futureProject.subtitle}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{futureProject.tagline}</p>

                    {/* Tech pills — neutral */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {futureProject.technologies.map((tech) => (
                        <TechPill key={tech} tech={tech} />
                      ))}
                    </div>

                    <InnerBlock theme="yellow" className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-3.5 h-3.5 text-yellow-600" />
                        <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">Why I'm Building This</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{futureProject.purpose}</p>
                    </InnerBlock>

                    <div className="grid md:grid-cols-2 gap-3 mb-5">
                      <InnerBlock theme="emerald">
                        <p className="text-xs font-bold text-emerald-700 mb-2 flex items-center gap-1.5">
                          <CheckCircle2 size={12} /> Completed
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">{futureProject.completed}</p>
                      </InnerBlock>
                      <InnerBlock theme="amber">
                        <p className="text-xs font-bold text-amber-600 mb-2 flex items-center gap-1.5">
                          <TrendingUp size={12} /> Pending
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">{futureProject.pending}</p>
                      </InnerBlock>
                    </div>

                    <div className="flex justify-between items-center flex-wrap gap-3 pt-4 border-t border-slate-200">
                      <div className="flex gap-2 flex-wrap">
                        <a href={futureProject.live} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors">
                          <ExternalLink size={12} /> Preview Frontend
                        </a>
                        <a href={futureProject.github} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors">
                          <Github size={12} /> GitHub
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar size={12} className="text-emerald-600" />
                        <span>Expected {futureProject.expectedCompletion}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>

            {/* ── TECH STACK — UNTOUCHED ── */}
            <AnimatedSection className="mb-16">
              <div className="text-center mb-8">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-md mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Tech Stack Across Projects</h3>
                <p className="text-slate-400 text-sm">Technologies powering my development journey.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {techStackGrid.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="cursor-default group"
                  >
                    <div className="h-full p-5 rounded-2xl bg-[#1E293B] border border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.3)] group-hover:border-indigo-500/40 group-hover:shadow-[0_8px_30px_rgba(99,102,241,0.2)] transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
                          {category.icon}
                        </div>
                        <h4 className="text-sm font-semibold text-white">{category.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-slate-700/60 text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-600/80 hover:text-white transition-all duration-150 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Projects;
