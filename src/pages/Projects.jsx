import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  TrendingUp
} from 'lucide-react';
import { useState, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';

// Premium Card with Glow Effect
const Card = ({ children, className = "" }) => (
  <div className={`rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 relative group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {children}
  </div>
);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

const AnimatedSection = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
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

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const toggleProject = (id) => setExpandedProject(expandedProject === id ? null : id);

  const completedProjects = [
    {
      id: 1,
      title: "ClarifAiSQL",
      type: "Personal Project (Self-Developed)",
      tagline: "Enabling non-technical users to query databases using plain English instead of SQL",
      technologies: ["Python", "FastAPI", "Google Gemini API", "SQL", "JavaScript", "React"],
      github: "https://github.com/tejas-bhise/ClarifaiSQL",
      live: "https://clarifaisql.vercel.app",
      status: "Deployed & Maintained",
      gradient: "from-cyan-500 to-blue-500",
      problem: "Non-technical users struggle to access database information because writing SQL queries requires technical expertise.",
      solution: "Developed a web application that converts natural language into SQL, displays the generated query with AI-powered explanation, and returns instant results.",
      myRole: [
        "Designed and developed the full-stack application from scratch",
        "Designed RESTful APIs and handled backend logic using FastAPI",
        "Integrated Google Gemini API for natural language to SQL conversion",
        "Implemented CSV upload and automatic database/table creation",
        "Deployed frontend on Vercel and backend on Render"
      ],
      technicalChallenge: "Implemented dynamic schema extraction from uploaded CSV files to generate accurate SQL queries",
      impact: "Used for demonstrations and peer testing",
      features: [
        "Natural language to SQL query conversion",
        "CSV upload with automatic database creation",
        "AI-powered query explanations",
        "Real-time query execution and results display",
        "User-friendly interface for non-technical users",
        "Drag-and-drop file upload functionality"
      ]
    },
    {
      id: 2,
      title: "Saarthi",
      type: "Personal Project (Self-Developed)",
      tagline: "Expanding access to quality learning support through an always-available AI tutor for students who cannot afford private coaching",
      technologies: ["Python", "FastAPI", "Google Gemini API", "STT/TTS APIs", "JavaScript", "Three.js"],
      github: "https://github.com/tejas-bhise/ai-tutor-platform",
      live: "https://ai-tutor-platform-lime.vercel.app/",
      status: "Deployed & Maintained",
      gradient: "from-purple-500 to-pink-500",
      problem: "Many students are unable to afford private coaching due to high costs, leaving them without timely academic support during self-study.",
      solution: "Developed an AI-powered tutoring platform featuring a 3D virtual tutor that provides instant, personalized assistance through text and voice interactions.",
      myRole: [
        "Designed and developed the end-to-end AI tutoring platform",
        "Designed RESTful APIs and handled backend logic using FastAPI",
        "Integrated Google Gemini API for conversational academic assistance",
        "Implemented Speech-to-Text (STT) and Text-to-Speech (TTS) for voice interaction",
        "Built an interactive 3D avatar tutor using Three.js",
        "Deployed the application for public access and testing"
      ],
      technicalChallenge: "Integrated real-time voice input/output and synchronized it with AI responses inside a browser-based 3D interface",
      impact: "Used for demonstrations and peer testing",
      features: [
        "Interactive 3D avatar tutor with realistic animations",
        "Dual interaction modes: voice chat and text messaging",
        "Real-time AI responses for academic queries",
        "Speech-to-Text and Text-to-Speech integration",
        "Accessible learning support available 24/7",
        "Personalized learning experience"
      ]
    }
  ];

  const academicProject = {
    id: 3,
    title: "FedShield",
    subtitle: "Enhancing Security in Federated Learning through Anomaly-Based Backdoor Detection",
    type: "Final Year Project",
    tagline: "Detecting and preventing stealthy backdoor attacks in federated learning systems to ensure secure and trustworthy collaborative AI",
    technologies: ["Python", "Federated Learning (Flower)", "PyTorch/TensorFlow", "CNN", "Anomaly Detection", "CIFAR-10", "MNIST", "Streamlit"],
    status: "In Development",
    supervisor: "Prof. Rahul Patil",
    expectedCompletion: "2026",
    recognition: "Novel functional-analysis-based defense mechanism proposed as core contribution",
    gradient: "from-orange-500 to-red-500",
    problem: "Federated learning models can be secretly poisoned with hidden backdoors while appearing accurate, making them unsafe and unreliable.",
    solution: "Designing and implementing a novel functional-analysis-based defense mechanism to detect anomalous model updates and prevent backdoor attacks in federated learning environments.",
    myRole: [
      "Contributing to backend implementation and system architecture",
      "Designing anomaly-based 'Guardian' defense mechanism",
      "Implementing backdoor attack (BadNets) for experimental evaluation",
      "Developing experimental pipeline for performance analysis"
    ],
    progress: [
      "Federated learning baseline system designed",
      "Anomaly-based 'Guardian' defense design finalized",
      "Backdoor attack (BadNets) implementation in progress",
      "Experimental evaluation pipeline defined"
    ]
  };

  const futureProject = {
    id: 4,
    title: "Prarambh AI",
    subtitle: "Startup ideas to blueprint in 60 sec…",
    tagline: "Helping founders convert raw startup ideas into validated, execution-ready blueprints within minutes",
    technologies: ["Python", "FastAPI", "LLM APIs", "JavaScript", "React", "Dashboard UI", "Database (TBD)"],
    status: "In Progress",
    gradient: "from-blue-500 to-cyan-500",
    purpose: "To address the 'zero-to-one' gap where founders fail due to lack of idea validation, strategy, and guidance before building.",
    completed: "Frontend dashboard UI designed and implemented with responsive layout and structured workflows",
    pending: "Backend API development, LLM integration, database design, and deployment",
    live: "https://pararambh-frontend.vercel.app",
    github: "https://github.com/tejas-bhise/pararambh-frontend"
  };

  const techStackGrid = [
    { category: "Languages", icon: "💻", color: "from-blue-500 to-blue-600", items: ["Python", "JavaScript", "SQL"] },
    { category: "Backend", icon: "⚙️", color: "from-purple-500 to-purple-600", items: ["FastAPI", "RESTful APIs"] },
    { category: "Frontend", icon: "🎨", color: "from-cyan-500 to-cyan-600", items: ["React", "Three.js", "Streamlit"] },
    { category: "AI & LLMs", icon: "🤖", color: "from-green-500 to-green-600", items: ["Google Gemini API", "STT/TTS APIs"] },
    { category: "Machine Learning", icon: "🧠", color: "from-indigo-500 to-indigo-600", items: ["PyTorch", "TensorFlow", "CNN", "Anomaly Detection", "CIFAR-10", "MNIST"] },
    { category: "Federated Learning Frameworks", icon: "🔬", color: "from-pink-500 to-pink-600", items: ["Flower Framework"] },
    { category: "Databases", icon: "📊", color: "from-orange-500 to-orange-600", items: ["SQLite (in-memory)"] },
    { category: "Deployment", icon: "🚀", color: "from-emerald-500 to-emerald-600", items: ["Vercel", "Render"] },
    { category: "Version Control", icon: "🔧", color: "from-gray-500 to-gray-600", items: ["Git", "GitHub"] }
  ];

  const isAnyCompletedExpanded = completedProjects.some(p => p.id === expandedProject);

  return (
    <PageWrapper>
      <div 
        className="min-h-screen w-full"
        style={{
          background: 'linear-gradient(180deg, #0a1929 0%, #0d1e2e 50%, #0f2638 100%)',
        }}
      >
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/8 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[30%] left-[-10%] w-[500px] h-[500px] bg-blue-600/8 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[60%] left-[50%] w-[400px] h-[400px] bg-violet-600/6 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <section className="pt-32 pb-20 relative z-10">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }} 
              className="text-center mb-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shadow-2xl shadow-violet-500/20">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">My Projects</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                AI-powered applications and full-stack solutions built with modern technologies.
              </p>
            </motion.div>

            {/* COMPLETED PROJECTS */}
            <div className={`grid gap-8 mb-24 ${isAnyCompletedExpanded ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
              {completedProjects.map((project, idx) => (
                <motion.div 
                  key={project.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: idx * 0.1 }} 
                  layout
                >
                  <Card className="bg-[#0f2638]/80 backdrop-blur-sm border-white/10 h-full flex flex-col hover:bg-[#132d42]/90 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10">
                    <div className={`h-1 bg-gradient-to-r ${project.gradient}`} />
                    
                    <div className="p-6 flex-1 flex flex-col relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}>
                              <Lightbulb className="w-5 h-5 text-white" />
                            </div>
                            <h3 className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                              {project.title}
                            </h3>
                          </div>
                          <p className="text-xs text-violet-400 font-semibold">{project.type}</p>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                          <CheckCircle2 size={12} /> Live
                        </span>
                      </div>
                      
                      <p className="text-white text-sm mb-6 leading-relaxed">{project.tagline}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map(tech => (
                          <span key={tech} className="px-3 py-1.5 bg-slate-700/40 text-slate-200 rounded-lg text-xs border border-slate-600/30 hover:bg-slate-600/50 hover:border-slate-500/50 transition-all cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto space-y-4 relative z-20">
                        <div className="flex gap-3">
                          <a 
                            href={project.live} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105"
                          >
                            <ExternalLink size={14} /> Live Demo
                          </a>
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-slate-700/60 text-white rounded-xl text-sm font-bold border border-slate-600/40 hover:bg-slate-600/60 hover:border-slate-500/60 transition-all hover:scale-105"
                          >
                            <Github size={14} /> GitHub
                          </a>
                        </div>
                        
                        <button
                          onClick={() => toggleProject(project.id)}
                          className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-colors text-sm font-medium w-full justify-center border border-slate-600/30 rounded-xl hover:bg-slate-700/40 hover:border-slate-500/50 relative z-20 cursor-pointer"
                          style={{ position: 'relative', zIndex: 30 }}
                        >
                          {expandedProject === project.id ? (
                            <>Less Details <ChevronUp size={16} /></>
                          ) : (
                            <>Details <ChevronDown size={16} /></>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* EXPANDED CONTENT */}
                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-slate-700/50 pt-6 space-y-6 bg-[#0a1929]/60">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="bg-orange-500/5 rounded-xl p-4 border border-orange-500/20">
                                <div className="flex items-center gap-2 mb-3">
                                  <Target className="w-4 h-4 text-orange-400" />
                                  <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">The Problem</h4>
                                </div>
                                <p className="text-white text-sm leading-relaxed">{project.problem}</p>
                              </div>
                              <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
                                <div className="flex items-center gap-2 mb-3">
                                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                                  <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider">The Solution</h4>
                                </div>
                                <p className="text-white text-sm leading-relaxed">{project.solution}</p>
                              </div>
                            </div>
                            
                            <div className="bg-indigo-500/5 rounded-xl p-5 border border-indigo-500/20">
                              <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-indigo-400" />
                                <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">My Role & Contributions</h4>
                              </div>
                              <ul className="space-y-3">
                                {project.myRole.map((role, i) => (
                                  <li key={i} className="text-sm text-white flex items-start gap-3 group">
                                    <span className="text-indigo-400 mt-1 group-hover:scale-125 transition-transform">•</span>
                                    <span className="group-hover:text-indigo-100 transition-colors">{role}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-purple-500/10 rounded-xl p-5 border border-purple-500/20 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
                              <div className="relative">
                                <div className="flex items-center gap-2 mb-3">
                                  <Zap className="w-5 h-5 text-purple-400" />
                                  <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider">
                                    Key Technical Challenge Overcome
                                  </h4>
                                </div>
                                <p className="text-sm text-white font-medium">{project.technicalChallenge}</p>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-5 h-5 text-cyan-400" />
                                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Key Features</h4>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {project.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-start gap-3 text-sm text-white bg-slate-800/30 rounded-lg p-3 hover:bg-slate-800/50 transition-colors">
                                    <span className="text-cyan-400 mt-0.5">→</span>
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="pt-4 border-t border-slate-700/40 flex flex-wrap gap-6 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <p className="text-white">
                                  <span className="font-semibold text-emerald-400">Status:</span> {project.status}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-blue-400" />
                                <p className="text-white">
                                  <span className="font-semibold text-blue-400">Impact:</span> {project.impact}
                                </p>
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

            {/* ACADEMIC PROJECT - Similar structure with button fix */}
            <AnimatedSection className="mb-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Academic Project</h2>
              </div>
              
              <Card className="bg-[#0f2638]/80 backdrop-blur-sm border-white/10 overflow-hidden hover:border-orange-500/30">
                <div className={`h-1 bg-gradient-to-r ${academicProject.gradient}`} />
                
                <div className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${academicProject.gradient} flex items-center justify-center shadow-lg`}>
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <h3 className={`text-2xl font-bold bg-gradient-to-r ${academicProject.gradient} bg-clip-text text-transparent`}>
                          {academicProject.title}
                        </h3>
                        <span className="bg-orange-500/20 text-orange-400 text-xs font-bold uppercase px-3 py-1 rounded-full border border-orange-500/30">
                          In Development
                        </span>
                      </div>
                      <p className="text-sm font-medium text-yellow-400 mb-2">{academicProject.subtitle}</p>
                      <p className="text-xs text-violet-400 mb-3 font-semibold">{academicProject.type}</p>
                      <p className="text-white text-sm leading-relaxed mb-4">{academicProject.tagline}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {academicProject.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-slate-700/40 text-slate-200 rounded-lg text-xs border border-slate-600/30 hover:bg-slate-600/50 transition-all cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-white">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-blue-400" />
                      <span>{academicProject.supervisor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-green-400" />
                      <span>Expected: {academicProject.expectedCompletion}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 mb-6 bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
                    <Award className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white font-medium">{academicProject.recognition}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                      <span className="font-medium text-orange-400">Status:</span> {academicProject.status}
                    </div>
                    <button
                      onClick={() => toggleProject(academicProject.id)}
                      className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-colors text-sm font-medium border border-slate-600/30 rounded-xl hover:bg-slate-700/40 relative z-20 cursor-pointer"
                      style={{ position: 'relative', zIndex: 30 }}
                    >
                      {expandedProject === academicProject.id ? (
                        <>Less Details <ChevronUp size={16} /></>
                      ) : (
                        <>Details <ChevronDown size={16} /></>
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedProject === academicProject.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-slate-700/50 pt-6 space-y-6 bg-[#0a1929]/60">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-orange-500/5 rounded-xl p-4 border border-orange-500/20">
                            <div className="flex items-center gap-2 mb-3">
                              <Target className="w-4 h-4 text-orange-400" />
                              <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">THE PROBLEM</h4>
                            </div>
                            <p className="text-white text-sm leading-relaxed">{academicProject.problem}</p>
                          </div>
                          <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider">THE SOLUTION</h4>
                            </div>
                            <p className="text-white text-sm leading-relaxed">{academicProject.solution}</p>
                          </div>
                        </div>
                        
                        <div className="bg-orange-500/5 rounded-xl p-5 border border-orange-500/20">
                          <div className="flex items-center gap-2 mb-4">
                            <Users className="w-5 h-5 text-orange-400" />
                            <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider">MY ROLE & CONTRIBUTIONS</h4>
                          </div>
                          <ul className="space-y-3">
                            {academicProject.myRole.map((role, i) => (
                              <li key={i} className="text-sm text-white flex items-start gap-3">
                                <span className="text-orange-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                                <span>{role}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">CURRENT PROGRESS</h4>
                          </div>
                          <div className="grid md:grid-cols-2 gap-3">
                            {academicProject.progress.map((item, i) => (
                              <div key={i} className="flex items-start gap-3 text-sm text-white bg-emerald-500/5 rounded-lg p-3 border border-emerald-500/20">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </AnimatedSection>

            {/* PRARAMBH AI - Same fix applied */}
            <AnimatedSection className="mb-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Currently Building</h2>
              </div>
              
              <Card className="bg-[#0f2638]/80 backdrop-blur-sm border-white/10 hover:border-blue-500/30">
                <div className={`h-1 bg-gradient-to-r ${futureProject.gradient}`} />
                
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${futureProject.gradient} flex items-center justify-center shadow-lg`}>
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-3xl font-bold bg-gradient-to-r ${futureProject.gradient} bg-clip-text text-transparent`}>
                      {futureProject.title}
                    </h3>
                    <span className="bg-blue-500/20 text-blue-400 text-xs font-bold uppercase px-3 py-1 rounded-full border border-blue-500/30 flex items-center gap-1.5">
                      <TrendingUp size={12} /> IN PROGRESS
                    </span>
                  </div>
                  <p className="text-sm font-medium text-cyan-400 mb-2 italic">{futureProject.subtitle}</p>
                  <p className="text-white text-base leading-relaxed mb-6">{futureProject.tagline}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {futureProject.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-slate-700/40 text-slate-200 rounded-lg text-xs border border-slate-600/30 hover:bg-slate-600/50 transition-all cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="bg-yellow-500/5 rounded-xl p-4 border border-yellow-500/20 mb-6">
                    <p className="text-sm text-white">
                      <span className="font-bold text-yellow-400 flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4" />
                        Why I'm Building This:
                      </span>
                      {futureProject.purpose}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-emerald-500/10 rounded-xl p-5 border border-emerald-500/20">
                      <p className="text-xs font-bold text-emerald-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 size={14} /> Completed
                      </p>
                      <p className="text-sm text-white leading-relaxed">{futureProject.completed}</p>
                    </div>
                    <div className="bg-amber-500/10 rounded-xl p-5 border border-amber-500/20">
                      <p className="text-xs font-bold text-amber-400 mb-3 flex items-center gap-2">
                        <TrendingUp size={14} /> Pending
                      </p>
                      <p className="text-sm text-white leading-relaxed">{futureProject.pending}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center flex-wrap gap-4 pt-4 border-t border-slate-700/40">
                    <div className="flex gap-4">
                      <a 
                        href={futureProject.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105"
                      >
                        <ExternalLink size={16} /> Preview (Frontend)
                      </a>
                      <a 
                        href={futureProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-slate-700/60 text-white rounded-xl text-sm font-bold hover:bg-slate-600/60 transition-all border border-slate-600/40 hover:scale-105"
                      >
                        <Github size={16} /> GitHub
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white">
                      <Calendar size={16} className="text-green-400" />
                      <span>Expected: 2026</span>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* TECH STACK GRID */}
            <AnimatedSection className="mt-20">
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-block mb-6"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/20">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">Tech Stack Across Projects</h3>
                <p className="text-slate-400">Technologies powering my development journey</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techStackGrid.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                    whileHover={{ y: -10, scale: 1.03 }}
                  >
                    <Card className="bg-[#0f2638]/80 backdrop-blur-sm border-white/10 h-full p-6 cursor-default hover:bg-[#132d42]/90 hover:border-violet-500/30 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                          {category.icon}
                        </div>
                        <h4 className="text-lg font-bold text-white">{category.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1.5 bg-slate-700/40 text-slate-200 rounded-lg text-xs font-medium border border-slate-600/30 hover:bg-slate-600/50 hover:scale-105 transition-all cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Card>
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
