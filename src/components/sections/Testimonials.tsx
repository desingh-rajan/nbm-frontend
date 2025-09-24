import React from 'react';

interface Testimonial { name: string; role: string; quote: string; }

const TESTIMONIALS: Testimonial[] = [
  { name: 'Sarah K.', role: 'VP Growth, SaaS', quote: 'Their structured experimentation model unlocked channels we had written off.' },
  { name: 'Arjun P.', role: 'Founder, DTC Brand', quote: 'Month three and our blended ROAS improved 42% while scaling spend.' },
  { name: 'Lena M.', role: 'CMO, Marketplace', quote: 'They operate like an embedded strategic partner, not an agency.' },
];

export const Testimonials: React.FC = () => {
  return (
    <section data-section id="testimonials">
      <div className="container-shell">
        <div className="mb-12 flex flex-col gap-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold">What Partners Say</h2>
          <p className="text-[var(--color-text-muted)]">Proof through outcomes and lasting relationships.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(t => (
            <figure key={t.name} className="relative p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col gap-4 shadow-sm">
              <blockquote className="text-sm leading-relaxed text-[var(--color-text)]">“{t.quote}”</blockquote>
              <figcaption className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                <span className="font-medium text-[var(--color-text)] not-italic normal-case">{t.name}</span><br />{t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
