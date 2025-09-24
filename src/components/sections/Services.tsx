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
    <section data-section id="services" className="bg-[var(--color-bg-muted)] dark:bg-[var(--color-surface-alt)]/40">
      <div className="container-shell">
        <div className="mb-12 flex flex-col gap-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Services</h2>
          <p className="text-[var(--color-text-muted)]">End-to-end capabilities to unlock growth across acquisition, retention, and brand equity.</p>
        </div>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(s => (
            <div key={s.title} className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] dark:bg-[var(--color-surface)]/60 p-6 hover:shadow-card transition-shadow relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[var(--color-brand)]/5 to-transparent" aria-hidden />
              <h3 className="font-medium text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
