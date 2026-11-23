import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, MousePointerClick } from 'lucide-react';
import { HERO } from '../../../content/home';
import { SOCIAL_LINKS } from '../../../content/site';
import { RouteLink } from '../../../lib/router';
import { EASE } from '../../../lib/motion';
import { INTRO_DELAY } from '../../../lib/intro';
import { scrollToElement, useLenis } from '../../../lib/smoothScroll';
import { SplitWords } from '../../ui/Reveal';
import Magnetic from '../../ui/Magnetic';
import Icon from '../../ui/Icon';
import LazyScene from '../../three/LazyScene';
import { loadWorkspace } from '../../three/loaders';

const rise = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay: INTRO_DELAY + delay },
});

export default function Hero() {
  const ref = useRef(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      {/* soft ambient light */}
      <div
        aria-hidden="true"
        className="absolute -z-20 h-[80vmin] w-[80vmin] bg-[radial-gradient(closest-side,rgba(47,75,255,0.08),rgba(229,69,44,0.05)_55%,transparent)] max-lg:left-1/2 max-lg:top-[45%] max-lg:-translate-x-1/2 lg:right-[2%] lg:top-[12%]"
      />
      <div aria-hidden="true" className="dot-grid absolute inset-0 -z-20 opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_50%,#000,transparent_75%)]" />

      <div className="shell grid min-h-[100svh] items-center gap-6 pb-24 pt-28 lg:grid-cols-12 lg:gap-4 lg:pb-16 lg:pt-24">
        {/* Copy */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 lg:col-span-6">
          <motion.p
            {...rise(0.05)}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-ink/10 bg-paper-50/80 py-1.5 pl-2.5 pr-4 text-[13px] font-medium text-ink-700 shadow-hair backdrop-blur"
          >
            <span className="h-2 w-2 animate-pulsedot rounded-full bg-emerald-500" />
            {HERO.availability}
          </motion.p>

          <h1
            id="hero-title"
            className="mt-8 font-display text-[clamp(4rem,10.5vw,8.6rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-ink"
          >
            <SplitWords text={HERO.firstName} animateOnMount delay={INTRO_DELAY + 0.1} />
            <br />
            <SplitWords text={HERO.lastName} animateOnMount delay={INTRO_DELAY + 0.18} />
          </h1>

          <motion.p
            {...rise(0.3)}
            className="mt-7 font-display text-[clamp(1.35rem,2.2vw,1.8rem)] font-medium leading-snug tracking-[-0.015em] text-ink-600"
          >
            {HERO.roleLead}
            <span className="text-signal-600">{HERO.roleAccent}</span>
          </motion.p>
          <motion.p {...rise(0.38)} className="mt-4 max-w-[44ch] text-[17px] leading-[1.75] text-ink-500 text-pretty">
            {HERO.intro}
          </motion.p>

          <motion.div {...rise(0.46)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <RouteLink to="projects" className="btn-primary group">
                {HERO.primaryCta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </RouteLink>
            </Magnetic>
            <Magnetic>
              <RouteLink to="resume" className="btn-ghost">
                {HERO.secondaryCta}
              </RouteLink>
            </Magnetic>
            <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-ink/15 sm:block" />
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="icon-btn">
                  <Icon name={s.id} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* 3D system diorama */}
        <motion.div {...rise(0.2)} className="relative lg:col-span-6">
          <LazyScene eager loader={loadWorkspace} className="h-[340px] sm:h-[480px] lg:h-[min(660px,78svh)]" />
          <p className="label mt-1 flex items-center justify-center gap-2 text-ink-400 lg:-mt-4" aria-hidden="true">
            <MousePointerClick className="h-3.5 w-3.5 text-signal-600" />
            <span className="hidden sm:inline">Hover around the desk · click the lamp, mug or screens</span>
            <span className="sm:hidden">Tap things on the desk</span>
          </p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-6 hidden justify-center lg:flex">
        <motion.button
          type="button"
          {...rise(0.7)}
          onClick={() => scrollToElement(lenis, document.getElementById('work-title'), -140)}
          className="group flex flex-col items-center gap-2 text-ink-500"
          aria-label="Scroll to selected work"
        >
          <span className="label">Scroll</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-paper-50/80 backdrop-blur transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
          </span>
        </motion.button>
      </div>
    </section>
  );
}
