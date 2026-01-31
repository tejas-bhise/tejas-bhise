import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles, 
  Globe, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { useState, useRef } from 'react';

// ========================================
// 内部コンポーネント
// ========================================
const PageWrapper = ({ children }) => (
  <main className="min-h-screen w-full bg-[#050A15] text-slate-50 overflow-x-hidden">
    {children}
  </main>
);

const Card = ({ children, className = "", style = {} }) => (
  <div 
    className={`rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 ${className}`}
    style={style}
  >
    {children}
  </div>
);

// ========================================
// デザインシステム
// ========================================
const designTokens = {
  bgHero: '#050A15',
  bgRecognition: 'linear-gradient(180deg, #0A1018 0%, #0D1520 50%, #101A28 100%)',
  bgProjects: 'linear-gradient(180deg, #101A28 0%, #131F30 50%, #162438 100%)',
  bgCompetencies: 'linear-gradient(180deg, #162438 0%, #192940 50%, #1C2E48 100%)',
  bgCta: 'linear-gradient(180deg, #0D1520 0%, #050A15 100%)',
  
  textPrimary: '#F8FAFC',
  textSecondary: '#E2E8F0',
  textMuted: '#94A3B8',
  
  accentViolet: '#8B5CF6',
  accentCyan: '#22D3EE',
  accentBlue: '#3B82F6',
};

// ========================================
// アニメーション設定
// ========================================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

