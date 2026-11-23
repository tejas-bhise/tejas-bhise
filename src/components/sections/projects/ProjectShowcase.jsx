import { useId } from 'react';
import { BookOpen, CheckCircle2, MousePointerClick } from 'lucide-react';
import { Reveal } from '../../ui/Reveal';
import TiltMedia from '../../ui/TiltMedia';
import { DetailsPanel, DetailsToggle, ExternalLink, Github, LinkButton, Tags } from './ProjectParts';
import LazyScene from '../../three/LazyScene';
import { loadFedShield, loadReGuard } from '../../three/loaders';
import { DEMOS } from '../../../content/demos';

const IMG_H = { clarifaisql: 790, saarthi: 875, operis: 888, fedshield: 830 };

// Completed project: alternating media/text spread with an inline case study.
export function ProjectRow({ project, index, open, onToggle, cardRef }) {
  const panel = useId();
  const flip = index % 2 === 1;
  return (
    <article ref={cardRef} id={project.slug} className="scroll-mt-28 border-t border-ink/10 py-14 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal y={40} className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
          <TiltMedia
            src={`/projects/${project.slug}.png`}
            alt={`${project.title} preview`}
            href={project.live}
            label={project.live?.replace('https://', '')}
            height={IMG_H[project.slug]}
            demo={DEMOS[project.slug]}
          />
        </Reveal>

        <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
          <Reveal className="flex flex-wrap items-center gap-3">
            <span className="label text-ink-400" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[13px] text-ink-500">{project.type}</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-600/20 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={11} aria-hidden="true" /> Live
            </span>
          </Reveal>
          <Reveal as="h3" delay={0.05} className="mt-4 font-display text-[clamp(2.4rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-ink">
            {project.title}
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-5 text-[16.5px] leading-relaxed text-ink-500 text-pretty">
            {project.tagline}
          </Reveal>
          <Reveal delay={0.15} className="mt-6">
            <Tags items={project.technologies} />
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-2.5">
            {project.live && (
              <LinkButton href={project.live} icon={ExternalLink}>
                Live Demo
              </LinkButton>
            )}
            {project.github && (
              <LinkButton href={project.github} icon={Github} variant="btn-ghost">
                GitHub
              </LinkButton>
            )}
            <DetailsToggle open={open} onClick={onToggle} controls={panel} />
          </Reveal>
        </div>
      </div>
      <DetailsPanel id={panel} open={open} project={project} />
    </article>
  );
}

// FedShield — published research, presented as a light, tinted "paper" spread.
export function ResearchProject({ project, open, onToggle, cardRef }) {
  const panel = useId();
  return (
    <article ref={cardRef} id={project.slug} className="scroll-mt-28 px-2 sm:px-4">
      <div className="relative isolate overflow-hidden rounded-[28px] border border-ink/10 bg-gradient-to-br from-signal-50 via-paper-50 to-cobalt-100/50 px-5 py-14 text-ink sm:rounded-[40px] sm:px-10 sm:py-20 lg:px-16">
        <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]" />
        <div aria-hidden="true" className="absolute -left-32 top-10 -z-10 h-[520px] w-[520px] bg-[radial-gradient(closest-side,rgba(229,69,44,0.10),transparent)]" />

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal className="flex flex-wrap items-center gap-3">
              <span className="label text-signal-600">{project.type}</span>
            </Reveal>
            <Reveal as="h3" delay={0.05} className="mt-4 font-display text-[clamp(2.8rem,5.4vw,4.6rem)] font-semibold leading-[1] tracking-[-0.025em]">
              {project.title}
            </Reveal>
            <Reveal as="p" delay={0.08} className="mt-4 font-display text-[clamp(1.2rem,1.9vw,1.5rem)] font-medium leading-snug tracking-[-0.01em] text-signal-600">
              {project.subtitle}
            </Reveal>
            <Reveal as="p" delay={0.12} className="mt-5 text-[16px] leading-relaxed text-ink-500 text-pretty">
              {project.tagline}
            </Reveal>
            <Reveal delay={0.16} className="mt-6">
              <Tags items={project.technologies} />
            </Reveal>
            {project.publication && (
              <Reveal delay={0.18} className="mt-8 rounded-2xl border border-signal/25 bg-white/80 p-5 shadow-hair">
                <p className="label flex items-center gap-2 text-signal-600">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  Published · {project.publication.venue}
                </p>
                <p className="mt-2 text-[14px] text-ink-600">{project.publication.indexed}</p>
                <p className="mt-1 break-all font-mono text-[12px] text-ink-400">DOI: {project.publication.doi}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <LinkButton href={project.publication.xploreUrl} icon={ExternalLink} variant="btn-signal">
                    Read on IEEE Xplore
                  </LinkButton>
                  <LinkButton href={project.publication.doiUrl} icon={ExternalLink} variant="btn-ghost">
                    DOI
                  </LinkButton>
                  {project.github && (
                    <LinkButton href={project.github} icon={Github} variant="btn-ghost">
                      GitHub
                    </LinkButton>
                  )}
                </div>
              </Reveal>
            )}
            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[13px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                <span className="text-ink-500">
                  Status: <span className="font-semibold text-emerald-700">{project.status}</span>
                </span>
              </div>
              <DetailsToggle open={open} onClick={onToggle} controls={panel} />
            </Reveal>
          </div>
          <Reveal y={40} className="lg:col-span-7">
            <TiltMedia
              src={`/projects/${project.slug}.png`}
              alt={`${project.title} preview`}
              href={project.live}
              label={project.title}
              height={IMG_H[project.slug]}
            />
          </Reveal>
        </div>
        {/* Interactive 3D model of the paper's setup */}
        <Reveal className="mt-14 overflow-hidden rounded-[24px] border border-ink/10 bg-white/60 shadow-hair">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-3.5 sm:px-6">
            <p className="label text-ink-500">
              <span className="text-signal-600">FedShield</span> · interactive model · 5 clients, 2 malicious
            </p>
            <p className="label flex items-center gap-2 text-ink-400" aria-hidden="true">
              <MousePointerClick className="h-3.5 w-3.5 text-signal-600" />
              <span className="hidden sm:inline">Hover a component · click to run a federated round</span>
              <span className="sm:hidden">Tap to run a round</span>
            </p>
          </div>
          <LazyScene loader={loadFedShield} className="h-[340px] sm:h-[480px] lg:h-[600px]" />
        </Reveal>
        <DetailsPanel id={panel} open={open} project={project} />
      </div>
    </article>
  );
}

