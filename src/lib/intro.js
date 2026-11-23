import { prefersReducedMotion } from './motion';

// Evaluated once at startup: is the first-visit intro going to play?
// Hero entrance animations wait for it so they aren't hidden underneath.
const read = () => {
  try {
    return !sessionStorage.getItem('tb-intro');
  } catch {
    return true;
  }
};
export const INTRO_ACTIVE = typeof window !== 'undefined' && read() && !prefersReducedMotion();
export const INTRO_DELAY = INTRO_ACTIVE ? 0.75 : 0;
