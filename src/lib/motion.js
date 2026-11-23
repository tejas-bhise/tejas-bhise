// Shared motion language. One easing curve family, a few durations.
export const EASE = [0.16, 1, 0.3, 1]; // expo-out — confident, calm settle
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const VIEWPORT = { once: true, margin: '0px 0px -6% 0px' };

// True on devices with a precise pointer (mouse/trackpad) — used to gate
// hover-only flourishes such as magnetic buttons and the cursor.
export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
