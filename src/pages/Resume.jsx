import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Calendar, Download, ExternalLink, GraduationCap, MapPin } from 'lucide-react';
import {
  PUBLICATION,
  RESUME_PAGE,
  achievements,
  certifications,
  contactInfo,
  education,
  experience,
  featuredProjects,
  skillCategories,
} from '../content/resume';
import { RESUME_PDF } from '../content/site';
import { EASE, VIEWPORT } from '../lib/motion';
import { scrollToElement, useLenis } from '../lib/smoothScroll';
import { Reveal, SplitWords } from '../components/ui/Reveal';
import Magnetic from '../components/ui/Magnetic';
import Icon from '../components/ui/Icon';

const S = RESUME_PAGE.sections;
const TOC = [
  { id: 'summary', label: RESUME_PAGE.summaryTitle },
  { id: 'publication', label: S.publication },
  { id: 'skills', label: S.skills },
  { id: 'education', label: S.education },
  { id: 'experience', label: S.experience },
  { id: 'projects', label: S.projects },
  { id: 'achievements', label: S.achievements },
  { id: 'certifications', label: S.certifications },
];

function DownloadButton({ children, large = false }) {
  return (
    <Magnetic>
      <a
        href={RESUME_PDF}
        download="Tejas_Bhise.pdf"
        className={`btn-signal group ${large ? 'px-8 py-4 text-[15px]' : ''}`}
      >
        <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
        {children}
      </a>
    </Magnetic>
  );
}

// Document section with a hairline rule and a mono section number.
function Chapter({ id, n, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28 border-t border-ink/10 py-14 sm:py-16">
      <div className="mb-10 flex items-baseline gap-4">
        <span className="label text-signal-600" aria-hidden="true">
          {String(n).padStart(2, '0')}
        </span>
        <h2 id={`${id}-h`} className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.022em] text-ink">
          <SplitWords text={title} />
        </h2>
      </div>
      {children}
    </section>
  );
}

const item = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.55, ease: EASE, delay: i * 0.06 },
});

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    // The last chapter can't reach the detection band — activate it at the page bottom.
    const onScroll = () => {
      const doc = document.documentElement;
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 600) {
        const last = document.getElementById(ids[ids.length - 1]);
        if (last && last.getBoundingClientRect().top < window.innerHeight * 0.75) setActive(ids[ids.length - 1]);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids]);
  return [active, setActive];
}

const TOC_IDS = TOC.map((t) => t.id);

const GLANCE = [
  { k: 'Degree', v: education[0].degree, n: `${education[0].status} · ${education[0].university}` },
  { k: 'Copyright', v: 'Local E-Connect', n: 'Reg. No. L-133251/2023 · Govt. of India' },
  { k: 'Publication', v: PUBLICATION.venue, n: PUBLICATION.indexed },
  { k: 'Based in', v: education[0].location, n: 'Open to opportunities in India & internationally' },
];