// ReGuard-FL — currently building (follow-up research to FedShield).
export function BuildingProject({ project, open, onToggle, cardRef, heading }) {
  const panel = useId();
  return (
    <article ref={cardRef} id={project.slug} className="scroll-mt-28">
      <Reveal className="mb-8 flex items-center gap-3">
        <span className="h-2.5 w-2.5 animate-pulsedot rounded-full bg-signal" aria-hidden="true" />
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">{heading}</h2>
      </Reveal>
      <div className="rounded-[28px] border border-dashed border-ink/25 bg-paper-50 p-5 sm:p-8 lg:p-10">
        {/* intro: identity left, story right */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal className="flex flex-wrap items-center gap-3">
              <span className="label text-ink-400">{project.type}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cobalt/20 bg-cobalt-100 px-2.5 py-0.5 text-xs font-semibold text-cobalt-600">
                <span className="h-1.5 w-1.5 rounded-full bg-cobalt" aria-hidden="true" /> {project.status}
              </span>
            </Reveal>
            <Reveal as="h3" delay={0.05} className="mt-4 font-display text-[clamp(2.4rem,4.4vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-ink">
              {project.title}
            </Reveal>
            <Reveal as="p" delay={0.08} className="mt-3 font-display text-[18px] font-medium leading-snug text-signal-600">
              {project.subtitle}
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal as="p" delay={0.1} className="text-[16.5px] leading-[1.75] text-ink-500 text-pretty">
              {project.tagline}
            </Reveal>
            <Reveal delay={0.15} className="mt-6">
              <Tags items={project.technologies} />
            </Reveal>
            <Reveal delay={0.2} className="mt-7">
              <DetailsToggle open={open} onClick={onToggle} controls={panel} />
            </Reveal>
          </div>
        </div>

        {/* the update ledger, simulated and narrated */}
        <Reveal y={30} className="mt-10 overflow-hidden rounded-[22px] border border-ink/10 bg-white/70 shadow-float">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-3.5 sm:px-6">
            <p className="label text-ink-500">
              <span className="text-signal-600">ReGuard-FL</span> · update ledger · live simulation
            </p>
            <p className="label hidden items-center gap-2 text-ink-400 sm:flex" aria-hidden="true">
              <MousePointerClick className="h-3.5 w-3.5 text-signal-600" />
              Click to send a batch of updates
            </p>
          </div>
          <LazyScene loader={loadReGuard} className="h-[420px] sm:h-[480px] lg:h-[540px]" />
        </Reveal>
        <DetailsPanel id={panel} open={open} project={project} />
      </div>
    </article>
  );
}
