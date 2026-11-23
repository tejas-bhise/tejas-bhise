import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { COMPETENCIES } from '../../../content/home';
import { EASE, VIEWPORT } from '../../../lib/motion';
import SectionHeader from '../../ui/SectionHeader';
import Icon from '../../ui/Icon';
import VelocityMarquee from '../../ui/VelocityMarquee';

// Pointer-tracked spotlight via CSS custom properties — no React state.
const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const TINTS = ['from-signal-50 to-white', 'from-cobalt-100/60 to-white', 'from-emerald-50 to-white'];

export default function Competencies() {
  const marquee = COMPETENCIES.items.flatMap((c) => c.skills);

  return (
    <section className="py-28 sm:py-36" aria-labelledby="competencies-title">
      <div className="shell">
        <SectionHeader
          id="competencies-title"
          index="04"
          kicker="Capabilities"
          lead={COMPETENCIES.titleLead}
          accent={COMPETENCIES.titleAccent}
          subtitle={COMPETENCIES.subtitle}
        />
      </div>

      {/* Skill ticker — reacts to scroll speed & direction (decorative duplicate of the lists below) */}
      <div aria-hidden="true" data-inv-ignore className="mask-fade-x mt-14 py-4">
        <VelocityMarquee baseVelocity={-1.4}>
          {marquee.map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-8 pr-8 font-display text-4xl font-semibold tracking-[-0.02em] text-ink/[0.13] sm:text-6xl"
            >
              {s}
              <span className="h-2.5 w-2.5 rounded-full bg-signal/60" />
            </span>
          ))}
        </VelocityMarquee>
      </div>

      <div className="shell mt-12 grid gap-5 md:grid-cols-3">
        {COMPETENCIES.items.map((item, i) => (
          <motion.article
            key={item.title}
            onPointerMove={spotlight}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
            className={`group relative overflow-hidden rounded-[26px] border border-ink/10 bg-gradient-to-b ${TINTS[i]} p-7 shadow-hair transition-shadow duration-500 hover:shadow-lift sm:p-8`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgba(229,69,44,0.08), transparent 65%)',
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-signal transition-transform duration-500 ease-expo group-hover:scale-x-100"
            />
            <div className="relative">
              <div className="mb-9 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/10 bg-white text-ink shadow-hair transition-colors duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span className="label text-ink-300" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-[1.55rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{item.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{item.subtitle}</p>
              <ul className="mt-7 space-y-1">
                {item.skills.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-3 rounded-xl px-2 py-2 text-[15px] text-ink-700 transition-colors duration-300 hover:bg-white"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-signal-600 ring-1 ring-ink/10">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
