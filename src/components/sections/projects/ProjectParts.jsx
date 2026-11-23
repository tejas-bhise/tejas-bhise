import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ExternalLink, Github } from 'lucide-react';
import { EASE } from '../../../lib/motion';
import ProjectDetails from './ProjectDetails';

export function Tags({ items, dark = false }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className={dark ? 'tag-dark' : 'tag'}>
          {t}
        </span>
      ))}
    </div>
  );
}

export function LinkButton({ href, icon: IconC, children, variant = 'btn-primary' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${variant} btn-sm`}>
      <IconC className="h-3.5 w-3.5" aria-hidden="true" />
      {children}
    </a>
  );
}

export function DetailsToggle({ open, onClick, controls, dark = false, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls={controls}
      className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors duration-300 ${
        dark
          ? 'border-white/15 text-white/80 hover:border-white/40 hover:text-white'
          : 'border-ink/15 text-ink-600 hover:border-ink/40 hover:text-ink'
      } ${className}`}
    >
      {open ? 'Less Details' : 'Details'}
      <ChevronDown
        className={`h-3.5 w-3.5 transition-transform duration-500 ease-expo ${open ? 'rotate-180' : ''}`}
        aria-hidden="true"
      />
    </button>
  );
}

export function DetailsPanel({ id, open, project, dark = false }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="pt-10">
            <ProjectDetails project={project} dark={dark} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { ExternalLink, Github };