// ========================================
// アニメーション付きセクションラッパー
// ========================================
const AnimatedSection = ({ children, className = '', style = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// ========================================
// メインコンポーネント
// ========================================
const Home = ({ setPage }) => {
  const [japaneseExpanded, setJapaneseExpanded] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);

  return (
    <PageWrapper>
      
      {/* HERO SECTION */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 50%, rgba(30, 41, 82, 0.3) 0%, ${designTokens.bgHero} 60%)`,
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(5,10,21,0.8), rgba(5,10,21,0.8))' }} />
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div 
          className="container mx-auto px-6 relative z-10"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-medium tracking-wide text-white">Open to Full-Time & Internship Opportunities</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-5 leading-tight tracking-tight text-white">
              Tejas <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Bhise</span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-5 text-white/90">
              Python Backend <span className="text-violet-400">& AI Engineer</span>
            </p>
            
            <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-white/80">
              Building AI-powered backend systems using Python, FastAPI, and LLMs. Focused on developing practical, scalable solutions for real-world problems.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <button
                onClick={() => setPage('projects')}
                className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg hover:shadow-violet-500/30 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                View All Projects <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage('resume')}
                className="px-8 py-4 rounded-xl font-bold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:-translate-y-1"
              >
                Download Resume
              </button>
            </div>

            <div className="flex gap-4 justify-center">
              {[
                { icon: Github, href: 'https://github.com/tejas-bhise' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/tejas-bhise' },
                { icon: Mail, href: 'mailto:tejasbhise1013@gmail.com' }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all hover:-translate-y-1">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/30"><ChevronDown /></div>
      </section>

      {/* RECOGNITION & IMPACT (Equal Boxes) */}
      <section className="relative py-24" style={{ background: designTokens.bgRecognition }}>
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Recognition <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">& Impact</span></h2>
            <p className="text-lg text-white/80">Achievements that demonstrate innovation, leadership, and commitment to excellence</p>
          </AnimatedSection>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {[
              { icon: '🏆', title: 'Copyright Holder', subtitle: 'Local E-Connect', description: 'Platform designed to empower small local vendors by connecting them with broader markets and customers, helping increase their sales and business growth', detail: 'Reg. No: L-133251/2023', gradient: 'from-amber-400 to-orange-500' },
              { icon: '⭐', title: 'Grand Finalist', subtitle: 'Yophoria Innovation Challenge 2025', description: 'Recognized for reaching the Grand Finale of India\'s premier AI Innovation Challenge focused on solving real-world problems in AI Agent Engineering', detail: 'Organized by YoLearn.ai & GLA University', gradient: 'from-violet-400 to-purple-500' },
              { icon: '👥', title: 'Student Ambassador', subtitle: 'LetsUpgrade Community', description: 'Served as Student Ambassador, achieving 30% increase in event participation by organizing technical workshops that reached 1000+ students', detail: 'Gold Badge • Jul 2024 - Aug 2024', gradient: 'from-teal-400 to-cyan-500' }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex">
                <Card className="flex-1 p-8 bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-sm hover:-translate-y-1 hover:shadow-white/[0.05] flex flex-col">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-gradient-to-br ${item.gradient} text-white shadow-lg`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-sm font-semibold mb-3 text-white/80">{item.subtitle}</p>
                  <p className="text-sm mb-4 leading-relaxed text-white/80 flex-grow">{item.description}</p>
                  <p className="text-xs font-mono text-white/60 mt-auto">{item.detail}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative py-24" style={{ background: designTokens.bgProjects }}>
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-white/80 text-lg">AI-powered applications solving real-world challenges</p>
          </AnimatedSection>
          
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* ClarifAiSQL */}
            <AnimatedSection>
              <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-md p-8 hover:-translate-y-1">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">ClarifAiSQL</h3>
                      <span className="bg-emerald-400/20 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-400/30">Completed</span>
                    </div>
                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                      AI-powered natural language to SQL converter with comprehensive explanations and instant results
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Next.js 15", "TypeScript", "FastAPI", "Python"].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-white/5 text-white/60 border border-white/10 rounded-lg text-xs font-medium">{tech}</span>
                      ))}
                    </div>
                    <p className="text-[11px] text-white/60">
                      <strong>Deployment:</strong> Vercel (Frontend) & Render (Backend)
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">The Challenge</h4>
                        <p className="text-white/80 text-sm leading-relaxed">Non-technical users struggle to query databases without SQL knowledge, creating barriers to data access and insights.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">The Solution</h4>
                        <p className="text-white/80 text-sm leading-relaxed">Built a comprehensive system that converts natural language to SQL, provides detailed explanations, shows the generated query, and returns instant results—all in one interface.</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {[
                          'Three-in-one output: SQL query, AI explanation, and direct results',
                          'CSV drag-and-drop for instant database creation',
                          'Real-time natural language to SQL conversion',
                          'Automated schema detection with Google Gemini API',
                          'Educational approach helping users learn SQL through AI explanations'
                        ].map((feature, idx) => (
                          <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                            <span className="text-indigo-400">•</span> <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* Saarthi */}
            <AnimatedSection>
              <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-md p-8 hover:-translate-y-1">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">Saarthi</h3>
                      <span className="bg-emerald-400/20 text-emerald-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-400/30">Completed</span>
                    </div>
                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                      AI Learning Companion - Making quality education accessible through immersive 3D AI tutoring
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Three.js", "Google Gemini", "Node.js", "WebRTC"].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-white/5 text-white/60 border border-white/10 rounded-lg text-xs font-medium">{tech}</span>
                      ))}
                    </div>
                    <p className="text-[11px] text-white/60">
                      <strong>Deployment:</strong> Vercel (Frontend) & Render (Backend)
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">The Challenge</h4>
                        <p className="text-white/80 text-sm leading-relaxed">Many students cannot afford private coaching classes and lack immediate assistance when doubts arise during self-study, hindering their learning progress.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">The Solution</h4>
                        <p className="text-white/80 text-sm leading-relaxed">Created an accessible 3D AI tutor that provides instant doubt resolution through both voice and text interactions, offering personalized learning support anytime, anywhere.</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-3">Technical Features</h4>
                      <ul className="space-y-2">
                        {[
                          'Interactive 3D avatar tutors with realistic lip-sync animation',
                          'Dual interaction modes: voice chat and text messaging',
                          'Real-time AI responses powered by Google Gemini 2.0 API',
                          'Collaborative whiteboard for visual learning and problem-solving',
                          'Session recording for review and continuous learning'
                        ].map((feature, idx) => (
                          <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                            <span className="text-purple-400">•</span> <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>

          <div className="text-center mt-12">
            <button onClick={() => setPage('projects')} className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold shadow-lg hover:shadow-white/20 transition-all flex items-center gap-2 mx-auto group">
              View All Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CORE COMPETENCIES */}
      <section className="relative py-24" style={{ background: designTokens.bgCompetencies }}>
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Core <span className="text-cyan-400">Competencies</span></h2>
            <p className="text-lg text-white/60 mt-4 leading-relaxed">Technical expertise and development capabilities</p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                icon: '⚙️', 
                title: 'Backend & AI Development', 
                subtitle: 'Building scalable APIs and AI-powered applications',
                skills: ['Python & SQL', 'FastAPI Framework', 'RESTful API Design', 'Google Gemini API', 'Prompt Engineering', 'LLM Applications'], 
                gradient: 'from-indigo-600 to-blue-600' 
              },
              { 
                icon: '📊', 
                title: 'Data Science & ML', 
                subtitle: 'Data analysis and machine learning fundamentals',
                skills: ['NumPy & Pandas', 'scikit-learn', 'Matplotlib & Seaborn', 'Exploratory Data Analysis', 'Model Training & Evaluation'], 
                gradient: 'from-purple-600 to-indigo-600' 
              },
              { 
                icon: '☁️', 
                title: 'Development Tools', 
                subtitle: 'Version control and cloud deployment',
                skills: ['Git & GitHub', 'VS Code', 'Vercel & Render', 'Jupyter Notebook', 'Google Colab'], 
                gradient: 'from-blue-600 to-cyan-600' 
              }
            ].map((item, i) => (
              <Card key={i} className="p-8 bg-white/5 border border-white/10 hover:bg-white/10">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 bg-gradient-to-br ${item.gradient} text-white shadow-lg`}>
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold mb-2 text-white">{item.title}</h4>
                <p className="text-xs text-white/50 mb-5 leading-relaxed">{item.subtitle}</p>
                <ul className="space-y-3">
                  {item.skills.map((s, j) => (
                    <li key={j} className="text-sm text-white/70 flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* JAPANESE SECTION - FINAL POLISHED */}
      <section className="container mx-auto px-6 mb-32">
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

          <AnimatePresence>
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
                          <li className="flex items-start gap-2"><span className="text-red-600 font-bold">✓</span> <span className="text-gray-700"><strong>謙虚な学習姿勢：</strong>基本的な業務から始め、先輩方から段階的に学ぶ姿勢があります</span></li>
                          <li className="flex items-start gap-2"><span className="text-red-600 font-bold">✓</span> <span className="text-gray-700"><strong>長期的なコミットメント：</strong>踏み台としての転職は考えていません。御社で長期的なキャリアを築くことを目指しています</span></li>
                          <li className="flex items-start gap-2"><span className="text-red-600 font-bold">✓</span> <span className="text-gray-700"><strong>日本への移住準備完了：</strong>日本に移住し、現地の職場文化と慣習に完全に適応する準備ができています</span></li>
                          <li className="flex items-start gap-2"><span className="text-red-600 font-bold">✓</span> <span className="text-gray-700"><strong>日本語学習：</strong>職場でのコミュニケーションと継続的な改善のため、日本語学習に取り組みます</span></li>
                          <li className="flex items-start gap-2"><span className="text-red-600 font-bold">✓</span> <span className="text-gray-700"><strong>就労ビザ：</strong>日本での長期雇用のためのスポンサーシップを希望しています</span></li>
                          <li className="flex items-start gap-2"><span className="text-red-600 font-bold">✓</span> <span className="text-gray-700"><strong>柔軟な勤務形態：</strong>会社のニーズに応じて、リモート、ハイブリッド、オフィス勤務いずれにも対応可能です</span></li>
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
                    // ENGLISH VERSION - FULL CONTENT RESTORED
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
          </AnimatePresence>
        </Card>
      </section>

      {/* CALL TO ACTION */}
      <section className="container mx-auto px-6 mb-20">
        <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-center">
          <div className="py-16 px-6">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Something Great Together</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Actively seeking full-time roles and internships in AI, backend development, and data science. Open to opportunities in India and internationally, including Japan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:tejasbhise1013@gmail.com" className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105">Get In Touch</a>
              <button onClick={() => setPage('resume')} className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-xl font-bold hover:bg-white/30 transition-all hover:scale-105">View Resume</button>
            </div>
          </div>
        </Card>
      </section>
    </PageWrapper>
  );
};

export default Home;