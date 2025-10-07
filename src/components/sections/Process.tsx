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
    <section data-section id="process" className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-40" aria-hidden />

      <div className="container-shell">
        <div className="mb-12 flex flex-col gap-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            <span className="text-gradient-brand">How We Work</span>
          </h2>
          <p className="text-[var(--color-text-muted)]">A structured yet flexible framework that compounds learnings and accelerates momentum.</p>
        </div>
        <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(step => (
            <li key={step.num} className="group relative p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col gap-3 overflow-hidden hover:scale-105 hover:border-[var(--color-brand)] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
              <span className="relative z-10 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-brand text-white font-semibold text-sm shadow-card">{step.num}</span>
              <h3 className="relative z-10 font-medium text-lg group-hover:text-[var(--color-brand)] transition-colors">{step.title}</h3>
              <p className="relative z-10 text-sm text-[var(--color-text-muted)] leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
