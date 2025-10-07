import React from 'react';

export interface WorkItem { id: string; title?: string; category?: string; thumb: string; }

const TOP_WORKS: WorkItem[] = [
  { id: 'w1', thumb: '/placeholders/portfolio-1.jpg' },
  { id: 'w2', thumb: '/placeholders/portfolio-2.jpg' },
  { id: 'w3', thumb: '/placeholders/portfolio-3.jpg' },
  { id: 'w4', thumb: '/placeholders/portfolio-4.jpg' },
];

const SECOND_ROW: WorkItem[] = [
  { id: 'w5', thumb: '/placeholders/portfolio-5.jpg' },
  { id: 'w6', thumb: '/placeholders/portfolio-6.jpg' },
  { id: 'w7', thumb: '/placeholders/portfolio-1.jpg' },
  { id: 'w8', thumb: '/placeholders/portfolio-2.jpg' },
];

const cardCls = 'relative overflow-hidden rounded-[2rem] aspect-[9/16] bg-[var(--color-bg-muted)] flex items-center justify-center shadow-card';

export const WorksGrid: React.FC = () => {
  return (
    <section data-section id="our-works" className="relative overflow-hidden">
      {/* Background gradient layer */}
      <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-50" aria-hidden />

      <div className="container-shell flex flex-col gap-16">
        <h2 className="text-[clamp(2.2rem,6vw,4rem)] font-display tracking-wide text-gradient-brand text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)]">OUR WORKS</h2>
        <div className="rounded-[2.5rem] p-8 md:p-10 bg-gradient-overlay flex flex-col gap-12 shadow-card-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {TOP_WORKS.map(w => (
              <div key={w.id} className={cardCls}>IMG</div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {SECOND_ROW.map(w => (
              <div key={w.id} className={cardCls}>IMG</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksGrid;
