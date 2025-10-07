import React from 'react';

interface ServiceItem {
  title: string;
  desc: string;
}

const SERVICES: ServiceItem[] = [
  { title: 'Brand Strategy', desc: 'Positioning, narrative, and differentiated messaging that resonates.' },
  { title: 'Performance Marketing', desc: 'Full-funnel paid acquisition and continual optimization.' },
  { title: 'Content & Creative', desc: 'High-impact visual and written assets for every stage.' },
  { title: 'Web Experience', desc: 'Conversion-focused design and development with scalability.' },
  { title: 'Analytics & CRO', desc: 'Dashboards, experimentation, and data-backed iteration.' },
  { title: 'Retention & Lifecycle', desc: 'Email, CRM flows, personalization, and loyalty programs.' },
];

export const Services: React.FC = () => {
  return (
    <section data-section id="services" className="relative overflow-hidden">
      {/* Background gradient layer */}
      <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-60" aria-hidden />

      <div className="container-shell">
        <div className="mb-12 flex flex-col gap-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            <span className="text-gradient-brand">Services</span>
          </h2>
          <p className="text-[var(--color-text-muted)]">
            End-to-end capabilities to unlock growth across acquisition, retention, and brand equity.
          </p>
        </div>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, index) => (
            <div
              key={s.title}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] dark:bg-[var(--color-surface)]/60 p-6 hover:shadow-card transition-all duration-300 relative overflow-hidden hover:scale-105 hover:border-[var(--color-brand)]"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-card" aria-hidden />

              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />

              <div className="relative z-10">
                <h3 className="font-medium text-lg mb-2 group-hover:text-[var(--color-brand)] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
