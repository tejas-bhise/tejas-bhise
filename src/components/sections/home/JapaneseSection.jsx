import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { JP_CONTENT, JP_HEADER } from '../../../content/japanese';
import { EASE } from '../../../lib/motion';
import { Reveal } from '../../ui/Reveal';

// The Japanese recruiter letter. Content is frozen (see content/japanese.js);
// only its presentation is designed here — a washi-paper letter with a hanko seal.
function Letter({ c, lang }) {
  return (
    <div lang={lang} className={`space-y-10 leading-relaxed text-ink-700 ${lang === 'ja' ? 'font-jp' : ''}`}>
      {/* Letterhead */}
      <div className="flex flex-col items-center border-b border-ink/10 pb-8 text-center">
        <p className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-[28px]">{c.name}</p>
        <p className="mt-2 text-sm text-ink-500">{c.role}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Core strengths */}
        <section className="rounded-2xl border-l-[3px] border-signal bg-signal-50/70 p-6 sm:p-7">
          <h4 className="mb-5 font-semibold text-signal-700">{c.strengthsTitle}</h4>
          <div className="space-y-5">
            {c.strengths.map((s) => (
              <div key={s.title}>
                <p className="text-[15px] font-semibold text-ink">{s.title}</p>
                <p className="mt-1 text-[13.5px] text-ink-600">{s.body}</p>
                {s.note && <p className="mt-1.5 text-[13px] italic text-ink-500">{s.note}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Work style */}
        <section>
          <h4 className="mb-4 text-[15px] font-semibold text-ink">{c.workStyleTitle}</h4>
          <div className="space-y-3">
            {c.workStyle.map((w, i) => (
              <div key={w.title} className="flex gap-4 rounded-xl border border-ink/10 bg-white p-4">
                <span className="font-mono text-[11px] text-signal-600" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{w.title}</p>
                  <p className="mt-1 text-[13px] text-ink-600">{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attitude */}
        <section className="rounded-2xl bg-ink p-6 text-white/80 sm:p-7">
          <h4 className="mb-3 text-[15px] font-semibold text-white">{c.attitudeTitle}</h4>
          <p className="mb-4 text-[14.5px]">{c.attitudeIntro}</p>
          <p className="mb-2 text-[14.5px]">
            <strong className="text-white">{c.attitudeLead}</strong>
          </p>
          <ul className="ml-1 space-y-1.5 text-[13.5px]">
            {c.attitudeList.map((li) => (
              <li key={li} className="flex gap-2">
                <span className="text-signal-400">•</span> {li}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14.5px]">
            {c.attitudeClosing[0]}
            <strong className="text-white">{c.attitudeClosing[1]}</strong>
            {c.attitudeClosing[2]}
          </p>
        </section>

        {/* Commitment */}
        <section>
          <h4 className="mb-4 text-[15px] font-semibold text-ink">{c.commitTitle}</h4>
          <ul className="space-y-2.5 text-[14px]">
            {c.commitments.map(([k, v]) => (
              <li key={k} className="flex items-start gap-3 border-b border-ink/10 pb-2.5">
                <span className="font-bold text-signal-600">✓</span>
                <span className="text-ink-600">
                  <strong className="text-ink">{k}</strong>
                  {c.commitSeparator}
                  {v}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Closing */}
      <div className="border-t-2 border-signal pt-8 text-center">
        <p className="mx-auto max-w-[60ch] text-[14.5px] text-ink-600">{c.finalMessage}</p>
        <p lang="ja" className="mt-5 font-jp text-3xl font-bold tracking-[0.04em] text-signal-700 sm:text-4xl">
          {c.motto}
        </p>
        <p className="mt-2 text-[13px] text-ink-500">{c.mottoTranslation}</p>
        <p lang="ja" className="mt-4 font-jp text-[13px] text-ink-400">
          {c.signOff}
        </p>
      </div>
    </div>
  );
}

export default function JapaneseSection() {
  const [japaneseExpanded, setJapaneseExpanded] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  const panelId = useId();

  return (
    <section className="py-28 sm:py-40" aria-label={JP_HEADER.title}>
      <div className="shell">
        <Reveal className="relative overflow-hidden rounded-[28px] border border-ink/10 bg-paper-50 shadow-lift">
          {/* Washi fibres + vertical rule */}
          <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[88px] hidden w-px bg-signal/20 sm:block" />

          <button
            type="button"
            onClick={() => setJapaneseExpanded(!japaneseExpanded)}
            aria-expanded={japaneseExpanded}
            aria-controls={panelId}
            className="group relative flex w-full items-center justify-between gap-4 p-5 text-left sm:p-7"
          >
            <div className="flex items-center gap-5 sm:gap-8">
              {/* Hanko-style seal */}
              <span className="relative flex h-14 w-14 shrink-0 rotate-[-6deg] items-center justify-center rounded-xl border-2 border-signal text-signal-600 transition-transform duration-500 ease-expo group-hover:rotate-0 sm:h-[60px] sm:w-[60px]">
                <Globe className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 lang="ja" className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-jp text-xl font-bold text-ink sm:text-[28px]">
                  {JP_HEADER.title}
                  <span lang="en" className="font-sans text-sm font-normal text-ink-500">
                    {JP_HEADER.subtitle}
                  </span>
                </h3>
              </div>
            </div>
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-expo ${
                japaneseExpanded
                  ? 'rotate-180 border-ink bg-ink text-white'
                  : 'border-ink/10 bg-white text-ink-500 group-hover:border-ink/30'
              }`}
              aria-hidden="true"
            >
              <ChevronDown className="h-5 w-5" />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {japaneseExpanded && (
              <motion.div
                id={panelId}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative overflow-hidden"
              >
                <div className="px-4 pb-5 sm:px-7 sm:pb-7">
                  <div className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-10">
                    <div className="mb-8 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowEnglish(!showEnglish)}
                        className="btn-ghost btn-sm"
                        aria-pressed={showEnglish}
                      >
                        <Globe className="h-4 w-4" aria-hidden="true" />
                        {showEnglish ? JP_HEADER.toJapanese : JP_HEADER.toEnglish}
                      </button>
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={showEnglish ? 'en' : 'ja'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        {!showEnglish ? <Letter c={JP_CONTENT.ja} lang="ja" /> : <Letter c={JP_CONTENT.en} lang="en" />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
