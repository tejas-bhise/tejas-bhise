import { BarChart3, CheckCircle2, Code2, GitBranch, Target, Zap } from 'lucide-react';
import Pipeline from '../../ui/Pipeline';

// Expanded case-study body shared by every project on the Projects page.
// Section labels are the original ones; layout is a research-paper style spread.
function Block({ icon: IconC, label, dark, children, className = '' }) {
  return (
    <section className={className}>
      <div className={`mb-4 flex items-center gap-2 ${dark ? 'text-signal-400' : 'text-signal-600'}`}>
        <IconC className="h-3.5 w-3.5" aria-hidden="true" />
        <h4 className="label">{label}</h4>
      </div>
      {children}
    </section>
  );
}

export default function ProjectDetails({ project, dark = false }) {
  const card = dark ? 'border-white/10 bg-white/[0.03]' : 'border-ink/10 bg-white';
  const body = dark ? 'text-white/75' : 'text-ink-600';
  const strong = dark ? 'text-white' : 'text-ink';
  const rule = dark ? 'border-white/10' : 'border-ink/10';

  return (
    <div className={`space-y-12 border-t pt-10 ${rule}`}>
      {/* Problem / Solution */}
      <div className="grid gap-4 md:grid-cols-2">
        <Block icon={Target} label="The Problem" dark={dark} className={`rounded-2xl border p-6 sm:p-7 ${card}`}>
          <p className={`text-[15.5px] leading-relaxed ${body}`}>{project.problem}</p>
        </Block>
        <Block icon={CheckCircle2} label="The Solution" dark={dark} className={`rounded-2xl border p-6 sm:p-7 ${card}`}>
          <p className={`text-[15.5px] leading-relaxed ${body}`}>{project.solution}</p>
        </Block>
      </div>

      {/* Key challenges */}
      <Block icon={Zap} label="Key Challenges" dark={dark}>
        <ol className="grid gap-3 md:grid-cols-3">
          {project.keyChallenges?.map((challenge, i) => (
            <li key={i} className={`flex gap-3 rounded-xl border p-4 text-[14px] leading-relaxed ${card} ${body}`}>
              <span className="font-mono text-[11px] text-signal-500" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{challenge}</span>
            </li>
          ))}
        </ol>
      </Block>

      {/* Pipeline */}
      <Block icon={GitBranch} label="Pipeline" dark={dark}>
        <Pipeline value={project.pipeline} dark={dark} />
      </Block>

      {/* Implementation highlights */}
      <Block icon={Code2} label="Implementation Highlights" dark={dark}>
        <div
          className={`grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2 ${rule} ${
            dark ? 'bg-white/10' : 'bg-ink/10'
          }`}
        >
          {project.implementationHighlights?.map((h, i) => (
            <div key={i} className={`flex flex-col gap-2 p-6 ${dark ? 'bg-ink-900' : 'bg-white'}`}>
              <span className={`font-display text-[17px] font-semibold tracking-[-0.02em] ${strong}`}>{h.title}</span>
              <span className={`text-[14px] leading-relaxed ${body}`}>{h.description}</span>
            </div>
          ))}
        </div>
      </Block>

      {/* Results */}
      <Block icon={BarChart3} label="Key Results" dark={dark}>
        <ul className="space-y-3">
          {project.results?.map((result, i) => (
            <li key={i} className={`flex items-start gap-3 border-b pb-3 text-[15.5px] leading-relaxed last:border-b-0 ${rule} ${strong}`}>
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </Block>

      {project.status && (
        <div className={`flex items-center gap-2 border-t pt-5 text-[13px] ${rule}`}>
          <span
            className={`h-1.5 w-1.5 rounded-full ${project.status === 'In Progress' ? 'bg-cobalt' : 'bg-emerald-500'}`}
            aria-hidden="true"
          />
          <span className={dark ? 'text-white/50' : 'text-ink-500'}>
            Status:{' '}
            <span className={`font-semibold ${project.status === 'In Progress' ? 'text-cobalt' : dark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              {project.status}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
