import React from 'react';

interface Testimonial { name: string; role: string; quote: string; }

const TESTIMONIALS: Testimonial[] = [
  { name: 'Sarah K.', role: 'VP Growth, SaaS', quote: 'Their structured experimentation model unlocked channels we had written off.' },
  { name: 'Arjun P.', role: 'Founder, DTC Brand', quote: 'Month three and our blended ROAS improved 42% while scaling spend.' },
  { name: 'Lena M.', role: 'CMO, Marketplace', quote: 'They operate like an embedded strategic partner, not an agency.' },
];

export const Testimonials: React.FC = () => {
  return (
    <section data-section id="testimonials" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-30" aria-hidden />

      <div className="container-shell">
        <div className="mb-12 flex flex-col gap-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            <span className="text-gradient-brand">What Partners Say</span>
          </h2>
          <p className="text-[var(--color-text-muted)]">Proof through outcomes and lasting relationships.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <figure
              key={t.name}
              className="group relative p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col gap-4 shadow-sm hover:shadow-card hover:scale-105 hover:border-[var(--color-brand)] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" aria-hidden />

              <blockquote className="relative z-10 text-sm leading-relaxed text-[var(--color-text)]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="relative z-10 text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                <span className="font-medium text-[var(--color-brand)] not-italic normal-case">{t.name}</span><br />{t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
