import { motion, useInView } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Download, 
  MapPin, 
  Calendar, 
  Award, 
  Star, 
  Code, 
  GraduationCap,
  Briefcase,
  Rocket,
  Trophy,
  Zap,
  BookOpen,
  Shield,
  Target,
  Users
} from 'lucide-react';
import { useRef } from 'react';
import PageWrapper from '../components/PageWrapper';

// AnimatedSection Component
const AnimatedSection = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Card Component
const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-white/10 overflow-hidden shadow-xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const Resume = ({ setPage }) => {
  const handleDownloadResume = () => {
    try {
      const link = document.createElement('a');
      link.href = '/Tejas_Bhise.pdf';
      link.download = 'Tejas_Bhise_Resume.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      window.open('/Tejas_Bhise.pdf', '_blank');
    }
  };

  const contactInfo = [
    { icon: Phone, label: '+91-8796872925', href: 'tel:+918796872925', gradient: 'from-green-500 to-emerald-500', bg: 'bg-green-500/10' },
    { icon: Mail, label: 'tejasbhise1013@gmail.com', href: 'mailto:tejasbhise1013@gmail.com', gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10' },
    { icon: Github, label: 'github.com/tejas-bhise', href: 'https://github.com/tejas-bhise', gradient: 'from-gray-400 to-gray-600', bg: 'bg-gray-500/10' },
    { icon: Linkedin, label: 'linkedin.com/in/tejas-bhise', href: 'https://www.linkedin.com/in/tejas-bhise', gradient: 'from-indigo-500 to-blue-600', bg: 'bg-indigo-500/10' }
  ];

  const skillCategories = [
    {
      title: "LANGUAGES",
      icon: Code,
      color: "from-blue-500 to-blue-600",
      skills: ["Python", "SQL", "JavaScript", "TypeScript"]
    },
    {
      title: "AI & ML",
      icon: Zap,
      color: "from-purple-500 to-purple-600",
      skills: ["Google Gemini API", "LLMs", "Prompt Engineering", "Machine Learning"]
    },
    {
      title: "BACKEND",
      icon: Shield,
      color: "from-green-500 to-green-600",
      skills: ["FastAPI", "Flask", "Node.js", "Express", "RESTful APIs"]
    },
    {
      title: "FRONTEND",
      icon: Rocket,
      color: "from-cyan-500 to-cyan-600",
      skills: ["React", "Next.js 15", "Three.js", "TailwindCSS"]
    },
    {
      title: "DATA SCIENCE",
      icon: Target,
      color: "from-orange-500 to-orange-600",
      skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "scikit-learn"]
    },
    {
      title: "TOOLS",
      icon: Briefcase,
      color: "from-pink-500 to-pink-600",
      skills: ["Git", "GitHub", "VS Code", "Vercel", "Render", "Jupyter", "Google Colab"]
    }
  ];

  const education = [
    {
      degree: "B.E in Computer Science",
      institution: "PCET's Nutan Maharashtra Institute of Engineering and Technology",
      location: "Pune, Maharashtra",
      duration: "2022 – 2026",
      score: "75.94% (Ongoing)",
      university: "Savitribai Phule Pune University"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Dr. D.Y.Patil Arts, Commerce & Science Junior College",
      location: "Pune, Maharashtra",
      duration: "2020 – 2022",
      score: "65.00%"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Jai Hind High School",
      location: "Pune, Maharashtra",
      duration: "2019 – 2020",
      score: "76.00%"
    }
  ];

  const experience = [
    {
      role: "AI / ML Intern",
      company: "InternPe",
      location: "Remote",
      duration: "Dec 2024 – Jan 2025",
      type: "Internship",
      responsibilities: [
        "Conducted EDA using pandas/NumPy and trained classification models in scikit-learn with train-test split, evaluating performance metrics for accuracy and precision",
        "Developed data visualizations using Matplotlib and Seaborn to communicate ML model insights and analysis results"
      ]
    },
    {
      role: "Student Ambassador",
      company: "LetsUpgrade",
      location: "Remote",
      duration: "Jul 2024 – Aug 2024",
      type: "Leadership",
      responsibilities: [
        "Organized 5+ technical workshops and facilitated communication with 1000+ students, resulting in a 30% increase in event participation",
        "Promoted workshops through WhatsApp and Telegram groups, collaborating with fellow ambassadors to drive student engagement"
      ]
    }
  ];

  const featuredProjects = [
    {
      name: "Saarthi - 3D AI Tutor Platform",
      tech: "Three.js, Google Gemini 2.0 Flash, Node.js, Express",
      gradient: "from-purple-500 to-pink-500",
      icon: Rocket,
      highlights: [
        "Built an AI-powered tutoring platform featuring an interactive 3D virtual tutor providing real-time academic assistance through voice and text",
        "Integrated Google Gemini API for conversational responses and implemented Speech-to-Text and Text-to-Speech for natural interaction",
        "Developed backend APIs using FastAPI and deployed the application for public access and testing"
      ]
    },
    {
      name: "ClarifAiSQL - Natural Language to SQL Converter",
      tech: "Next.js 15, TypeScript, FastAPI, Python",
      gradient: "from-cyan-500 to-blue-500",
      icon: Zap,
      highlights: [
        "Built full-stack AI application converting natural language to SQL using Google Gemini API with in-memory SQLite",
        "Developed Next.js 15 frontend with TypeScript and TailwindCSS featuring CSV drag-and-drop, real-time SQL generation, and AI explanations",
        "Engineered FastAPI backend with automated schema extraction from uploaded CSV files and deployed on Vercel (frontend) and Render (backend)"
      ]
    }
  ];

  const certifications = [
    { name: "Python for Data Science", issuer: "NPTEL", icon: BookOpen },
    { name: "ML Deployment with FastAPI & Docker", issuer: "Udemy", icon: Rocket },
    { name: "ChatGPT Generative AI", issuer: "Udemy", icon: Zap },
    { name: "AI for All", issuer: "Infosys", icon: Target }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Copyright Holder",
      subtitle: "Local E-Connect",
      description: "Copyright registered for a concept focused on improving digital visibility, market access, and sales opportunities for small local vendors",
      badge: "Reg. No: L-133251/2023"
    },
    {
      icon: Star,
      title: "Grand Finalist",
      subtitle: "Yophoria Innovation Challenge 2025",
      description: "Recognized for reaching the Grand Finale of India's premier AI Innovation Challenge focused on solving real-world problems in AI Agent Engineering",
      badge: "Organized by YoLearn.ai & GLA University"
    },
    {
      icon: Users,
      title: "Student Ambassador",
      subtitle: "LetsUpgrade Community",
      description: "Achieved 30% increase in event participation by organizing technical workshops that reached 1000+ students",
      badge: "Gold Badge • Jul 2024 - Aug 2024"
    },
    {
      icon: Code,
      title: "HackerRank 5-Star Python",
      subtitle: "Problem Solving Badge",
      description: "Achieved 5-star rating in Python programming on HackerRank platform",
      badge: "Active Badge"
    }
  ];

  return (
    <PageWrapper>
      <div 
        className="min-h-screen w-full"
        style={{
          background: 'linear-gradient(180deg, #0a1929 0%, #0d1e2e 50%, #0f2638 100%)',
        }}
      >
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-violet-600/5 blur-[150px] rounded-full" />
          <div className="absolute bottom-[30%] left-[-10%] w-[400px] h-[400px] bg-cyan-600/5 blur-[130px] rounded-full" />
        </div>

        <section className="pt-32 pb-20 container mx-auto px-6 relative z-10">
          {/* 10/10 HERO HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-7xl md:text-8xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                  Tejas Bhise
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl mb-12"
              >
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                  Python Backend Engineer & AI Developer
                </span>
              </motion.p>
              
              {/* UNIQUE CONTACT CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className={`${contact.bg} backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/30 transition-all group`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${contact.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <contact.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-white font-medium text-left flex-1">{contact.label}</span>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* DOWNLOAD BUTTON */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <button
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 text-white rounded-xl hover:shadow-2xl hover:shadow-violet-500/40 transition-all font-bold text-lg hover:scale-105"
                >
                  <Download className="w-6 h-6" />
                  Download PDF Resume
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* PROFESSIONAL SUMMARY */}
          <AnimatedSection className="mb-20">
            <Card className="bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-transparent border-indigo-500/20 hover:border-indigo-500/40 backdrop-blur-sm">
              <div className="p-10 text-center">
                <h2 className="text-3xl font-bold text-white mb-5">Professional Summary</h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
                  Python Backend Engineer & AI Developer with a strong interest in building scalable APIs and AI-powered applications that address real-world problems. Experienced in FastAPI and LLM integration, and committed to writing clean, maintainable code while continuously learning and improving as an engineer.
                </p>
              </div>
            </Card>
          </AnimatedSection>

          {/* TECHNICAL SKILLS - DIFFERENT ICONS */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg"
              >
                <Code className="w-7 h-7 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white">Technical Skills</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, index) => {
                const IconComp = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="bg-[#0f2638]/80 backdrop-blur-sm border-white/10 h-full hover:bg-[#132d42]/90 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10">
                      <div className={`h-1 bg-gradient-to-r ${category.color}`} />
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                            <IconComp className="w-5 h-5 text-white" />
                          </div>
                          <h3 className={`text-sm font-bold uppercase tracking-wider bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                            {category.title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <motion.span
                              key={skill}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="px-3 py-1.5 bg-slate-700/40 text-slate-200 rounded-lg text-xs font-medium border border-slate-600/30 hover:bg-slate-600/50 hover:border-slate-500/50 transition-all cursor-default"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* EDUCATION */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg"
              >
                <GraduationCap className="w-7 h-7 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white">Academic Journey</h2>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-violet-600 via-blue-600 to-cyan-600 rounded-full hidden md:block" />

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 border-4 border-[#0f2638] shadow-lg hidden md:block z-10" />

                    <motion.div whileHover={{ x: 5 }}>
                      <Card className="bg-[#0f2638]/80 backdrop-blur-sm border-white/10 hover:bg-[#132d42]/90 hover:border-cyan-500/30 md:ml-20 hover:shadow-xl">
                        <div className="p-6">
                          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-cyan-400 mb-2">{edu.degree}</h3>
                              <p className="text-white font-medium mb-1">{edu.institution}</p>
                              {edu.university && (
                                <p className="text-sm text-cyan-400/70 italic">{edu.university}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-xl text-sm font-bold h-fit border border-emerald-500/30">
                              <GraduationCap className="w-4 h-4" />
                              {edu.score}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {edu.duration}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {edu.location}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* EXPERIENCE - STANDS OUT */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg"
              >
                <Briefcase className="w-7 h-7 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white">Professional Experience</h2>
            </div>

            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-[#162a3d] to-[#0f2638] backdrop-blur-sm border-green-500/20 hover:border-green-500/40 hover:shadow-2xl hover:shadow-green-500/10">
                    <div className="p-7">
                      <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-2xl font-bold text-green-400">{exp.role}</h3>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
                              exp.type === 'Internship' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                              {exp.type}
                            </span>
                          </div>
                          <p className="text-white font-semibold text-lg mb-3">{exp.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-gray-200 flex items-start gap-3 leading-relaxed">
                            <span className="text-green-400 mt-1 text-lg">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FEATURED PROJECTS - STAND OUT */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
              >
                <Rocket className="w-7 h-7 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white">Featured Projects</h2>
            </div>

            <div className="space-y-6">
              {featuredProjects.map((project, index) => {
                const IconComp = project.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-[#1a2d42] to-[#0f2638] backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10">
                      <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />
                      <div className="p-7">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                            <IconComp className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-2xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-2`}>
                              {project.name}
                            </h3>
                            <p className="text-violet-400 font-semibold text-sm">{project.tech}</p>
                          </div>
                        </div>
                        <ul className="space-y-3 mt-5">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-gray-200 flex items-start gap-3 leading-relaxed">
                              <span className="text-purple-400 mt-1 text-lg">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-600 to-orange-600 flex items-center justify-center shadow-lg"
              >
                <Trophy className="w-7 h-7 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white">Achievements & Recognition</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const IconComp = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="bg-[#0f2638]/80 backdrop-blur-sm border-white/10 h-full hover:bg-[#132d42]/90 hover:border-yellow-500/30 hover:shadow-xl">
                      <div className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <IconComp className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-1">{achievement.title}</h3>
                            <p className="text-sm font-medium text-gray-400 mb-2">{achievement.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">{achievement.description}</p>
                        <div className="inline-block px-3 py-1.5 bg-white/5 text-white rounded-lg text-xs font-medium border border-white/10">
                          {achievement.badge}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CERTIFICATIONS - UNIQUE LOOK */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center shadow-lg"
              >
                <Award className="w-7 h-7 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white">Certifications</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {certifications.map((cert, index) => {
                const IconComp = cert.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30, rotateY: -15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5, scale: 1.03, rotateY: 2 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-orange-900/20 via-red-900/10 to-transparent border-orange-500/20 hover:border-orange-500/40 backdrop-blur-sm hover:shadow-lg hover:shadow-orange-500/10">
                      <div className="p-5 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <IconComp className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-base mb-1">{cert.name}</h3>
                          <p className="text-xs text-orange-400 font-medium">{cert.issuer}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* BOTTOM DOWNLOAD BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 text-white rounded-xl hover:shadow-2xl hover:shadow-violet-500/40 transition-all font-bold text-lg hover:scale-105"
            >
              <Download className="w-6 h-6" />
              Download Complete Resume (PDF)
            </button>
          </motion.div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Resume;
