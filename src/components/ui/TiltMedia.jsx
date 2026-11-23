import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { hasFinePointer } from '../../lib/motion';
import DemoVideo from './DemoVideo';

// Project screenshot presented in a minimal browser chrome with a subtle
// pointer-driven 3D tilt and moving specular highlight.
export default function TiltMedia({ src, alt, href, dark = false, width = 1600, height = 900, label, demo, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 140, damping: 18 });
  const glareX = useTransform(px, [0, 1], ['0%', '100%']);
  const glareY = useTransform(py, [0, 1], ['0%', '100%']);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, rgba(255,255,255,0.18), transparent 45%)`
  );

  const onMove = (e) => {
    if (reduce || !hasFinePointer()) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className="block h-auto w-full bg-[#0b0f1a] transition-transform duration-[1.2s] ease-expo group-hover/tilt:scale-[1.025]"
    />
  );

  return (
    <div className={`[perspective:1400px] ${className}`}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry }}
        className={`group/tilt preserve-3d relative overflow-hidden rounded-[18px] border shadow-float ${
          dark ? 'border-white/10 bg-ink-800' : 'border-ink/10 bg-white'
        }`}
      >
        <div
          className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${dark ? 'border-white/10' : 'border-ink/10'}`}
          aria-hidden="true"
        >
          <span className={`h-2.5 w-2.5 rounded-full ${dark ? 'bg-white/20' : 'bg-ink/15'}`} />
          <span className={`h-2.5 w-2.5 rounded-full ${dark ? 'bg-white/20' : 'bg-ink/15'}`} />
          <span className={`h-2.5 w-2.5 rounded-full ${dark ? 'bg-white/20' : 'bg-ink/15'}`} />
          {label && (
            <span className={`label ml-3 truncate ${dark ? 'text-white/40' : 'text-ink-400'}`}>{label}</span>
          )}
        </div>
        <div className="relative overflow-hidden">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="block" tabIndex={-1} aria-hidden="true">
              {img}
            </a>
          ) : (
            img
          )}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
            style={{ background: glare }}
          />
          {demo && <DemoVideo demo={demo} hoverRef={ref} />}
        </div>
      </motion.div>
    </div>
  );
}
