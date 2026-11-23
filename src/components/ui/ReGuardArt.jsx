import { motion, useReducedMotion } from 'framer-motion';

// Visual for ReGuard-FL (no product screenshot yet): the update ledger's
// lifecycle gates, with updates flowing through them. Labels come from the
// project's README (upload completion → integrity → security → eligibility → aggregation).
const GATES = ['Upload', 'Integrity', 'Guardian v2', 'Eligible', 'Aggregate'];

export default function ReGuardArt({ className = '' }) {
  const reduce = useReducedMotion();
  const W = 640;
  const H = 360;
  const y = 196;
  const x0 = 70;
  const step = (W - 2 * x0) / (GATES.length - 1);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-paper-50 via-white to-cobalt-100/50 ${className}`}>
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-24 h-72 w-72 bg-[radial-gradient(closest-side,rgba(229,69,44,0.14),transparent)]"
      />
      <svg viewBox={`0 0 ${W} ${H}`} className="relative h-full w-full" role="img" aria-label="ReGuard-FL update lifecycle: upload, integrity, Guardian v2, eligibility, aggregation">
        <text x={x0 - 22} y={64} className="fill-ink-400 font-mono text-[12px] uppercase tracking-[0.16em]">
          update ledger · exactly-once
        </text>
        <line x1={x0} y1={y} x2={W - x0} y2={y} stroke="rgba(16,18,23,0.12)" strokeWidth="2" />
        <line x1={x0} y1={y} x2={W - x0} y2={y} stroke="#E5452C" strokeWidth="2" strokeDasharray="4 8" className={reduce ? '' : 'animate-flow'} />

        {GATES.map((g, i) => {
          const x = x0 + i * step;
          const last = i === GATES.length - 1;
          return (
            <g key={g}>
              <motion.circle
                cx={x}
                cy={y}
                r={last ? 22 : 15}
                fill={last ? '#E5452C' : '#FFFFFF'}
                stroke={last ? '#E5452C' : 'rgba(16,18,23,0.35)'}
                strokeWidth="2"
                animate={reduce ? undefined : { r: last ? [22, 25, 22] : [15, 17, 15] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }}
              />
              <text x={x} y={y + 4} textAnchor="middle" className={`font-mono text-[11px] ${last ? 'fill-white' : 'fill-ink-600'}`}>
                {i + 1}
              </text>
              <text
                x={x}
                y={i % 2 === 0 ? y + 52 : y - 38}
                textAnchor="middle"
                className="fill-ink-600 font-mono text-[12px] uppercase tracking-[0.1em]"
              >
                {g}
              </text>
            </g>
          );
        })}

        {/* updates in flight; one is dropped at the Guardian gate */}
        {!reduce &&
          [0, 1, 2].map((k) => (
            <motion.circle
              key={k}
              r={6}
              cy={y}
              fill={k === 1 ? '#E5452C' : '#2F4BFF'}
              initial={{ cx: x0, opacity: 0 }}
              animate={{
                cx: [0, 0.1, 0.85, 1].map((t) => x0 + t * (k === 1 ? 2 * step : W - 2 * x0)),
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: k === 1 ? 2.6 : 4, repeat: Infinity, delay: k * 1.3, ease: 'linear', times: [0, 0.1, 0.85, 1] }}
            />
          ))}
      </svg>
    </div>
  );
}
