import { ArrowRight } from 'lucide-react';
import { FEATURED } from '../../../content/home';
import { RouteLink } from '../../../lib/router';
import SectionHeader from '../../ui/SectionHeader';
import { Reveal } from '../../ui/Reveal';
import TiltMedia from '../../ui/TiltMedia';
import Magnetic from '../../ui/Magnetic';
import { DEMOS } from '../../../content/demos';

function CaseStudy({ project, index }) {
  return (
    <article className="grid gap-10 border-t border-ink/10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14">
      {/* Meta column — sticky while the evidence scrolls past */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <Reveal className="flex items-center gap-3">
            <span className="label text-ink-400" aria-hidden="true">
              Case {String(index + 1).padStart(2, '0')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {project.status}
            </span>
          </Reveal>
          <Reveal as="h3" delay={0.05} className="mt-5 font-display text-[clamp(2.6rem,5.4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-ink">
            {project.title}
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink-500 text-pretty">
            {project.tagline}
          </Reveal>
          <Reveal delay={0.15} className="mt-7 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-7 border-l-2 border-signal pl-4 text-[13.5px] leading-relaxed text-ink-500">
            <strong className="font-semibold text-ink">Deployment:</strong> {project.deployment}
          </Reveal>
        </div>
      </div>

      {/* Evidence column */}
      <div className="lg:col-span-7">
        <Reveal y={40}>
          <TiltMedia
            src={`/projects/${project.slug}.png`}
            alt={`${project.title} preview`}
            label={project.title}
            height={project.slug === 'saarthi' ? 875 : 790}
            demo={DEMOS[project.slug]}
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ['The Challenge', project.challenge],
            ['The Solution', project.solution],
          ].map(([label, text], i) => (
            <Reveal key={label} delay={i * 0.06} className="rounded-2xl border border-ink/10 bg-white/70 p-6">
              <h4 className="label mb-3 text-ink-400">{label}</h4>
              <p className="text-[15px] leading-relaxed text-ink-700">{text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4 rounded-2xl bg-ink p-6 text-white sm:p-8">
          <h4 className="label mb-5 text-signal-400">{project.featuresLabel}</h4>
          <ul className="divide-y divide-white/10">
            {project.features.map((f, i) => (
              <li key={i} className="flex gap-4 py-3.5 first:pt-0 last:pb-0">
                <span className="mt-[3px] font-mono text-[11px] text-white/35" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[15px] leading-relaxed text-white/85">{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  return (
    <section className="relative py-28 sm:py-40" aria-labelledby="featured-title">
      <div className="shell">
        <SectionHeader
          id="featured-title"
          index="02"
          kicker="In depth"
          lead={FEATURED.title}
          subtitle={FEATURED.subtitle}
          className="mb-14 sm:mb-20"
        />
        {FEATURED.projects.map((p, i) => (
          <CaseStudy key={p.slug} project={p} index={i} />
        ))}
        <div className="flex justify-center border-t border-ink/10 pt-14">
          <Magnetic>
            <RouteLink to="projects" className="btn-primary group px-8 py-4 text-[15px]">
              {FEATURED.cta}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </RouteLink>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
