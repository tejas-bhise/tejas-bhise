import { motion } from 'framer-motion';
import { RECOGNITION } from '../../../content/home';
import { EASE, VIEWPORT } from '../../../lib/motion';
import SectionHeader from '../../ui/SectionHeader';
import Icon from '../../ui/Icon';

export default function Recognition() {
  return (
    <section className="relative py-28 sm:py-40" aria-labelledby="recognition-title">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              id="recognition-title"
              index="03"
              kicker="Recognition"
              lead={RECOGNITION.titleLead}
              accent={RECOGNITION.titleAccent}
              subtitle={RECOGNITION.subtitle}
            />
          </div>
        </div>

        <ol className="lg:col-span-7">
          {RECOGNITION.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="group relative border-t border-ink/10 last:border-b"
            >
              <article className="relative grid grid-cols-[auto,1fr] gap-x-6 gap-y-4 py-9 transition-[padding] duration-500 ease-expo sm:grid-cols-[72px,1fr] sm:py-11 sm:group-hover:pl-3">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-signal transition-transform duration-500 ease-expo group-hover:scale-y-100"
                />
                <div className="flex flex-col items-start gap-4">
                  <span className="label text-ink-400" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/10 bg-white text-ink shadow-hair transition-colors duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.025em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] font-semibold text-signal-600">{item.subtitle}</p>
                  <p className="mt-4 max-w-[58ch] text-[15.5px] leading-relaxed text-ink-500 text-pretty">{item.description}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <p className="label inline-flex rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 normal-case tracking-[0.04em] text-ink-600 [overflow-wrap:anywhere]">
                      {item.detail}
                    </p>
                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-signal-600 underline-offset-4 hover:underline"
                      >
                        View on IEEE Xplore <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
