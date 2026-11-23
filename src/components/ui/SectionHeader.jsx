import { Reveal, SplitWords } from './Reveal';

// Consistent section opener: mono index label, display title with an optional
// accent fragment in the signal colour (same typeface), subtitle.
export default function SectionHeader({
  id,
  index,
  kicker,
  lead,
  accent,
  subtitle,
  dark = false,
  align = 'left',
  as: H = 'h2',
  className = '',
  titleClassName = 'text-[clamp(2.6rem,6.2vw,5.4rem)]',
}) {
  const centered = align === 'center';
  return (
    <header className={`${centered ? 'mx-auto text-center' : ''} ${className}`}>
      {(index || kicker) && (
        <Reveal
          y={12}
          className={`label mb-6 flex items-center gap-3 ${centered ? 'justify-center' : ''} ${
            dark ? 'text-white/50' : 'text-ink-500'
          }`}
        >
          {index && <span className={dark ? 'text-signal-400' : 'text-signal-600'}>({index})</span>}
          <span aria-hidden="true" className={`h-px w-8 ${dark ? 'bg-white/25' : 'bg-ink/25'}`} />
          {kicker && <span>{kicker}</span>}
        </Reveal>
      )}
      <H
        id={id}
        className={`font-display font-semibold leading-[1.06] tracking-[-0.022em] text-balance ${titleClassName} ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {lead && <SplitWords text={lead.trim()} />}
        {lead && accent ? ' ' : null}
        {accent && (
          <SplitWords
            text={accent}
            delay={0.08}
            wordClassName={`serif-accent pr-[0.04em] ${dark ? 'text-signal-400' : 'text-signal-600'}`}
          />
        )}
      </H>
      {subtitle && (
        <Reveal
          delay={0.15}
          as="p"
          className={`mt-6 max-w-[52ch] text-[17px] leading-relaxed text-pretty ${centered ? 'mx-auto' : ''} ${
            dark ? 'text-white/60' : 'text-ink-500'
          }`}
        >
          {subtitle}
        </Reveal>
      )}
    </header>
  );
}
