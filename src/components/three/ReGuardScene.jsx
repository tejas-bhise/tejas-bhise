import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SceneCanvas from './SceneCanvas';
import { buildReGuard } from './buildReGuard';

// Narration for each lifecycle event emitted by the simulation.
const COPY = {
  interrupt: (id) => ({ tone: 'amber', text: `Update #${id} · upload interrupted mid-transfer` }),
  resume: (id) => ({ tone: 'cobalt', text: `LAUR-FL: #${id} is worth resuming → upload resumed` }),
  drop: (id) => ({ tone: 'amber', text: `LAUR-FL: #${id} not worth the bandwidth → dropped` }),
  reject: (id) => ({ tone: 'signal', text: `Guardian v2 flagged #${id} as malicious → rejected` }),
  write: (id) => ({ tone: 'emerald', text: `#${id} passed every gate → written to the ledger, exactly once` }),
};
const DOT = { amber: 'bg-[#F4B740]', cobalt: 'bg-cobalt', signal: 'bg-signal', emerald: 'bg-emerald-500' };

const LEGEND = [
  ['bg-cobalt', 'Model update'],
  ['bg-[#F4B740]', 'Interrupted upload'],
  ['bg-signal', 'Malicious update'],
  ['bg-emerald-500', 'Ledger entry'],
];

export default function ReGuardScene({ onReady }) {
  const [log, setLog] = useState([]);
  const [count, setCount] = useState({ resume: 0, drop: 0, reject: 0, write: 0 });
  const key = useRef(0);

  // Stable across renders so the scene is built once.
  const buildOpts = useMemo(
    () => ({
      onEvent: ({ type, id }) => {
        const line = COPY[type]?.(id);
        if (!line) return;
        key.current += 1;
        const k = key.current;
        setLog((l) => [{ k, ...line }, ...l].slice(0, 3));
        if (type in { resume: 1, drop: 1, reject: 1, write: 1 }) setCount((c) => ({ ...c, [type]: c[type] + 1 }));
      },
    }),
    []
  );

  return (
    <SceneCanvas
      build={buildReGuard}
      buildOpts={buildOpts}
      onReady={onReady}
      ariaLabel="Interactive 3D simulation of ReGuard-FL's update ledger: updates pass Upload, Integrity, Guardian v2 and Eligible gates; interrupted uploads are resumed or dropped by LAUR-FL, malicious updates are rejected, and each accepted update is written to the ledger exactly once"
    >
      {/* legend */}
      <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-x-3 gap-y-1.5 rounded-xl border border-ink/10 bg-white/85 px-3 py-2 backdrop-blur sm:left-4 sm:top-4">
        {LEGEND.map(([c, t]) => (
          <span key={t} className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink-600">
            <span className={`h-2.5 w-2.5 rounded-[3px] ${c}`} aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>

      {/* counters */}
      <dl className="pointer-events-none absolute right-3 top-3 hidden gap-1 rounded-xl border border-ink/10 bg-white/85 p-1 backdrop-blur sm:right-4 sm:top-4 md:flex">
        {[
          ['Resumed', count.resume, 'text-cobalt-600'],
          ['Dropped', count.drop, 'text-[#B7791F]'],
          ['Rejected', count.reject, 'text-signal-600'],
          ['Aggregated', count.write, 'text-emerald-700'],
        ].map(([k, v, c]) => (
          <div key={k} className="min-w-[78px] rounded-lg px-2.5 py-1.5 text-center">
            <dd className={`font-display text-lg font-semibold leading-none tabular-nums ${c}`}>{v}</dd>
            <dt className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-400">{k}</dt>
          </div>
        ))}
      </dl>

      {/* live narration */}
      <div className="pointer-events-none absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4" aria-live="polite">
        <ul className="flex flex-col-reverse gap-1.5">
          <AnimatePresence initial={false}>
            {log.map((l, i) => (
              <motion.li
                key={l.k}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: i === 0 ? 1 : 0.55 - i * 0.15, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex w-fit max-w-full items-center gap-2 rounded-full border border-ink/10 bg-white/90 px-3 py-1.5 text-[12px] font-medium text-ink-700 shadow-hair backdrop-blur sm:text-[13px]"
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${DOT[l.tone]}`} aria-hidden="true" />
                <span className="truncate">{l.text}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </SceneCanvas>
  );
}
