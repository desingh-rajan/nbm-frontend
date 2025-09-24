import React from 'react';

interface PortfolioItem {
  title: string;
  category: string;
  thumb: string; // image path placeholder (video future)
}

const PORTFOLIO: PortfolioItem[] = [
  { title: 'Ecommerce Scale Campaign', category: 'Paid Growth', thumb: '/placeholders/portfolio-1.jpg' },
  { title: 'SaaS Activation Funnel', category: 'Lifecycle', thumb: '/placeholders/portfolio-2.jpg' },
  { title: 'Brand Refresh Rollout', category: 'Brand', thumb: '/placeholders/portfolio-3.jpg' },
  { title: 'CRO Experiment Series', category: 'Optimization', thumb: '/placeholders/portfolio-4.jpg' },
  { title: 'Retention Winback Flow', category: 'Email/CRM', thumb: '/placeholders/portfolio-5.jpg' },
  { title: 'High-Impact Product Launch', category: 'Go-To-Market', thumb: '/placeholders/portfolio-6.jpg' },
];

export const Portfolio: React.FC = () => {
  return (
    <section data-section id="portfolio">
      <div className="container-shell">
        <div className="mb-12 flex flex-col gap-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Selected Work</h2>
          <p className="text-[var(--color-text-muted)]">A snapshot of engagements delivering measurable growth and brand equity.</p>
        </div>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map(item => (
            <div key={item.title} className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm hover:shadow-card-lg transition-shadow">
              <div className="aspect-video w-full bg-[var(--color-bg-muted)] flex items-center justify-center text-xs text-[var(--color-text-muted)]">Placeholder</div>
              <div className="p-4 flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wide text-[var(--color-brand)] font-medium">{item.category}</span>
                <h3 className="text-base font-medium">{item.title}</h3>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-[var(--color-brand)]/15 via-transparent to-transparent" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
