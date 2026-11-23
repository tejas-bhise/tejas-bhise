import { motion } from 'framer-motion';
import { EASE, VIEWPORT } from '../../lib/motion';

// Renders an "a → b → c" pipeline string as a flow diagram.
// The original string survives intact in the DOM text (steps joined by "→");
// step numbers come from CSS counters so they never interleave with the copy.
export default function Pipeline({ value, dark = false }) {
  const steps = value.split(' → ');
  return (
    <motion.ol
      aria-label="Pipeline"
      className="flex flex-wrap items-center gap-x-1.5 gap-y-2.5 [counter-reset:step]"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
    >
      {steps.map((step, i) => (
        <motion.li
          key={i}
          className="flex items-center gap-1.5 [counter-increment:step]"
          variants={{
            hidden: { opacity: 0, x: -8 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
          }}
        >
          <span
            className={`relative inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-medium leading-tight before:font-mono before:text-[10px] before:content-[counter(step,decimal-leading-zero)] ${
              dark
                ? 'border-white/10 bg-white/[0.04] text-white/85 before:text-signal-400'
                : 'border-ink/10 bg-white text-ink-700 before:text-signal-600'
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`relative inline-flex w-6 items-center justify-center overflow-hidden text-sm ${
                dark ? 'text-white/35' : 'text-ink-300'
              }`}
            >
              →
            </span>
          )}
        </motion.li>
      ))}
    </motion.ol>
  );
}
