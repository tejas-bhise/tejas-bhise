import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_ITEMS, SITE_NAME, SOCIAL_LINKS, EMAIL_HREF } from '../../content/site';
import { CTA } from '../../content/home';
import { RouteLink, useRouter } from '../../lib/router';
import { useLenis } from '../../lib/smoothScroll';
import { EASE } from '../../lib/motion';

export default function Navbar() {
  const { page } = useRouter();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const menuBtn = useRef(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    setHidden(y > 240 && y > prev && !open);
  });

  // Lock scroll + Escape to close while the mobile sheet is open.
  useEffect(() => {
    if (!open) return undefined;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lenis]);

  useEffect(() => setOpen(false), [page]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="shell pt-3 sm:pt-4">
          <nav
            aria-label="Primary"
            className={`flex h-14 items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
              scrolled || open
                ? 'border-ink/10 bg-paper-50/80 shadow-lift backdrop-blur-xl backdrop-saturate-150'
                : 'border-transparent bg-transparent'
            }`}
          >
            <RouteLink
              to="home"
              className="group flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-[-0.02em] text-ink"
            >
              <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
                <span className="absolute h-2.5 w-2.5 rounded-full bg-signal transition-transform duration-500 group-hover:scale-150" />
              </span>
              {SITE_NAME}
            </RouteLink>

            <ul className="relative hidden items-center gap-1 rounded-full bg-ink/[0.04] p-1 md:flex">
              {NAV_ITEMS.map((item) => {
                const active = page === item.page;
                return (
                  <li key={item.page} className="relative">
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-ink shadow-lift"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <RouteLink
                      to={item.page}
                      aria-current={active ? 'page' : undefined}
                      className={`relative z-10 block rounded-full px-5 py-2 text-[14px] font-medium transition-colors duration-300 ${
                        active ? 'text-paper' : 'text-ink-500 hover:text-ink'
                      }`}
                    >
                      {item.name}
                    </RouteLink>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a href={EMAIL_HREF} className="btn-primary btn-sm hidden md:inline-flex" data-cursor="link">
                {CTA.primary}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <button
                ref={menuBtn}
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper md:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-paper px-5 pb-8 pt-28 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.page}
                  className="border-b border-ink/10"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  <RouteLink
                    to={item.page}
                    aria-current={page === item.page ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 font-display text-5xl font-semibold tracking-[-0.022em]"
                  >
                    <span className={page === item.page ? 'text-ink' : 'text-ink-400'}>{item.name}</span>
                    <span className="label text-ink-400" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </RouteLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost btn-sm"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
