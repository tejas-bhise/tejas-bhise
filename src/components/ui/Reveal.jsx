import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { EASE, VIEWPORT } from '../../lib/motion';

// Fade + rise on enter. `as` lets callers keep semantic elements.
export function Reveal({ as = 'div', delay = 0, y = 18, className = '', children, ...rest }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

// Masked word-by-word rise for display headings. Words stay real text
// (separated by real spaces) so copy, search and screen readers are unaffected.
export function SplitWords({ text, className = '', wordClassName = '', delay = 0, stagger = 0.04, animateOnMount = false }) {
  const words = text.split(' ').filter(Boolean);
  const trigger = animateOnMount
    ? { initial: 'hidden', animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT };
  return (
    <motion.span
      className={className}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${wordClassName}`}
              variants={{
                hidden: { y: '105%' },
                visible: { y: '0%', transition: { duration: 0.7, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
