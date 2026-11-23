import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, Github } from 'lucide-react';
import { completedProjects, fedShieldProject, reGuardProject } from '../../../content/projects';
import ReGuardArt from '../../ui/ReGuardArt';
import DemoVideo from '../../ui/DemoVideo';
import { DEMOS } from '../../../content/demos';
import { RouteLink } from '../../../lib/router';
import SectionHeader from '../../ui/SectionHeader';

const WORK = [fedShieldProject, ...completedProjects, reGuardProject];

function useMedia(query) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useLayoutEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

function WorkCard({ p, i, className = '', fixed = false }) {
  const cardRef = useRef(null);
  const dark = false; // all cards light (FedShield keeps its IEEE badge)
  return (
    <article
      ref={cardRef}
      className={`group relative flex shrink-0 flex-col overflow-hidden rounded-[28px] border transition-shadow duration-500 hover:shadow-float ${
        dark ? 'border-white/10 bg-ink text-white' : 'border-ink/10 bg-white text-ink'
      } ${className}`}
    >
      <div className={`relative shrink-0 overflow-hidden ${fixed ? 'h-[42%]' : ''}`}>
        {p.slug === 'reguard-fl' ? (
          <ReGuardArt className={fixed ? 'h-full' : 'aspect-[16/9.5]'} />
        ) : (
        <img
            src={`/projects/${p.slug}.png`}
            alt={`${p.title} preview`}
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            className={`w-full object-cover object-top transition-transform ${fixed ? 'h-full' : 'aspect-[16/9.5]'} duration-700 ease-expo group-hover:scale-[1.04]`}
          />
        )}
        {DEMOS[p.slug] && <DemoVideo demo={DEMOS[p.slug]} hoverRef={cardRef} />}
        <span className="label absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 text-white/80 backdrop-blur">
          {String(i + 1).padStart(2, '0')} / {String(WORK.length).padStart(2, '0')}
        </span>
        {p.status === 'In Progress' && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
            <span className="h-1.5 w-1.5 animate-pulsedot rounded-full bg-signal" aria-hidden="true" /> Building now
          </span>
        )}
        {dark && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-signal px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
            <BookOpen className="h-3 w-3" aria-hidden="true" /> IEEE published
          </span>
        )}
      </div>
      <div className={`flex min-h-0 flex-1 flex-col p-6 ${fixed ? 'xl:p-7' : 'sm:p-8'}`}>
        <p className={`label ${dark ? 'text-signal-400' : 'text-ink-400'}`}>{p.type}</p>
        <h3 className="mt-2 font-display text-[clamp(1.8rem,2.6vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.025em]">{p.title}</h3>
        {p.subtitle && <p className={`mt-1 font-display text-[17px] font-medium ${dark ? 'text-signal-400' : 'text-signal-600'}`}>{p.subtitle}</p>}
        <p className={`mt-3 text-[15px] leading-[1.65] ${fixed ? 'line-clamp-2' : ''} ${dark ? 'text-white/65' : 'text-ink-500'}`}>{p.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.technologies.slice(0, fixed ? 4 : 5).map((t) => (
            <span key={t} className={dark ? 'tag-dark' : 'tag'}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-5">
          <RouteLink to="projects" hash={`#${p.slug}`} className={`${dark ? 'btn-signal' : 'btn-primary'} btn-sm group/b`}>
            Case study
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/b:translate-x-0.5" aria-hidden="true" />
          </RouteLink>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className={`${dark ? 'btn-ghost-dark' : 'btn-ghost'} btn-sm`}>
              Live
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} on GitHub`}
              className={`${dark ? 'btn-ghost-dark' : 'btn-ghost'} btn-sm px-3`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {p.publication && (
            <a href={p.publication.xploreUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark btn-sm">
              IEEE Xplore
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function EndCard({ className = '' }) {
  return (
    <RouteLink
      to="projects"
      className={`group flex shrink-0 flex-col justify-between rounded-[28px] border border-dashed border-ink/25 p-8 transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-white ${className}`}
    >
      <span className="label text-ink-400 group-hover:text-white/50">Index</span>
      <span>
        <span className="block font-display text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          View all <span className="serif-accent text-signal-600 group-hover:text-signal-400">projects</span>
        </span>
        <span className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:translate-x-2 group-hover:bg-signal">
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </span>
      </span>
    </RouteLink>
  );
}

// Desktop: vertical scroll drives a pinned horizontal track (with a little
// velocity-based skew). Touch/tablet: a native swipe carousel with snap points.
export default function SelectedWork() {
  const wide = useMedia('(min-width: 1024px)');
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);

  useLayoutEffect(() => {
    if (!wide || !trackRef.current) return undefined;
    const measure = () => setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [wide]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const smoothX = useSpring(x, { stiffness: 260, damping: 40, mass: 0.4 });
  const velocity = useVelocity(scrollYProgress);
  const skew = useSpring(useTransform(velocity, [-1, 0, 1], [3, 0, -3], { clamp: true }), { stiffness: 200, damping: 30 });

  const header = (
    <div className="shell flex flex-wrap items-end justify-between gap-6">
      <SectionHeader id="work-title" index="01" kicker="Selected work" lead="Things I've" accent="built." titleClassName="text-[clamp(2.6rem,5.6vw,5rem)]" />
      {wide && (
        <div className="flex w-56 items-center gap-3" aria-hidden="true">
          <span className="label text-ink-400">Scroll</span>
          <span className="h-px flex-1 overflow-hidden bg-ink/10">
            <motion.span className="block h-full origin-left bg-signal" style={{ scaleX: scrollYProgress }} />
          </span>
        </div>
      )}
    </div>
  );

  if (!wide) {
    return (
      <section className="py-28 sm:py-36" aria-labelledby="work-title">
        {header}
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-6 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden">
          {WORK.map((p, i) => (
            <WorkCard key={p.slug} p={p} i={i} className="w-[86vw] max-w-[560px] snap-start" />
          ))}
          <EndCard className="min-h-[360px] w-[70vw] max-w-[380px] snap-start" />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-labelledby="work-title" style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-8 overflow-hidden pt-14">
        {header}
        <motion.div ref={trackRef} style={{ x: smoothX, skewX: skew }} className="flex w-max items-stretch gap-6 pl-10 pr-[12vw] xl:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]">
          {WORK.map((p, i) => (
            <WorkCard key={p.slug} p={p} i={i} fixed className="h-[min(66vh,620px)] w-[min(42vw,600px)]" />
          ))}
          <EndCard className="h-[min(66vh,620px)] w-[min(26vw,360px)]" />
        </motion.div>
      </div>
    </section>
  );
}
