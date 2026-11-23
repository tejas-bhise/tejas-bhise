import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Cursor, ScrollProgress } from './components/layout/Chrome';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import { RouterProvider, useRouter } from './lib/router';
import { SmoothScrollProvider, scrollToTop, useLenis } from './lib/smoothScroll';
import { EASE, EASE_IN_OUT } from './lib/motion';
import { NAV_ITEMS } from './content/site';
import { INTRO_ACTIVE } from './lib/intro';

const PAGES = { home: Home, projects: Projects, resume: Resume };
const LABEL = Object.fromEntries(NAV_ITEMS.map((n) => [n.page, n.name]));

// First-visit intro: a quick ink sheet that lifts off the page (~0.9s total).
// Skipped for reduced motion and on repeat visits within the session.
function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(INTRO_ACTIVE);
  useEffect(() => {
    if (!show) return undefined;
    try {
      sessionStorage.setItem('tb-intro', '1');
    } catch {
      /* storage unavailable — fine */
    }
    const t = setTimeout(() => setShow(false), 650);
    return () => clearTimeout(t);
  }, [show]);
  if (reduce) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[90] flex items-end justify-between bg-ink p-6 text-paper sm:p-10"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.6, ease: EASE_IN_OUT }}
        >
          <motion.span
            className="font-display text-[clamp(2.5rem,9vw,7rem)] font-semibold leading-none tracking-[-0.025em]"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            Tejas <span className="serif-accent text-signal-400">Bhise</span>
          </motion.span>
          <motion.span
            className="label hidden text-paper/50 sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            AI · Backend · Research
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Shell() {
  const { page, navigate } = useRouter();
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const mainRef = useRef(null);

  // After the outgoing page fades: reset scroll and focus <main>
  // so keyboard / screen-reader users start at the top of the new page.
  const onPageExit = () => {
    scrollToTop(lenis);
    mainRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const onTop = () => scrollToTop(lenis, false);
    window.addEventListener('app:scrolltop', onTop);
    return () => window.removeEventListener('app:scrolltop', onTop);
  }, [lenis]);

  const Page = PAGES[page] ?? Home;

  return (
    <div className="relative flex min-h-screen flex-col bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Intro />
      <ScrollProgress />
      <Navbar />

      <main id="main" ref={mainRef} tabIndex={-1} className="flex-grow outline-none">
        <AnimatePresence mode="wait" initial={false} onExitComplete={onPageExit}>
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE, delay: 0.12 } }}
            exit={{ opacity: 0, transition: { duration: 0.18, ease: EASE_IN_OUT } }}
          >
            <Page setPage={navigate} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Route curtain — an ink sheet that sweeps through, naming the destination */}
      <AnimatePresence initial={false}>
        {!reduce && (
          <motion.div
            key={page}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[55] flex items-center justify-center bg-ink"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0 0 100% 0)'] }}
            transition={{ duration: 0.62, ease: EASE_IN_OUT, times: [0, 0.42, 1] }}
          >
            <motion.span
              className="font-display text-[clamp(3rem,10vw,8rem)] font-semibold tracking-[-0.025em] text-paper"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: [0, 1, 0], y: [24, 0, -24] }}
              transition={{ duration: 0.62, ease: EASE_IN_OUT, times: [0, 0.42, 1] }}
            >
              {LABEL[page]}
              <span className="text-signal">.</span>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <Cursor />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <SmoothScrollProvider>
          <Shell />
        </SmoothScrollProvider>
      </RouterProvider>
    </MotionConfig>
  );
}
