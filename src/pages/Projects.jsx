import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { PROJECTS_PAGE, completedProjects, fedShieldProject, reGuardProject } from '../content/projects';
import { EASE } from '../lib/motion';
import { scrollToElement, useLenis } from '../lib/smoothScroll';
import SectionHeader from '../components/ui/SectionHeader';
import { BuildingProject, ProjectRow, ResearchProject } from '../components/sections/projects/ProjectShowcase';
import TechStack from '../components/sections/projects/TechStack';

// FedShield (published research) leads, followed by the shipped products.
const ALL = [fedShieldProject, ...completedProjects, reGuardProject];

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const projectRefs = useRef({});
  const lenis = useLenis();

  // One case study open at a time. When switching, bring the newly opened
  // project's top into view so collapsing another never strands the reader.
  const toggleProject = (id) => {
    const opening = id !== expandedProject;
    setExpandedProject(opening ? id : null);
    if (opening && expandedProject !== null) {
      setTimeout(() => scrollToElement(lenis, projectRefs.current[id], -96), 650);
    }
  };

  const jump = (slug) => (e) => {
    e.preventDefault();
    scrollToElement(lenis, document.getElementById(slug), -96);
  };

  // Deep links (/projects#fedshield) — land on the requested project.
  useEffect(() => {
    const go = (slug) => setTimeout(() => scrollToElement(lenis, document.getElementById(slug), -96), 120);
    if (window.location.hash) go(window.location.hash.slice(1));
    const onReq = (e) => go(e.detail);
    window.addEventListener('app:scrollto', onReq);
    return () => window.removeEventListener('app:scrollto', onReq);
  }, [lenis]);

  const refFor = (id) => (el) => {
    projectRefs.current[id] = el;
  };

  return (
    <div className="pb-8">
      {/* ── Header ───────────────────────────────────────────── */}
      <header className="grain relative overflow-hidden pb-20 pt-36 sm:pt-44">
        <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_70%_at_80%_20%,#000,transparent_70%)]" />
        <div className="shell grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              as="h1"
              index="Index"
              kicker="Work"
              lead="My"
              accent="Projects"
              subtitle={PROJECTS_PAGE.subtitle}
              titleClassName="text-[clamp(3.6rem,10vw,8.5rem)]"
            />
          </div>

          {/* Quick index of every project on the page */}
          <motion.nav
            aria-label="Projects on this page"
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <ol className="border-t border-ink/10">
              {ALL.map((p, i) => (
                <li key={p.slug} className="border-b border-ink/10">
                  <a
                    href={`#${p.slug}`}
                    onClick={jump(p.slug)}
                    className="group flex items-center justify-between gap-4 py-4 transition-[padding] duration-300 ease-expo hover:pl-2"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="label text-ink-300" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-xl font-medium tracking-[-0.015em] text-ink">{p.title}</span>
                      {p.status === 'In Progress' && (
                        <span className="rounded-full bg-cobalt-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-cobalt-600">
                          Building
                        </span>
                      )}
                      {p.publication && (
                        <span className="rounded-full bg-signal-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-signal-600">
                          IEEE
                        </span>
                      )}
                    </span>
                    <ArrowDownRight
                      className="h-4 w-4 text-ink-300 transition-all duration-300 group-hover:rotate-[-45deg] group-hover:text-signal"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>
        </div>
      </header>

      {/* ── FedShield (published research) ─────────────────────── */}
      <section aria-label={fedShieldProject.title}>
        <ResearchProject
          project={fedShieldProject}
          open={expandedProject === fedShieldProject.id}
          onToggle={() => toggleProject(fedShieldProject.id)}
          cardRef={refFor(fedShieldProject.id)}
        />
      </section>


      {/* ── Shipped products ───────────────────────────────── */}
      <section aria-label="Completed projects" className="shell mt-16">
        {completedProjects.map((project, idx) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={idx + 1}
            open={expandedProject === project.id}
            onToggle={() => toggleProject(project.id)}
            cardRef={refFor(project.id)}
          />
        ))}
      </section>

      {/* ── Currently building (at the end) ──────────────────── */}
      <section className="shell pt-24 sm:pt-32" aria-label="Currently building">
        <BuildingProject
          heading="Currently Building"
          project={reGuardProject}
          open={expandedProject === reGuardProject.id}
          onToggle={() => toggleProject(reGuardProject.id)}
          cardRef={refFor(reGuardProject.id)}
        />
      </section>

      <TechStack />
    </div>
  );
};

export default Projects;
