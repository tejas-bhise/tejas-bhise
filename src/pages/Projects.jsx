import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown, ChevronUp, Calendar, Users, Award } from 'lucide-react';
import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleProject = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  // COMPLETED PROJECTS
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

  // FINAL YEAR PROJECT
  const academicProject = {
    id: 3,
    title: "FedShield",
    subtitle: "Enhancing Security in Federated Learning through Anomaly-Based Backdoor Detection",
    type: "Final Year Project",
    tagline: "Detecting and preventing stealthy backdoor attacks in federated learning systems to ensure secure and trustworthy collaborative AI",
    technologies: ["Python", "Federated Learning (Flower)", "PyTorch/TensorFlow", "CNN", "Anomaly Detection", "CIFAR-10", "MNIST", "Streamlit"],
    github: null,
    live: null,
    status: "In Development",
    expectedCompletion: "2026",
    supervisor: "Prof. Rahul Patil",
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
      "Backdoor attack (BadNets) implementation in progress",
      "Anomaly-based 'Guardian' defense design finalized",
      "Experimental evaluation pipeline defined"
    ],
    recognition: "Novel functional-analysis-based defense mechanism proposed as core contribution"
  };

  // IN PROGRESS PROJECT
  const futureProject = {
    id: 4,
    title: "Prarambh AI",
    subtitle: "Startup ideas to blueprint in 60 sec…",
    type: "In Progress",
    tagline: "Helping founders convert raw startup ideas into validated, execution-ready blueprints within minutes",
    technologies: ["Python", "FastAPI", "LLM APIs", "JavaScript", "React", "Dashboard UI", "Database (TBD)"],
    github: "https://github.com/tejas-bhise/pararambh-frontend",
    live: "https://pararambh-frontend.vercel.app",
    status: "Frontend Complete, Backend Pending",
    expectedCompletion: "2026",
    purpose: "To address the 'zero-to-one' gap where founders fail due to lack of idea validation, strategy, and guidance before building.",
    completed: "Frontend dashboard UI designed and implemented with responsive layout and structured workflows",
    pending: "Backend API development, LLM integration, database design, and deployment"
  };

  // TECH STACK - 3x3 GRID (9 CATEGORIES)
  const techStackGrid = [
    {
      category: "Languages",
      icon: "💻",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      items: ["Python", "JavaScript", "SQL"]
    },
    {
      category: "Backend",
      icon: "⚙️",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      items: ["FastAPI", "RESTful APIs"]
    },
    {
      category: "Frontend",
      icon: "🎨",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-700",
      items: ["React", "Three.js", "Streamlit"]
    },
    {
      category: "AI & LLMs",
      icon: "🤖",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      items: ["Google Gemini API", "STT/TTS APIs"]
    },
    {
      category: "Machine Learning",
      icon: "🧠",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      items: ["PyTorch", "TensorFlow", "CNN", "Anomaly Detection", "CIFAR-10", "MNIST"]
    },
    {
      category: "Federated Learning Frameworks",
      icon: "🔬",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      items: ["Flower Framework"]
    },
    {
      category: "Databases",
      icon: "📊",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      items: ["SQLite (in-memory)"]
    },
    {
      category: "Deployment",
      icon: "🚀",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      items: ["Vercel", "Render"]
    },
    {
      category: "Version Control",
      icon: "🔧",
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      textColor: "text-gray-700",
      items: ["Git", "GitHub"]
    }
  ];

  // Check if any completed project is expanded
  const isAnyCompletedExpanded = completedProjects.some(p => p.id === expandedProject);

  return (
    <PageWrapper>
      <section className="pt-32 pb-20">
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              My Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              AI-powered applications and full-stack solutions built with modern technologies
            </p>
            <p className="text-sm text-gray-500 italic max-w-3xl mx-auto">
              I focus on building practical, real-world projects that solve meaningful problems and are fully completed and deployed
            </p>
          </motion.div>
        </div>

        {/* FEATURED PROJECTS - COMPLETED (Dynamic Grid) */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
          </div>

          {/* Dynamic Grid: 2-column when collapsed, 1-column when expanded */}
          <div className={`grid gap-6 ${isAnyCompletedExpanded ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
            {completedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                layout
              >
                <Card className="bg-white/90 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                  {/* COLLAPSED VIEW */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                          <span className="bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                            ✓ Live
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{project.type}</p>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">
                          {project.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-3 mb-4">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                          >
                            <Github className="w-4 h-4" />
                            GitHub
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => toggleProject(project.id)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium w-full justify-center border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        {expandedProject === project.id ? (
                          <>
                            Less Details
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Details
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* EXPANDED VIEW */}
                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                          {/* Problem & Solution */}
                          <div className="space-y-4 mb-6">
                            <div>
                              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                The Problem
                              </h4>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {project.problem}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                The Solution
                              </h4>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {project.solution}
                              </p>
                            </div>
                          </div>

                          {/* My Role */}
                          <div className="mb-6">
                            <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                              My Role & Contributions
                            </h4>
                            <ul className="space-y-2">
                              {project.myRole.map((role, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-indigo-600 mt-1">•</span>
                                  <span>{role}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technical Challenge */}
                          <div className="mb-6 bg-purple-50 rounded-xl p-4">
                            <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider mb-2">
                              Key Technical Challenge Overcome
                            </h4>
                            <p className="text-sm text-purple-900">
                              {project.technicalChallenge}
                            </p>
                          </div>

                          {/* Key Features - 3x2 Grid */}
                          <div className="mb-6">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                              Key Features
                            </h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {project.features.map((feature, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                  <span className="text-gray-400 mt-1">→</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Status & Impact - Inline */}
                          <div className="space-y-2 text-sm">
                            <p className="text-gray-700">
                              <span className="font-semibold text-gray-900">Status:</span> {project.status}
                            </p>
                            <p className="text-gray-700">
                              <span className="font-semibold text-gray-900">Impact:</span> {project.impact}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ACADEMIC PROJECT - FINAL YEAR */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-orange-600 to-red-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Academic Project</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm overflow-hidden">
              {/* COLLAPSED VIEW */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl font-bold text-gray-900">{academicProject.title}</h3>
                      <span className="bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                        In Development
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-2">{academicProject.subtitle}</p>
                    <p className="text-xs text-gray-500 mb-3">{academicProject.type}</p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {academicProject.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {academicProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{academicProject.supervisor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Expected: {academicProject.expectedCompletion}</span>
                  </div>
                </div>

                {academicProject.recognition && (
                  <div className="flex items-start gap-2 mb-4 bg-yellow-50 rounded-lg p-3">
                    <Award className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-900">{academicProject.recognition}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Status:</span> {academicProject.status}
                  </div>

                  <button
                    onClick={() => toggleProject(academicProject.id)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    {expandedProject === academicProject.id ? (
                      <>
                        Less Details
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Details
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* EXPANDED VIEW */}
              <AnimatePresence>
                {expandedProject === academicProject.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                      {/* Problem & Solution */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            The Problem
                          </h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {academicProject.problem}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            The Solution
                          </h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {academicProject.solution}
                          </p>
                        </div>
                      </div>

                      {/* My Role */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-3">
                          My Role & Contributions
                        </h4>
                        <ul className="space-y-2">
                          {academicProject.myRole.map((role, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-orange-600 mt-1">•</span>
                              <span>{role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Current Progress */}
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                          Current Progress
                        </h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {academicProject.progress.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-green-600 mt-1">✓</span>
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
          </motion.div>
        </div>

        {/* FUTURE PROJECT - IN DEVELOPMENT */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Currently Building</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl font-bold text-gray-900">{futureProject.title}</h3>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                        In Progress
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-2">{futureProject.subtitle}</p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {futureProject.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {futureProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-semibold text-gray-900">Why I'm Building This:</span> {futureProject.purpose}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-green-900 mb-1">✓ Completed</p>
                    <p className="text-sm text-green-800">{futureProject.completed}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-orange-900 mb-1">⏳ Pending</p>
                    <p className="text-sm text-orange-800">{futureProject.pending}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex gap-3 flex-wrap">
                    {futureProject.live && (
                      <a
                        href={futureProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Preview (Frontend)
                      </a>
                    )}
                    {futureProject.github && (
                      <a
                        href={futureProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Expected: {futureProject.expectedCompletion}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* TECH STACK - PROFESSIONAL 3x3 GRID */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Tech Stack Across Projects</h3>
            <p className="text-sm text-gray-600">Complete technology stack used in my projects</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStackGrid.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <Card className="bg-white/90 backdrop-blur-sm h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    {/* Category Header with Icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-xl`}>
                        {category.icon}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">{category.category}</h4>
                    </div>
                    
                    {/* Tech Items */}
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1.5 ${category.bgColor} ${category.textColor} rounded-lg text-xs font-medium hover:scale-105 transition-transform duration-200`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Projects;
