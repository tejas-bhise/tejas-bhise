import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from './motion';

// Lenis-powered inertial scrolling for wheel/trackpad users.
// Disabled for prefers-reduced-motion; touch devices keep native scrolling.

const LenisContext = createContext(null);

export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const raf = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    // lerp-based smoothing: follows the wheel closely (snappy), just without the
    // stepped feel of native wheel scrolling.
    const instance = new Lenis({ lerp: 0.14, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
    setLenis(instance);
    const loop = (time) => {
      instance.raf(time);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    // Keep Lenis' scroll limit in sync with the real page height (route changes,
    // accordions, lazy images). A stale limit stops wheel scrolling short.
    const ro = new ResizeObserver(() => instance.resize());
    ro.observe(document.getElementById('root') || document.body);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export const useLenis = () => useContext(LenisContext);

export function scrollToTop(lenis, immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' });
}

export function scrollToElement(lenis, el, offset = -96) {
  if (!el) return;
  if (lenis) {
    lenis.resize(); // page height may have changed since Lenis last measured (route change, reveals)
    lenis.scrollTo(el, { offset, duration: 0.9 });
  }
  else {
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
  }
}
