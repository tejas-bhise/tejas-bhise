import { Suspense, useCallback, useEffect, useMemo, useState, lazy } from 'react';

// Mounts a lazily-imported 3D scene once the browser is idle and the slot is
// near the viewport. A soft plinth silhouette holds the space (no layout shift).
export default function LazyScene({ loader, className = '', eager = false }) {
  const Scene = useMemo(() => lazy(loader), [loader]);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [el, setEl] = useState(null);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!el) return undefined;
    let idle = 0;
    const go = () => {
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(() => setMount(true), { timeout: 800 });
      else idle = setTimeout(() => setMount(true), 200);
    };
    if (eager) {
      go();
      return () => (window.cancelIdleCallback ? window.cancelIdleCallback(idle) : clearTimeout(idle));
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          go();
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [el, eager]);

  return (
    <div ref={setEl} className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 h-[40%] w-[74%] -translate-x-1/2 -translate-y-1/2 -skew-y-[16deg] rounded-[28px] bg-gradient-to-br from-white to-paper-200 shadow-float transition-opacity duration-700 ${
          ready ? 'opacity-0' : 'opacity-60'
        }`}
      />
      {mount && (
        <Suspense fallback={null}>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
            <Scene onReady={onReady} />
          </div>
        </Suspense>
      )}
    </div>
  );
}
