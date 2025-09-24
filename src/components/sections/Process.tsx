import React from 'react';

interface Step { num: number; title: string; desc: string; }

const STEPS: Step[] = [
  { num: 1, title: 'Discovery & Audit', desc: 'Deep dive into goals, channels, historical performance, and customer insights.' },
  { num: 2, title: 'Strategy Design', desc: 'Integrated roadmap spanning acquisition, retention, creative, and experimentation.' },
  { num: 3, title: 'Execution Sprints', desc: 'Cross-functional implementation with rapid iteration and feedback loops.' },
  { num: 4, title: 'Optimization & Scale', desc: 'Continuous measurement, A/B testing, and compounding improvements.' },
];

export const Process: React.FC = () => {
  return (
    <section data-section id="process" className="bg-[var(--color-bg-muted)] dark:bg-[var(--color-surface-alt)]/40">
      <div className="container-shell">
        <div className="mb-12 flex flex-col gap-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">How We Work</h2>
          <p className="text-[var(--color-text-muted)]">A structured yet flexible framework that compounds learnings and accelerates momentum.</p>
        </div>
        <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(step => (
            <li key={step.num} className="group relative p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col gap-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-brand)]/5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
              <span className="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--color-brand)] text-white font-semibold text-sm shadow-card">{step.num}</span>
              <h3 className="font-medium text-lg">{step.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
