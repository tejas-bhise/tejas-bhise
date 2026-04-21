import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Github,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Calendar,
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
const Card = ({ children, className = "", cardRef }) => (
  <div
    ref={cardRef}
    className={`rounded-2xl bg-gradient-to-b from-slate-100 via-slate-50 to-white border border-slate-300 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-slate-400 hover:shadow-[0_8px_32px_rgba(79,70,229,0.14)] ${className}`}
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
    <div className={`${themes[theme]} rounded-xl p-5 border ${className}`} >
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

const ProjectExpandedContent = ({ project }) => (
  <div className="px-6 pb-6 border-t border-slate-200 pt-5 space-y-5">
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

    {/* Key Challenges */}
    <InnerBlock theme="purple">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-3.5 h-3.5 text-purple-600" />
        <h4 className="text-xs font-bold text-purple-700 uppercase tracking-wider">Key Challenges</h4>
      </div>
      <div className="space-y-2">
        {project.keyChallenges?.map((challenge, i) => (
          <SubItem key={i} className="flex items-start gap-2">
            <span className="text-purple-500 shrink-0 mt-0.5">•</span>
            <span>{challenge}</span>
          </SubItem>
        ))}
      </div>
    </InnerBlock>

    {/* Pipeline */}
    <InnerBlock theme="blue">
      <div className="flex items-center gap-2 mb-3">
        <GitBranch className="w-3.5 h-3.5 text-blue-600" />
        <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Pipeline</h4>
      </div>
      <SubItem className="flex items-start gap-2">
        <span className="text-blue-500 shrink-0 mt-0.5">•</span>
        <span>{project.pipeline}</span>
      </SubItem>
    </InnerBlock>

    {/* Implementation Highlights */}
    <InnerBlock theme="violet">
      <div className="flex items-center gap-2 mb-3">
        <Code2 className="w-3.5 h-3.5 text-violet-600" />
        <h4 className="text-xs font-bold text-violet-700 uppercase tracking-wider">Implementation Highlights</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        {project.implementationHighlights?.map((highlight, i) => (
          <SubItem key={i} className="flex flex-col gap-1">
            <span className="font-bold text-slate-800">{highlight.title}</span>
            <span className="text-slate-600">{highlight.description}</span>
          </SubItem>
        ))}
      </div>
    </InnerBlock>

    {/* Results */}
    <InnerBlock theme="teal">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-3.5 h-3.5 text-teal-600" />
        <h4 className="text-xs font-bold text-teal-700 uppercase tracking-wider">Key Results</h4>
      </div>
      <div className="space-y-2">
        {project.results?.map((result, i) => (
          <SubItem key={i} className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
            <span>{result}</span>
          </SubItem>
        ))}
      </div>
    </InnerBlock>

    {/* Status (Footer Row) */}
    {project.status && (
      <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-5 text-xs">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'In Progress' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
          <span className="text-slate-500">Status: <span className={`${project.status === 'In Progress' ? 'text-blue-600' : 'text-emerald-600'} font-semibold`}>{project.status}</span></span>
        </div>
      </div>
    )}
  </div>
);

const Projects = ({ setPage }) => {
  const [expandedProject, setExpandedProject] = useState(null);
  
  // Refs for scrolling
  const projectRefs = useRef({});

  const toggleProject = (id) => {
    const el = projectRefs.current[id];

    if (!el) {
      setExpandedProject(id === expandedProject ? null : id);
      return;
    }

    const y = el.getBoundingClientRect().top + window.scrollY;

    setExpandedProject(id === expandedProject ? null : id);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: y,
        behavior: "instant"
      });
    });
  };

  const completedProjects = [
    {
      id: 1,
      title: "ClarifaiSQL",
      slug: "clarifaisql",
      type: "Personal Project • Self-Developed",
      tagline: "Convert natural language questions into SQL queries with explanations using schema-aware reasoning and safe execution.",
      technologies: ["Python", "FastAPI", "Gemini API", "SQL", "React", "JavaScript"],
      github: "https://github.com/tejas-bhise/ClarifaiSQL",
      githubPrivate: false,
      live: "https://clarifaisql.vercel.app",
      status: "Deployed & Maintained",
      gradient: "from-cyan-500 to-blue-500",
      problem: "Non-technical users and beginners struggle with SQL because extracting insights from structured databases requires understanding schemas and query logic, while most resources lack sufficient hands-on practice to build real proficiency.",
      solution: "Developed an AI-powered platform that converts natural language into SQL queries with explanations and results, using an in-memory SQLite database that automatically deletes session data to ensure strong user privacy.",
      keyChallenges: [
        "Handling unseen schemas without predefined table structures",
        "Preventing invalid or unsafe SQL generation from LLM responses",
        "Ensuring consistent query accuracy across different dataset formats"
      ],
      pipeline: "CSV upload → schema extraction → prompt structuring → Gemini reasoning → SQL validation → query execution → tabular output → explanation generation",
      implementationHighlights: [
        { title: "Schema-aware prompt engineering", description: "Extracted table schema dynamically from uploaded CSV files and injected structured metadata into LLM prompts to improve SQL accuracy without hardcoding relationships." },
        { title: "Safe SQL execution layer", description: "Implemented validation logic restricting unsafe operations (DROP, DELETE, ALTER), ensuring only read-safe queries are executed." },
        { title: "Dynamic database creation", description: "Converted CSV files into in-memory SQL tables, enabling instant querying without manual database configuration." },
        { title: "LLM-generated explanations", description: "Generated natural language explanations of SQL logic to improve transparency and usability for non-technical users." }
      ],
      results: [
        "Achieved reliable query accuracy across varied datasets using schema-aware prompting.",
        "Reduced manual effort required to write SQL queries through natural language interaction.",
        "Enabled users to dynamically learn, experiment, and practice SQL directly on datasets through real-time query generation."
      ],
    },
    {
      id: 2,
      title: "Saarthi",
      slug: "saarthi",
      type: "Personal Project • Self-Developed",
      tagline: "Real-time AI tutor with voice interaction, persistent memory, and 3D avatar delivering step-by-step doubt solving 24/7.",
      technologies: ["React", "Three.js", "FastAPI", "WebSocket", "WebRTC", "Redis", "PostgreSQL", "Gemini API", "STT/TTS"],
      github: null,
      githubPrivate: true,
      live: "https://saarthi-ai-iota.vercel.app",
      status: "Deployed • Production-ready backend",
      gradient: "from-purple-500 to-pink-500",
      problem: "Students studying independently often lack immediate guidance when doubts arise, leading to learning gaps, slower progress, and reduced confidence due to limited access to affordable, on-demand tutoring.",
      solution: "Developed a real-time AI tutoring platform where students interact with a 3D virtual tutor via voice or text, receiving step-by-step explanations with persistent memory for continuous, personalized learning support available 24/7.",
      keyChallenges: [
        "Synchronizing voice input, LLM response, and avatar animation in real-time",
        "Maintaining context consistency across WebSocket sessions and memory stores",
        "Reducing response delay while preserving structured explanations"
      ],
      pipeline: "User speech/text → STT → structured prompt → Gemini reasoning → TTS generation → avatar lip-sync → WebSocket streaming → Redis memory → PostgreSQL persistence",
      implementationHighlights: [
        { title: "Real-time communication architecture", description: "Implemented WebSocket-based bidirectional communication enabling continuous low-latency conversation without traditional request-response delays." },
        { title: "Structured LLM prompt workflow", description: "Designed prompt templates optimized for educational explanations to improve clarity and step-by-step reasoning." },
        { title: "Voice interaction pipeline", description: "Integrated speech-to-text and text-to-speech services enabling natural conversational learning." },
        { title: "3D tutor interface", description: "Built a Three.js avatar synchronized with generated speech to improve engagement and realism." }
      ],
      results: [
        "Enables students to receive instant doubt resolution anytime, improving learning continuity during self-study.",
        "Supports better concept understanding through structured step-by-step explanations tailored to conversation context.",
        "Increases engagement and confidence by providing interactive, personalized tutoring accessible 24/7."
      ],
    },
    {
      id: 3,
      title: "Operis",
      slug: "operis",
      type: "Personal Project • Self-Developed",
      tagline: "AI decision intelligence system that converts scattered operational signals into clear, prioritized insights on what needs attention.",
      technologies: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Scheduler", "LLM APIs", "REST APIs"],
      github: null,
      githubPrivate: true,
      live: "https://operis-ai.vercel.app",
      status: "Completed",
      gradient: "from-indigo-500 to-blue-600",
      problem: "Operational signals are fragmented across tools like Jira, GitHub, Slack, email, and calendars, making it difficult to quickly understand what requires attention, what changed, and where risks are emerging.",
      solution: "Developed an AI-powered system that continuously consolidates multi-source signals into structured, prioritized insights using scoring logic and LLM summarization, enabling a clear, real-time view of what needs attention.",
      keyChallenges: [
        "Designing generalized scoring logic adaptable to different signal types",
        "Structuring unstructured operational activity into measurable decision indicators",
        "Ensuring interpretable AI-generated summaries for quick situational understanding"
      ],
      pipeline: "Signal ingestion → normalization → scoring engine → priority ranking → LLM summarization → structured decision insights → monitoring loop",
      implementationHighlights: [
        { title: "Signal ingestion architecture", description: "Designed modular pipelines to aggregate operational signals from multiple tools, enabling extensibility across integrations." },
        { title: "Decision scoring engine", description: "Built rule-based scoring logic to identify meaningful changes and prioritize risks requiring attention." },
        { title: "LLM insight generation", description: "Converted structured signals into concise summaries highlighting key updates and emerging risks." },
        { title: "Scheduled monitoring cycle", description: "Implemented periodic evaluation to continuously track system state and detect meaningful changes." }
      ],
      results: [
        "Helps founders and managers make faster decisions by highlighting only important signals and reducing noise.",
        "Reduces time spent manually checking multiple tools through a single structured insight view.",
        "Improves productivity by clearly showing risks, priorities, and changes that need attention."
      ],
    },
  ];

  const fedShieldProject = {
    id: 4,
    title: "FedShield",
    slug: "fedshield",
    subtitle: "Secure Federated Learning using dual-signal anomaly detection",
    type: "Final Year Project",
    tagline: "Secure federated learning framework using dual-signal anomaly detection to identify and filter malicious client updates before aggregation.",
    technologies: ["Python", "PyTorch", "Flower", "CNN", "CIFAR-10", "SVHN (OOD dataset)", "NumPy", "Streamlit"],
    status: "Completed",
    gradient: "from-orange-500 to-red-500",
    problem: "Federated learning systems are vulnerable to stealthy backdoor attacks where malicious clients manipulate model updates while appearing statistically normal, making detection difficult using standard aggregation methods.",
    solution: "Developed a dual-signal anomaly detection framework that analyzes gradient patterns and behavioral deviations to identify and filter adversarial client updates before secure model aggregation.",
    keyChallenges: [
      "Detecting malicious updates that closely resemble normal gradient distributions",
      "Preserving global model accuracy while filtering adversarial clients",
      "Validating robustness across IID and OOD dataset distributions"
    ],
    pipeline: "Client model updates → gradient signal extraction → behavioral shift analysis → anomaly scoring → malicious client filtering → secure aggregation",
    implementationHighlights: [
      { title: "Dual-signal anomaly detection design", description: "Analyzed both gradient-level deviations and behavioral update patterns to improve detection reliability against stealth backdoor attacks." },
      { title: "Attack simulation framework", description: "Implemented BadNets, label flipping, and model replacement attacks to evaluate defense performance under realistic adversarial conditions." },
      { title: "OOD robustness validation", description: "Used SVHN dataset as an out-of-distribution proxy to test defense stability beyond training distribution." },
      { title: "Federated training pipeline", description: "Built Flower-based federated environment with multiple clients for controlled experimentation." }
    ],
    results: [
      "Achieved 69% main task accuracy while maintaining model reliability under adversarial conditions.",
      "Reduced backdoor success rate to 3–4%, limiting effectiveness of malicious updates.",
      "Detected 100% malicious clients with zero false positives, ensuring secure aggregation."
    ],
  };

  const futureProject = {
    id: 5,
    title: "Prarambh AI",
    slug: "prarambh",
    subtitle: "Startup ideas to blueprint in 60 sec",
    tagline: "AI platform that transforms raw startup ideas into structured execution blueprints with validation steps, feature planning, and actionable development guidance.",
    technologies: ["Python", "FastAPI", "LLM APIs", "React", "JavaScript", "Dashboard UI"],
    status: "In Progress",
    gradient: "from-blue-500 to-cyan-500",
    problem: "Early-stage ideas often lack structured validation and clear execution direction, making it difficult to systematically evaluate feasibility, define features, and plan development steps.",
    solution: "Building an AI-assisted platform that converts idea inputs into structured execution blueprints including validation steps, feature breakdowns, and guided development direction.",
    keyChallenges: [
      "Structuring unstructured idea inputs into actionable outputs",
      "Designing reusable workflow templates for idea validation",
      "Ensuring practical outputs beyond generic AI responses"
    ],
    pipeline: "Idea input → context structuring → LLM reasoning → blueprint generation → structured output sections → dashboard visualization",
    implementationHighlights: [
      { title: "Idea structuring workflow", description: "Designed structured input format to capture startup context and improve relevance of generated outputs." },
      { title: "Blueprint generation logic", description: "LLM produces structured sections covering validation strategy, feature planning, and execution steps." },
      { title: "Dashboard interface design", description: "Built responsive UI to display structured blueprint outputs in an organized format." },
      { title: "Modular workflow architecture", description: "System designed to support multiple idea categories and extensible planning workflows." }
    ],
    results: [
      "Helps users quickly convert raw ideas into structured, actionable execution plans.",
      "Reduces ambiguity in early-stage planning through clear validation and feature breakdown guidance.",
      "Enables faster transition from idea stage to implementation-ready direction."
    ],
    live: "https://pararambh-frontend.vercel.app",
    github: "https://github.com/tejas-bhise/pararambh-frontend",
    expectedCompletion: "2026",
  };

  const techStackGrid = [
    { category: "Languages", icon: <Code2 className="w-4 h-4 text-white" />, color: "from-blue-500 to-blue-700", items: ["Python", "JavaScript", "SQL"] },
    { category: "Backend", icon: <Server className="w-4 h-4 text-white" />, color: "from-purple-500 to-purple-700", items: ["FastAPI", "RESTful APIs", "SQLAlchemy", "WebSocket"] },
    { category: "Frontend", icon: <Monitor className="w-4 h-4 text-white" />, color: "from-cyan-500 to-cyan-700", items: ["React", "Three.js", "Streamlit"] },
    { category: "AI & LLMs", icon: <Brain className="w-4 h-4 text-white" />, color: "from-green-500 to-green-700", items: ["Google Gemini API", "Prompt Engineering", "STT/TTS APIs"] },
    { category: "Machine Learning", icon: <BarChart3 className="w-4 h-4 text-white" />, color: "from-indigo-500 to-indigo-700", items: ["PyTorch", "TensorFlow", "CNN", "NumPy", "Anomaly Detection"] },
    { category: "Federated Learning", icon: <Network className="w-4 h-4 text-white" />, color: "from-pink-500 to-pink-700", items: ["Flower Framework"] },
    { category: "Databases", icon: <Database className="w-4 h-4 text-white" />, color: "from-orange-500 to-orange-700", items: ["PostgreSQL", "Redis", "SQLite"] },
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
                  className={!isAnyCompletedExpanded && idx >= 2 ? "md:col-span-2" : ""}
                >
                  <Card cardRef={(el) => (projectRefs.current[project.id] = el)} className="h-full flex flex-col">
                    <div className="w-full overflow-hidden rounded-t-2xl border-b border-slate-200">
                      <img 
                        src={`/projects/${project.slug}.png`}
                        alt={`${project.title} preview`}
                        className="w-full h-auto block"
                      />
                    </div>
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
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors">
                              <ExternalLink size={12} /> Live Demo
                            </a>
                          )}
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
                          <ProjectExpandedContent project={project} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* ── FEDSHIELD PROJECT ── */}
            <AnimatedSection className="mb-20">
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Card cardRef={(el) => (projectRefs.current[fedShieldProject.id] = el)}>
                  <div className="w-full overflow-hidden rounded-t-2xl border-b border-slate-200">
                    <img 
                      src={`/projects/${fedShieldProject.slug}.png`}
                      alt={`${fedShieldProject.title} preview`}
                      className="w-full h-auto block"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">

                    <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${fedShieldProject.gradient} flex items-center justify-center shrink-0`}>
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 leading-tight">{fedShieldProject.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-orange-600 mb-1">{fedShieldProject.subtitle}</p>
                    <p className="text-xs text-slate-500 mb-3">{fedShieldProject.type}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{fedShieldProject.tagline}</p>

                    {/* Tech pills — neutral */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {fedShieldProject.technologies.map((tech) => (
                        <TechPill key={tech} tech={tech} />
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="text-xs flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-slate-500">Status: <span className="text-emerald-600 font-semibold">{fedShieldProject.status}</span></span>
                      </div>
                      <button
                        onClick={() => toggleProject(fedShieldProject.id)}
                        className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 transition-all text-xs font-semibold rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-100 cursor-pointer"
                      >
                        {expandedProject === fedShieldProject.id ? <> Less Details <ChevronUp size={13} /> </> : <> Details <ChevronDown size={13} /> </>}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedProject === fedShieldProject.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ProjectExpandedContent project={fedShieldProject} />
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
                <Card cardRef={(el) => (projectRefs.current[futureProject.id] = el)} className="flex flex-col">
                  <div className="w-full overflow-hidden rounded-t-2xl border-b border-slate-200">
                    <img 
                      src={`/projects/${futureProject.slug}.png`}
                      alt={`${futureProject.title} preview`}
                      className="w-full h-auto block"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
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
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {futureProject.technologies.map((tech) => (
                        <TechPill key={tech} tech={tech} />
                      ))}
                    </div>

                    <div className="mt-auto space-y-2">
                      <div className="flex justify-between items-center flex-wrap gap-3">
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
                      <button
                        onClick={() => toggleProject(futureProject.id)}
                        className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 transition-all text-xs font-semibold w-full justify-center rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-100 cursor-pointer"
                      >
                        {expandedProject === futureProject.id ? <> Less Details <ChevronUp size={13} /> </> : <> Details <ChevronDown size={13} /> </>}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedProject === futureProject.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ProjectExpandedContent project={futureProject} />
                      </motion.div>
                    )}
                  </AnimatePresence>
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