const Resume = () => {
  const lenis = useLenis();
  const [active, setActive] = useActiveSection(TOC_IDS);

  return (
    <div>
      {/* ── Header ───────────────────────────────────────────── */}
      <header className="grain relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_55%_70%_at_85%_30%,#000,transparent_70%)]" />
        <div className="shell grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal y={12} className="label mb-6 flex items-center gap-3 text-ink-500">
              <span className="text-signal-600">(CV)</span>
              <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
              <span>Resume</span>
            </Reveal>
            <h1 className="font-display text-[clamp(3.6rem,11vw,9rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-ink">
              <SplitWords text={RESUME_PAGE.name} animateOnMount delay={0.1} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
              className="mt-6 font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-medium leading-snug tracking-[-0.015em] text-signal-600"
            >
              {RESUME_PAGE.role}
            </motion.p>
          </div>

          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
          >
            <ul className="border-t border-ink/10">
              {contactInfo.map((contact) => (
                <li key={contact.label} className="border-b border-ink/10">
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 transition-[padding] duration-500 ease-expo hover:pl-2"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink-600 transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                        <Icon name={contact.icon} className="h-4 w-4" />
                      </span>
                      <span className="text-[15px] font-medium text-ink">{contact.label}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <DownloadButton>{RESUME_PAGE.downloadTop}</DownloadButton>
            </div>
          </motion.div>
        </div>

        {/* At a glance */}
        <div className="shell mt-16">
        <motion.dl
          className="grid grid-cols-2 overflow-hidden rounded-[22px] border border-ink/10 bg-white/80 shadow-hair backdrop-blur lg:grid-cols-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        >
          {GLANCE.map((g, i) => (
            <div
              key={g.k}
              className={`p-5 sm:p-6 ${i % 2 === 1 ? 'border-l border-ink/10' : ''} ${i > 1 ? 'border-t border-ink/10 lg:border-t-0' : ''} ${
                i === 2 ? 'lg:border-l' : ''
              }`}
            >
              <dt className="label text-ink-400">{g.k}</dt>
              <dd className="mt-2 font-display text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">{g.v}</dd>
              <dd className="mt-0.5 text-[13px] text-ink-500">{g.n}</dd>
            </div>
          ))}
        </motion.dl>
        </div>
      </header>

      <div className="shell grid gap-10 pb-24 lg:grid-cols-12">
        {/* ── Sticky table of contents ─────────────────────── */}
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="Resume sections" className="sticky top-28 pt-14">
            <p className="label mb-5 text-ink-400" aria-hidden="true">
              Contents
            </p>
            <ol className="space-y-1">
              {TOC.map((t, i) => {
                const on = active === t.id;
                return (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActive(t.id);
                        scrollToElement(lenis, document.getElementById(t.id), -96);
                      }}
                      aria-current={on ? 'location' : undefined}
                      className={`group flex items-center gap-3 rounded-lg py-1.5 text-[14px] transition-colors duration-300 ${
                        on ? 'text-ink' : 'text-ink-400 hover:text-ink'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-px transition-all duration-500 ease-expo ${on ? 'w-8 bg-signal' : 'w-4 bg-ink/20 group-hover:w-6'}`}
                      />
                      <span className="font-mono text-[10px] opacity-60" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {t.label}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <div className="lg:col-span-9">
          {/* Summary */}
          <section id="summary" aria-labelledby="summary-h" className="scroll-mt-28 border-t border-ink/10 py-14 sm:py-16">
            <div className="mb-8 flex items-baseline gap-4">
              <span className="label text-signal-600" aria-hidden="true">
                01
              </span>
              <h2 id="summary-h" className="label text-ink-500">
                {RESUME_PAGE.summaryTitle}
              </h2>
            </div>
            <Reveal as="p" className="font-display text-[clamp(1.45rem,2.6vw,2.15rem)] font-medium leading-[1.35] tracking-[-0.015em] text-ink text-pretty">
              {RESUME_PAGE.summary}
            </Reveal>
          </section>

          {/* Skills */}
          {/* Research publication */}
          <Chapter id="publication" n={2} title={S.publication}>
            <Reveal className="relative overflow-hidden rounded-3xl bg-ink p-7 text-white sm:p-10">
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 bg-[radial-gradient(closest-side,rgba(229,69,44,0.35),transparent)]" />
              <p className="label relative flex items-center gap-2 text-signal-400">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                {PUBLICATION.label} · {PUBLICATION.venue}
              </p>
              <h3 className="relative mt-5 max-w-[30ch] font-display text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
                {PUBLICATION.title}
              </h3>
              <p className="relative mt-3 text-[15px] text-white/60">
                Published in {PUBLICATION.venue} and {PUBLICATION.indexed.charAt(0).toLowerCase() + PUBLICATION.indexed.slice(1)}.
              </p>
              <dl className="relative mt-6 grid gap-2 border-t border-white/10 pt-6 font-mono text-[12.5px] text-white/70 sm:grid-cols-2">
                <div>
                  <dt className="text-white/40">DOI</dt>
                  <dd className="mt-1 break-all">{PUBLICATION.doi}</dd>
                </div>
                <div>
                  <dt className="text-white/40">IEEE Xplore Document ID</dt>
                  <dd className="mt-1">{PUBLICATION.xploreId}</dd>
                </div>
              </dl>
              <div className="relative mt-7 flex flex-wrap gap-2">
                <a href={PUBLICATION.xploreUrl} target="_blank" rel="noopener noreferrer" className="btn-signal btn-sm">
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  Read on IEEE Xplore
                </a>
                <a href={PUBLICATION.doiUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark btn-sm">
                  DOI link
                </a>
              </div>
            </Reveal>
          </Chapter>

          <Chapter id="skills" n={3} title={S.skills}>
            <dl className="border-t border-ink/10">
              {skillCategories.map((category, i) => (
                <motion.div key={category.title} {...item(i)} className="group grid gap-3 border-b border-ink/10 py-5 sm:grid-cols-[220px,1fr] sm:items-center">
                  <dt className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/10 bg-white text-ink-600 transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                      <Icon name={category.icon} className="h-4 w-4" />
                    </span>
                    <span className="label text-ink-700">{category.title}</span>
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </Chapter>

          {/* Education */}
          <Chapter id="education" n={4} title={S.education}>
            <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[7px] before:top-6 before:w-px before:bg-ink/15 sm:before:left-[139px]">
              {education.map((edu, i) => (
                <motion.li key={edu.degree} {...item(i)} className="relative grid gap-3 pl-8 sm:grid-cols-[120px,1fr] sm:gap-10 sm:pl-0">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-7 h-[15px] w-[15px] rounded-full border-[3px] border-paper sm:left-[132px] ${
                      i === 0 ? 'bg-signal' : 'bg-ink-300'
                    }`}
                  />
                  <div className="flex items-center gap-2 pt-6 font-mono text-[12px] text-ink-500 sm:justify-end">
                    <Calendar className="h-3.5 w-3.5 sm:hidden" aria-hidden="true" />
                    {edu.duration}
                  </div>
                  <div className="rounded-2xl border border-ink/10 bg-white p-6 transition-shadow duration-500 hover:shadow-lift sm:ml-8">
                    <div className="flex flex-col justify-between gap-4 lg:flex-row">
                      <div>
                        <h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-ink">{edu.degree}</h3>
                        <p className="mt-1.5 text-[15px] font-medium text-ink-700">{edu.institution}</p>
                        {edu.university && <p className="mt-1 text-[14.5px] font-medium text-signal-600">{edu.university}</p>}
                        {edu.status && (
                          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white">
                            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" /> {edu.status}
                          </p>
                        )}
                      </div>
                      {edu.score && (
                        <div className="flex h-fit items-center gap-2 whitespace-nowrap rounded-full border border-emerald-600/20 bg-emerald-50 px-3 py-1.5 text-[13px] font-semibold text-emerald-700">
                          <GraduationCap className="h-4 w-4" aria-hidden="true" />
                          {edu.score}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[13px] text-ink-500">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {edu.location}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </Chapter>

          {/* Experience */}
          <Chapter id="experience" n={5} title={S.experience}>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <motion.article key={exp.role} {...item(i)} className="grid gap-6 rounded-2xl border border-ink/10 bg-white p-6 sm:p-8 md:grid-cols-[1fr,1.4fr]">
                  <div>
                    <span
                      className={`label inline-flex rounded-full px-2.5 py-1 ${
                        exp.type === 'Internship' ? 'bg-emerald-50 text-emerald-700' : 'bg-cobalt-100 text-cobalt-600'
                      }`}
                    >
                      {exp.type}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">{exp.role}</h3>
                    <p className="mt-1 text-[16px] font-semibold text-signal-600">{exp.company}</p>
                    <div className="mt-4 space-y-1.5 text-[13px] text-ink-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3 md:border-l md:border-ink/10 md:pl-6">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex gap-3 text-[15px] leading-relaxed text-ink-600">
                        <span className="mt-[9px] h-1 w-3 shrink-0 bg-signal" aria-hidden="true" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </Chapter>

          {/* Featured projects */}
          <Chapter id="projects" n={6} title={S.projects}>
            <div className="border-t border-ink/10">
              {featuredProjects.map((project, i) => (
                <motion.article key={project.name} {...item(0)} className="group grid gap-5 border-b border-ink/10 py-8 md:grid-cols-[56px,1fr]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white transition-colors duration-500 group-hover:bg-signal">
                    <Icon name={project.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="label text-ink-300" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-[clamp(1.3rem,2.4vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
                        {project.name}
                      </h3>
                    </div>
                    {project.badge && (
                      <p className="mt-3 inline-flex rounded-full bg-signal px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                        {project.badge}
                      </p>
                    )}
                    <p className="mt-2 font-mono text-[12.5px] leading-relaxed text-signal-600">{project.tech}</p>
                    <ul className="mt-5 space-y-3">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex gap-3 text-[15px] leading-relaxed text-ink-600">
                          <span className="mt-[9px] h-1 w-3 shrink-0 bg-ink/25" aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </Chapter>

          {/* Achievements */}
          <Chapter id="achievements" n={7} title={S.achievements}>
            <div className="grid gap-4 md:grid-cols-2">
              {achievements.map((a, i) => (
                <motion.article
                  key={a.title}
                  {...item(i)}
                  className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-paper text-ink transition-colors duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                      <Icon name={a.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">{a.title}</h3>
                      <p className="text-[14px] font-medium text-ink-500">{a.subtitle}</p>
                    </div>
                  </div>
                  <p className="flex-grow text-[14.5px] leading-relaxed text-ink-600">{a.description}</p>
                  <p className="label mt-5 w-fit max-w-full rounded-full border border-ink/10 bg-paper-50 px-3 py-1.5 normal-case tracking-[0.04em] text-ink-600 [overflow-wrap:anywhere]">
                    {a.badge}
                  </p>
                  {a.href && (
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex w-fit items-center gap-1.5 text-[13.5px] font-semibold text-signal-600 underline-offset-4 hover:underline"
                    >
                      View on IEEE Xplore <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </motion.article>
              ))}
            </div>
          </Chapter>

          {/* Certifications */}
          <Chapter id="certifications" n={8} title={S.certifications}>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
              {certifications.map((cert, i) => (
                <motion.div key={cert.name} {...item(i)} className="group flex items-center gap-4 bg-white p-5 transition-colors duration-300 hover:bg-paper-50">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal-50 text-signal-600 transition-colors duration-300 group-hover:bg-signal group-hover:text-white">
                    <Icon name={cert.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[15.5px] font-semibold text-ink">{cert.name}</h3>
                    <p className="mt-1 font-mono text-[12px] tracking-[0.04em] text-ink-400">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Chapter>

          <Reveal className="mt-6 flex justify-center border-t border-ink/10 pt-14">
            <DownloadButton large>{RESUME_PAGE.downloadBottom}</DownloadButton>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Resume;
