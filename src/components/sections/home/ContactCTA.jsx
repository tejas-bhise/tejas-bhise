import { Sparkles, ArrowUpRight } from 'lucide-react';
import { CTA } from '../../../content/home';
import { EMAIL_HREF } from '../../../content/site';
import { RouteLink } from '../../../lib/router';
import { Reveal, SplitWords } from '../../ui/Reveal';
import Magnetic from '../../ui/Magnetic';

const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export default function ContactCTA() {
  return (
    <section className="px-2 pb-24 sm:px-4 sm:pb-32" aria-labelledby="cta-title">
      <div
        onPointerMove={spotlight}
        className="group relative isolate overflow-hidden rounded-[28px] border border-ink/10 bg-gradient-to-br from-signal-50 via-paper-50 to-cobalt-100/50 px-6 py-20 text-center text-ink sm:rounded-[40px] sm:py-28"
      >
        <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-70 transition-opacity duration-700"
          style={{
            background:
              'radial-gradient(640px circle at var(--mx, 50%) var(--my, 30%), rgba(229,69,44,0.12), transparent 60%)',
          }}
        />
        <Reveal className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-hair ring-1 ring-ink/10">
          <Sparkles className="h-6 w-6 text-signal-600" aria-hidden="true" />
        </Reveal>
        <h2
          id="cta-title"
          className="mx-auto max-w-[16ch] font-display text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-balance"
        >
          <SplitWords text={CTA.title} stagger={0.05} />
        </h2>
        <Reveal as="p" delay={0.15} className="mx-auto mt-8 max-w-2xl text-[17px] leading-relaxed text-ink-500 text-pretty">
          {CTA.body}
        </Reveal>
        <Reveal delay={0.25} className="mt-11 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <a href={EMAIL_HREF} className="btn-signal px-8 py-4 text-[15px]">
              {CTA.primary}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic>
            <RouteLink to="resume" className="btn-ghost px-8 py-4 text-[15px]">
              {CTA.secondary}
            </RouteLink>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
