import { motion } from 'framer-motion';
import { TECH_STACK } from '../../../content/projects';
import { EASE, VIEWPORT } from '../../../lib/motion';
import SectionHeader from '../../ui/SectionHeader';
import Icon from '../../ui/Icon';

const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

// A 3×3 specimen matrix: one hairline grid, each cell a category.
export default function TechStack() {
  return (
    <section className="py-28 sm:py-40" aria-labelledby="stack-title">
      <div className="shell">
        <SectionHeader
          id="stack-title"
          kicker="Stack"
          lead={TECH_STACK.title}
          subtitle={TECH_STACK.subtitle}
          titleClassName="text-[clamp(2.2rem,5vw,4.2rem)]"
          className="mb-14"
        />
        <div className="grid gap-px overflow-hidden rounded-[24px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.categories.map((c, i) => (
            <motion.div
              key={c.category}
              onPointerMove={spotlight}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 3) * 0.08 }}
              className="group relative bg-paper-50 p-7 transition-colors duration-500 hover:bg-white"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(320px circle at var(--mx,50%) var(--my,0%), rgba(229,69,44,0.07), transparent 65%)',
                }}
              />
              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white text-ink transition-all duration-500 group-hover:-rotate-6 group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                    <Icon name={c.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="label text-ink-300" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-ink">{c.category}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.items.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
