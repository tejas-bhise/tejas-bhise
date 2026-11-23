import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { hasFinePointer, prefersReducedMotion } from '../../lib/motion';

// Muted demo loop layered over a project screenshot.
// Desktop: plays while the card is hovered. Touch: plays while mostly in view.
// Reduced motion: never autoplays. preload="none" keeps it off the network until needed.
export default function DemoVideo({ demo, hoverRef, className = '' }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    const host = hoverRef?.current;
    if (!v || prefersReducedMotion()) return undefined;
    const play = () => {
      v.play().then(() => setPlaying(true)).catch(() => {});
    };
    const stop = () => {
      v.pause();
      setPlaying(false);
    };
    if (hasFinePointer() && host) {
      host.addEventListener('pointerenter', play);
      host.addEventListener('pointerleave', stop);
      return () => {
        host.removeEventListener('pointerenter', play);
        host.removeEventListener('pointerleave', stop);
      };
    }
    const io = new IntersectionObserver(([e]) => (e.intersectionRatio > 0.6 ? play() : stop()), { threshold: [0, 0.6, 1] });
    io.observe(v);
    return () => io.disconnect();
  }, [hoverRef]);

  return (
    <>
      <video
        ref={ref}
        src={demo.video}
        poster={demo.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
          playing ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
      <span
        className={`pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] backdrop-blur transition-colors duration-300 ${
          playing ? 'bg-signal text-white' : 'bg-white/85 text-ink-600'
        }`}
        aria-hidden="true"
      >
        <Play className="h-3 w-3" fill="currentColor" />
        {playing ? demo.label : hasFinePointer() ? 'Hover · demo' : 'Demo'}
      </span>
    </>
  );
}
