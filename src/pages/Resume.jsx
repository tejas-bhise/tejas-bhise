import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Download, MapPin, Calendar, Award, Star, Code, Briefcase, GraduationCap } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';

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
      console.error('Download error:', error);
      // Fallback: open in new tab
      window.open('/Tejas_Bhise.pdf', '_blank');
    }
  };

  // Contact Information
  const contactInfo = [
    { icon: Phone, label: '+91-8796872925', href: 'tel:+918796872925' },
    { icon: Mail, label: 'tejasbhise1013@gmail.com', href: 'mailto:tejasbhise1013@gmail.com' },
    { icon: Github, label: 'github.com/tejas-bhise', href: 'https://github.com/tejas-bhise' },
    { icon: Linkedin, label: 'linkedin.com/in/tejas-bhise', href: 'https://www.linkedin.com/in/tejas-bhise' }
  ];

  // Skills organized by category
  const skills = {
    "Languages": ["Python", "SQL", "JavaScript", "TypeScript"],
    "AI & ML": ["Google Gemini API", "LLMs", "Prompt Engineering", "Machine Learning"],
    "Backend": ["FastAPI", "Flask", "Node.js", "Express", "RESTful APIs"],
    "Frontend": ["React", "Next.js 15", "Three.js", "TailwindCSS"],
    "Data Science": ["NumPy", "Pandas", "Matplotlib", "Seaborn", "scikit-learn"],
    "Tools": ["Git", "GitHub", "VS Code", "Vercel", "Render", "Jupyter", "Google Colab"]
  };

  // Education
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

  // Experience
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

  // Featured Projects (condensed from Projects page)
  const featuredProjects = [
    {
      name: "Saarthi - 3D AI Tutor Platform",
      tech: "Three.js, Google Gemini 2.0 Flash, Node.js, Express",
      highlights: [
        "Built an AI-powered tutoring platform featuring an interactive 3D virtual tutor providing real-time academic assistance through voice and text",
        "Integrated Google Gemini API for conversational responses and implemented Speech-to-Text and Text-to-Speech for natural interaction",
        "Developed backend APIs using FastAPI and deployed the application for public access and testing"
      ]
    },
    {
      name: "ClarifAiSQL - Natural Language to SQL Converter",
      tech: "Next.js 15, TypeScript, FastAPI, Python",
      highlights: [
        "Built full-stack AI application converting natural language to SQL using Google Gemini API with in-memory SQLite",
        "Developed Next.js 15 frontend with TypeScript and TailwindCSS featuring CSV drag-and-drop, real-time SQL generation, and AI explanations",
        "Engineered FastAPI backend with automated schema extraction from uploaded CSV files and deployed on Vercel (frontend) and Render (backend)"
      ]
    }
  ];

  // Certifications
  const certifications = [
    { name: "Python for Data Science", issuer: "NPTEL" },
    { name: "ML Deployment with FastAPI & Docker", issuer: "Udemy" },
    { name: "ChatGPT Generative AI", issuer: "Udemy" },
    { name: "AI for All", issuer: "Infosys" }
  ];

  // Achievements
  const achievements = [
    {
      icon: Award,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-900",
      title: "Copyright Holder",
      subtitle: "Local E-Connect",
      description: "Copyright registered for a concept focused on improving digital visibility, market access, and sales opportunities for small local vendors",
      badge: "Reg. No: L-133251/2023"
    },
    {
      icon: Star,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-900",
      title: "Grand Finalist",
      subtitle: "Yophoria Innovation Challenge 2025",
      description: "Recognized for reaching the Grand Finale of India's premier AI Innovation Challenge focused on solving real-world problems in AI Agent Engineering",
      badge: "Organized by YoLearn.ai & GLA University"
    },
    {
      icon: Star,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-900",
      title: "Student Ambassador",
      subtitle: "LetsUpgrade Community",
      description: "Achieved 30% increase in event participation by organizing technical workshops that reached 1000+ students",
      badge: "Gold Badge • Jul 2024 - Aug 2024"
    },
    {
      icon: Code,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-900",
      title: "HackerRank 5-Star Python",
      subtitle: "Problem Solving Badge",
      description: "Achieved 5-star rating in Python programming on HackerRank platform",
      badge: "Active Badge"
    }
  ];

  return (
    <PageWrapper>
      <section className="pt-32 pb-20">
        {/* HEADER */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
              Tejas Bhise
            </h1>
            <p className="text-xl text-gray-600 mb-6">Python Backend Engineer & AI Developer</p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 hover:shadow-md transition-all text-sm text-gray-700 hover:text-indigo-600"
                >
                  <contact.icon className="w-4 h-4" />
                  <span>{contact.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Download Resume Button */}
            <motion.button
              onClick={handleDownloadResume}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-xl transition-all font-medium text-lg"
            >
              <Download className="w-5 h-5" />
              Download PDF Resume
            </motion.button>
          </motion.div>
        </div>

        {/* PROFESSIONAL SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Summary</h2>
              <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
                Python Backend Engineer & AI Developer with a strong interest in building scalable APIs and AI-powered applications that address real-world problems. Experienced in FastAPI and LLM integration, and committed to writing clean, maintainable code while continuously learning and improving as an engineer.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* TECHNICAL SKILLS */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Technical Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6">
                    <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Education</h2>
          </div>

          <div className="space-y-4">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                        <p className="text-gray-700 font-medium mb-1">{edu.institution}</p>
                        {edu.university && (
                          <p className="text-sm text-gray-600 italic">{edu.university}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                        <GraduationCap className="w-4 h-4" />
                        {edu.score}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {edu.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
          </div>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            exp.type === 'Internship' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {exp.type}
                          </span>
                        </div>
                        <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
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

        {/* FEATURED PROJECTS */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
          </div>

          <div className="space-y-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-sm text-indigo-600 font-medium mb-4">{project.tech}</p>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-yellow-600 to-orange-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Achievements & Recognition</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm h-full hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                        <achievement.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{achievement.title}</h3>
                        <p className="text-sm font-medium text-gray-600 mb-2">{achievement.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">{achievement.description}</p>
                    <div className={`inline-block px-3 py-1 ${achievement.bgColor} ${achievement.textColor} rounded-lg text-xs font-medium`}>
                      {achievement.badge}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-orange-600 to-red-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                      <p className="text-xs text-gray-600">{cert.issuer}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM DOWNLOAD BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={handleDownloadResume}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-xl transition-all font-medium text-lg"
          >
            <Download className="w-5 h-5" />
            Download Complete Resume (PDF)
          </button>
        </motion.div>
      </section>
    </PageWrapper>
  );
};

export default Resume;
