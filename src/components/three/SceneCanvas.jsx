import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

// Generic React host for a stage-based scene. `build(canvas, opts)` must return
// the stage api. Labels are DOM chips moved by writing styles directly.
export default function SceneCanvas({ build, onReady, ariaLabel, buildOpts, children }) {
  const canvasRef = useRef(null);
  const labelRefs = useRef({});
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    let api;
    let listed = false;
    const onLabels = (list) => {
      if (!listed) {
        listed = true;
        setLabels(list.map((l) => ({ id: l.id, text: l.text, tone: l.tone })));
      }
      list.forEach((l) => {
        const el = labelRefs.current[l.id];
        if (!el) return;
        el.style.transform = `translate(${l.x.toFixed(1)}px, ${l.y.toFixed(1)}px) translate(-50%, ${l.below ? '10px' : 'calc(-100% - 6px)'})`;
        el.dataset.active = l.active ? '1' : '0';
        el.dataset.visible = l.visible ? '1' : '0';
      });
    };
    try {
      api = build(canvas, {
        compact: window.innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4,
        reducedMotion: prefersReducedMotion(),
        onLabels,
        ...buildOpts,
      });
    } catch {
      return undefined; // no WebGL: the placeholder remains
    }
    onReady?.();

    let inView = true;
    const sync = () => (inView && !document.hidden ? api.start() : api.stop());
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => api.resize());
    ro.observe(canvas);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      api.pointer(x, y, (e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1, inside);
    };
    const onClick = (e) => {
      onMove(e);
      api.click();
    };
    const onScroll = () => {
      const r = canvas.getBoundingClientRect();
      api.setScroll(Math.max(0, Math.min(1, -r.top / window.innerHeight)));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    canvas.addEventListener('click', onClick);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', sync);
      api.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [build, onReady]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full cursor-grab touch-pan-y" role="img" aria-label={ariaLabel} />
      {children}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {labels.map((l) => (
          <span
            key={l.id}
            ref={(el) => (labelRefs.current[l.id] = el)}
            data-active="0"
            data-visible="1"
            className={`absolute left-0 top-0 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] shadow-hair backdrop-blur transition-[background-color,color,border-color,opacity] duration-300 data-[visible='0']:opacity-0 data-[active='1']:border-ink data-[active='1']:bg-ink data-[active='1']:text-white max-sm:text-[9.5px] ${
              l.tone === 'signal' ? 'border-signal/30 bg-signal-50/90 text-signal-700' : 'border-ink/10 bg-white/90 text-ink-600'
            }`}
          >
            {l.text}
          </span>
        ))}
      </div>
    </div>
  );
}
