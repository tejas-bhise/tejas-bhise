import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Sparkles, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import { PROJECTS } from '../data/projects';

const Home = ({ setPage }) => {
  const [japaneseExpanded, setJapaneseExpanded] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);

  return (
    <PageWrapper>
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center pt-20 pb-32">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full text-sm text-gray-700 font-medium mb-8 shadow-lg border border-gray-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Open to Full-Time & Internship Opportunities
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Tejas Bhise
            </h1>
            
            <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 font-bold mb-8">
              Python Backend & AI Engineer
            </p>
            
            <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Building AI-powered backend systems using Python, FastAPI, and LLMs. Focused on developing practical, scalable solutions for real-world problems.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <button 
                onClick={() => setPage('projects')}
                className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 group shadow-lg shadow-gray-900/20"
              >
                View All Projects 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setPage('resume')}
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-900"
              >
                Download Resume
              </button>
            </div>

            <div className="flex gap-4 justify-center">
              <a 
                href="https://github.com/tejas-bhise" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-white hover:bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 transition-all shadow-md border border-gray-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/tejas-bhise" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-white hover:bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 transition-all shadow-md border border-gray-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:tejasbhise1013@gmail.com" 
                className="w-12 h-12 bg-white hover:bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 transition-all shadow-md border border-gray-200"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Recognition & Impact</h2>
          <p className="text-gray-600">Achievements that demonstrate innovation, leadership, and commitment to excellence</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card hover={false} className="bg-white/90 backdrop-blur-sm border-2 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Copyright Holder</h3>
                <p className="text-gray-600 text-sm font-medium mb-2">Local E-Connect</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-2">
                  Platform designed to empower small local vendors by connecting them with broader markets and customers, helping increase their sales and business growth
                </p>
                <p className="text-gray-400 text-xs">Reg. No: L-133251/2023</p>
              </div>
            </div>
          </Card>

          <Card hover={false} className="bg-white/90 backdrop-blur-sm border-2 border-indigo-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Grand Finalist</h3>
                <p className="text-gray-600 text-sm font-medium mb-2">Yophoria Innovation Challenge 2025</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-2">
                  Recognized for reaching the Grand Finale of India's premier AI Innovation Challenge focused on solving real-world problems in AI Agent Engineering
                </p>
                <p className="text-gray-400 text-xs">Organized by YoLearn.ai & GLA University</p>
              </div>
            </div>
          </Card>

          <Card hover={false} className="bg-white/90 backdrop-blur-sm border-2 border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Student Ambassador</h3>
                <p className="text-gray-600 text-sm font-medium mb-2">LetsUpgrade Community</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-2">
                  Served as Student Ambassador, achieving 30% increase in event participation by organizing technical workshops that reached 1000+ students
                </p>
                <p className="text-gray-400 text-xs">Gold Badge • Jul 2024 - Aug 2024</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-gray-600 text-lg">AI-powered applications solving real-world challenges</p>
        </div>
        
        <div className="space-y-8">
          {/* ClarifAiSQL */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">ClarifAiSQL</h3>
                  <span className="bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  AI-powered natural language to SQL converter with comprehensive explanations and instant results
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Next.js 15", "TypeScript", "FastAPI", "Python"].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  <strong>Deployment:</strong> Vercel (Frontend) & Render (Backend)
                </p>
              </div>
              
              <div className="md:col-span-2">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">The Challenge</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Non-technical users struggle to query databases without SQL knowledge, creating barriers to data access and insights.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">The Solution</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Built a comprehensive system that converts natural language to SQL, provides detailed explanations, shows the generated query, and returns instant results—all in one interface.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">•</span>
                      <span>Three-in-one output: SQL query, AI explanation, and direct results</span>
                    </li>
                    <li className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">•</span>
                      <span>CSV drag-and-drop for instant database creation</span>
                    </li>
                    <li className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">•</span>
                      <span>Real-time natural language to SQL conversion</span>
                    </li>
                    <li className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">•</span>
                      <span>Automated schema detection with Google Gemini API</span>
                    </li>
                    <li className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 mt-1">•</span>
                      <span>Educational approach helping users learn SQL through AI explanations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Saarthi */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Saarthi</h3>
                  <span className="bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  AI Learning Companion - Making quality education accessible through immersive 3D AI tutoring
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Three.js", "Google Gemini", "Node.js", "WebRTC"].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  <strong>Deployment:</strong> Vercel (Frontend) & Render (Backend)
                </p>
              </div>
              
              <div className="md:col-span-2">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">The Challenge</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Many students cannot afford private coaching classes and lack immediate assistance when doubts arise during self-study, hindering their learning progress.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">The Solution</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Created an accessible 3D AI tutor that provides instant doubt resolution through both voice and text interactions, offering personalized learning support anytime, anywhere.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-3">Technical Features</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>Interactive 3D avatar tutors with realistic lip-sync animation</span>
                    </li>
                    <li className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>Dual interaction modes: voice chat and text messaging</span>
                    </li>
                    <li className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>Real-time AI responses powered by Google Gemini 2.0 API</span>
                    </li>
                    <li className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>Collaborative whiteboard for visual learning and problem-solving</span>
                    </li>
                    <li className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>Session recording for review and continuous learning</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => setPage('projects')}
            className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all inline-flex items-center gap-2 group shadow-lg"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* CORE COMPETENCIES */}
      <section className="mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Core Competencies</h2>
          <p className="text-gray-600">Technical expertise and development capabilities</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Backend & AI Development */}
          <Card hover={false} className="bg-white/90 backdrop-blur-sm">
            <div className="mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Backend & AI Development</h4>
              <p className="text-sm text-gray-600 mb-4">Building scalable APIs and AI-powered applications</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                <span className="text-sm text-gray-700">Python & SQL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                <span className="text-sm text-gray-700">FastAPI Framework</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                <span className="text-sm text-gray-700">RESTful API Design</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                <span className="text-sm text-gray-700">Google Gemini API</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                <span className="text-sm text-gray-700">Prompt Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                <span className="text-sm text-gray-700">LLM Applications</span>
              </div>
            </div>
          </Card>

          {/* Data Science & ML */}
          <Card hover={false} className="bg-white/90 backdrop-blur-sm">
            <div className="mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Data Science & ML</h4>
              <p className="text-sm text-gray-600 mb-4">Data analysis and machine learning fundamentals</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-pink-600 rounded-full"></span>
                <span className="text-sm text-gray-700">NumPy & Pandas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-pink-600 rounded-full"></span>
                <span className="text-sm text-gray-700">scikit-learn</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-pink-600 rounded-full"></span>
                <span className="text-sm text-gray-700">Matplotlib & Seaborn</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-pink-600 rounded-full"></span>
                <span className="text-sm text-gray-700">Exploratory Data Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-pink-600 rounded-full"></span>
                <span className="text-sm text-gray-700">Model Training & Evaluation</span>
              </div>
            </div>
          </Card>

          {/* Development Tools */}
          <Card hover={false} className="bg-white/90 backdrop-blur-sm">
            <div className="mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Development Tools</h4>
              <p className="text-sm text-gray-600 mb-4">Version control and cloud deployment</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                <span className="text-sm text-gray-700">Git & GitHub</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                <span className="text-sm text-gray-700">VS Code</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                <span className="text-sm text-gray-700">Vercel & Render</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                <span className="text-sm text-gray-700">Jupyter Notebook</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                <span className="text-sm text-gray-700">Google Colab</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* JAPANESE SECTION - FINAL POLISHED */}
      <section className="mb-32">
        <Card className="bg-gradient-to-br from-red-50 via-white to-red-50 border-2 border-red-100">
          <button 
            onClick={() => setJapaneseExpanded(!japaneseExpanded)}
            className="w-full flex items-center justify-between p-6 hover:bg-red-50/50 transition-colors rounded-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  日本企業の採用担当者様へ
                  <span className="text-sm font-normal text-gray-600">(For Japanese Recruiters)</span>
                </h3>
                
              </div>
            </div>
            {japaneseExpanded ? (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            )}
          </button>

          {japaneseExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-6"
            >
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setShowEnglish(!showEnglish)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    {showEnglish ? '日本語で表示' : 'English'}
                  </button>
                </div>

                {!showEnglish ? (
                  // JAPANESE VERSION
                  <div className="space-y-6 leading-relaxed text-gray-800">
                    <div className="text-center mb-6">
                      <p className="text-xl font-bold text-gray-900 mb-2">
                        テジャス・ビーゼ | 2026年卒業予定
                      </p>
                      <p className="text-sm text-gray-600">
                        Pythonバックエンドエンジニア & AI開発者
                      </p>
                    </div>

                    {/* Core Strengths */}
                    <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-600">
                      <h4 className="font-bold text-red-900 mb-3">🎯 即戦力となる3つの強み</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">1. 実践的な技術力</p>
                          <p className="text-xs text-gray-700">Python、FastAPI、Google Gemini APIで2つの本番アプリを開発・デプロイ済み。実務経験があり、すぐに貢献できます。</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">2. 諦めない精神（根性）</p>
                          <p className="text-xs text-gray-700 mb-1">失敗しても「もう一度」と挑戦を続け、品質基準を満たすまで改善します。全プロジェクトを期限内に完了。</p>
                          <p className="text-xs text-gray-600 italic">この姿勢は日本の「七転び八起き」の精神に通じるものです。</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">3. グローバル視点</p>
                          <p className="text-xs text-gray-700">多文化・国際チームでの協働に前向きで、多様な視点を問題解決に活かせます。</p>
                        </div>
                      </div>
                    </div>

                    {/* Work Style */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-sm">🏢 日本の働き方への理解</h4>
                      <div className="space-y-3">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-blue-900 mb-1">ホウレンソウ（報・連・相）</p>
                          <p className="text-xs text-blue-800">1000名以上の学生を指導した経験から、問題が大きくなる前に報告・連絡・相談する重要性を理解しています。</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-green-900 mb-1">体系的なタスク管理</p>
                          <p className="text-xs text-green-800">複雑なタスクを管理可能なサブタスクに分割し、各段階でタイムラインを設定。品質管理を維持しながら期限内に納品します。</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-purple-900 mb-1">ドキュメントと品質への注力</p>
                          <p className="text-xs text-purple-800">包括的なコードドキュメントを維持し、急いで作るのではなく、クリーンで保守可能なコードを優先します。引き継ぐチームメンバーが理解しやすいコードを書きます。</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-orange-900 mb-1">長期的なコミットメント</p>
                          <p className="text-xs text-orange-800">短期的な転職は考えていません。御社で何年も働き、経験豊富な先輩方から学びながら、プロジェクトに貢献し、技術的にも人間的にも成長したいと考えています。</p>
                        </div>
                      </div>
                    </div>

                    {/* My Work Attitude */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5">
                      <h4 className="font-bold text-gray-900 mb-2 text-sm">My Work Attitude and Mindset</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        開発中、何度もエラーに直面し、落ち込むこともありました。しかし諦めず「もう一度だけ」と挑戦を続け、失敗を学びの機会としました。
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>「不可能」と言われた時の私の姿勢：</strong>
                      </p>
                      <ul className="text-xs text-gray-700 space-y-1 ml-4">
                        <li>• 盲目的に信じず、自分で試して確認します</li>
                        <li>• 失敗しても、根本原因について貴重な知識を得られます</li>
                        <li>• 成功すれば、決意と問題解決能力を証明できます</li>
                      </ul>
                      <p className="text-sm text-gray-700 mt-3">
                        この<strong>粘り強さ、独立した思考、計画的な実行力</strong>の組み合わせが、すべてのプロジェクトを完成させる原動力です。
                      </p>
                    </div>

                    {/* Commitment */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-sm">御社へのお約束</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>謙虚な学習姿勢：</strong>基本的な業務から始め、先輩方から段階的に学ぶ姿勢があります</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>長期的なコミットメント：</strong>踏み台としての転職は考えていません。御社で長期的なキャリアを築くことを目指しています</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>日本への移住準備完了：</strong>日本に移住し、現地の職場文化と慣習に完全に適応する準備ができています</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>日本語学習：</strong>職場でのコミュニケーションと継続的な改善のため、日本語学習に取り組みます</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>就労ビザ：</strong>日本での長期雇用のためのスポンサーシップを希望しています</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>柔軟な勤務形態：</strong>会社のニーズに応じて、リモート、ハイブリッド、オフィス勤務いずれにも対応可能です</span>
                        </li>
                      </ul>
                    </div>

                    {/* Final Message */}
                    <div className="border-t-2 border-red-600 pt-5 text-center">
                      <p className="text-sm text-gray-700 mb-3">
                        御社で働く機会をいただければ、日本の「ものづくり」精神を学びながら、技術で貢献いたします。
                      </p>
                      <p className="text-2xl font-bold text-red-900 mb-2">
                        一生懸命頑張ります
                      </p>
                      <p className="text-xs text-gray-600">
                        I will do my very best with all my heart
                      </p>
                      <p className="text-xs text-gray-500 mt-3">
                        どうぞよろしくお願いいたします
                      </p>
                    </div>
                  </div>
                ) : (
                  // ENGLISH VERSION
                  <div className="space-y-6 leading-relaxed text-gray-800">
                    <div className="text-center mb-6">
                      <p className="text-xl font-bold text-gray-900 mb-2">
                        Tejas Bhise | Graduating 2026
                      </p>
                      <p className="text-sm text-gray-600">
                        Python Backend Engineer & AI Developer
                      </p>
                    </div>

                    {/* Core Strengths */}
                    <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-600">
                      <h4 className="font-bold text-red-900 mb-3">🎯 3 Core Strengths</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">1. Practical Technical Skills</p>
                          <p className="text-xs text-gray-700">Developed & deployed 2 production apps using Python, FastAPI, Google Gemini API. Able to contribute quickly with practical experience.</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">2. Never-Give-Up Spirit (根性 - Konjou)</p>
                          <p className="text-xs text-gray-700 mb-1">When facing errors and setbacks, I tell myself "one more time" and persist until completion. I continuously refine my work until it meets high quality standards. Projects are consistently delivered on deadline.</p>
                          <p className="text-xs text-gray-600 italic">This mindset reflects the Japanese concept of 七転び八起き (fall seven times, stand up eight).</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">3. Global Perspective</p>
                          <p className="text-xs text-gray-700">Open to working with multicultural and international teams, contributing diverse viewpoints to collaborative problem-solving.</p>
                        </div>
                      </div>
                    </div>

                    {/* Work Style */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-sm">🏢 Understanding of Japanese Work Culture</h4>
                      <div className="space-y-3">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-blue-900 mb-1">Horenso (報・連・相)</p>
                          <p className="text-xs text-blue-800">From mentoring 1000+ students, I understand the importance of proactive reporting, timely updates, and seeking guidance when needed—not waiting until problems escalate.</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-green-900 mb-1">Structured Task Management</p>
                          <p className="text-xs text-green-800">Break complex tasks into manageable subtasks with timelines for each, ensuring on-time delivery while maintaining quality control at every step.</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-purple-900 mb-1">Documentation & Quality Excellence</p>
                          <p className="text-xs text-purple-800">Maintain comprehensive code documentation and prioritize clean, maintainable code over rushed solutions. Code should be understandable by team members who inherit it.</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-orange-900 mb-1">Long-term Commitment</p>
                          <p className="text-xs text-orange-800">Not seeking quick job changes. Want to grow technically and personally within the company for years to come, contributing to projects while learning from experienced colleagues.</p>
                        </div>
                      </div>
                    </div>

                    {/* My Work Attitude */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5">
                      <h4 className="font-bold text-gray-900 mb-2 text-sm">My Work Attitude and Mindset</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        During development, I encountered countless errors and felt discouraged many times. But instead of quitting, I adopted a "one more time" mindset—each failure became a learning opportunity.
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>My approach when told "it's impossible":</strong>
                      </p>
                      <ul className="text-xs text-gray-700 space-y-1 ml-4">
                        <li>• Don't blindly believe—verify through my own attempt</li>
                        <li>• If I fail, I gain valuable knowledge about the root cause</li>
                        <li>• If I succeed, I've proven determination and problem-solving ability</li>
                      </ul>
                      <p className="text-sm text-gray-700 mt-3">
                        This combination of <strong>persistence, independent thinking, and systematic planning</strong> enables me to complete every project I start.
                      </p>
                    </div>

                    {/* Commitment */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 text-sm">My Commitment to Your Company</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>Humble Learning Attitude:</strong> Willing to start from basic tasks and learn step by step from senior team members</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>Long-term Commitment:</strong> Not looking for stepping-stone positions. Aim to build a long-term career within the company</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>Relocation Ready:</strong> Prepared to move to Japan and fully adapt to local work culture and practices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>Japanese Language:</strong> Committed to learning Japanese for workplace communication and continuous improvement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>Work Visa:</strong> Seeking sponsorship for long-term employment in Japan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">✓</span>
                          <span className="text-gray-700"><strong>Work Flexibility:</strong> Available for remote, hybrid, or office-based arrangements as per company needs</span>
                        </li>
                      </ul>
                    </div>

                    {/* Final Message */}
                    <div className="border-t-2 border-red-600 pt-5 text-center">
                      <p className="text-sm text-gray-700 mb-3">
                        If given the opportunity, I will learn the Japanese "Monozukuri" spirit and contribute through technology.
                      </p>
                      <p className="text-2xl font-bold text-red-900 mb-2">
                        一生懸命頑張ります
                      </p>
                      <p className="text-xs text-gray-600">
                        I will do my very best with all my heart
                      </p>
                      <p className="text-xs text-gray-500 mt-3">
                        どうぞよろしくお願いいたします
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </Card>
      </section>

      {/* CALL TO ACTION */}
      <section className="mb-20">
        <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-center">
          <div className="py-12 px-6">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Something Great Together</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Actively seeking full-time roles and internships in AI, backend development, and data science. Open to opportunities in India and internationally, including Japan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="mailto:tejasbhise1013@gmail.com"
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                Get In Touch
              </a>
              <button 
                onClick={() => setPage('resume')}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                View Resume
              </button>
            </div>
          </div>
        </Card>
      </section>
    </PageWrapper>
  );
};

export default Home;
