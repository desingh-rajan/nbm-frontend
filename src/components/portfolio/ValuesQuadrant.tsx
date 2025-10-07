import React from 'react';

const VALUES = [
  {
    id: 'trend',
    title: 'TREND-BASED\nSTRATEGY',
    description: 'Data-driven insights',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 13L7 17L11 13L15 15L21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 3V9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'fast',
    title: 'FAST\nTURNAROUND',
    description: 'Quick delivery',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'brand',
    title: 'BRAND-FIRST\nTHINKING',
    description: 'Strategic approach',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M12 2L14 8L20 6L16 12L22 14L16 16L20 22L14 18L12 22L10 16L4 18L8 12L2 10L8 8L4 2L10 6L12 2Z" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  {
    id: 'quality',
    title: 'QUALITY\nVISUALS',
    description: 'Premium execution',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26 12,2" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 9L13 11L15 10L14 12L16 13L14 14L15 16L13 15L12 17L11 15L9 16L10 14L8 13L10 12L9 10L11 11L12 9Z" fill="currentColor" />
      </svg>
    )
  },
];

export const ValuesQuadrant: React.FC = () => {
  return (
    <section data-section id="values" className="relative">
      <div className="container-shell">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 relative">
          {VALUES.map((v) => (
            <div key={v.id} className="group relative rounded-[4rem] p-10 min-h-[260px] flex flex-col items-center justify-center text-center font-display text-white bg-gradient-hero overflow-hidden hover:scale-105 transition-all duration-300 shadow-card-lg hover:shadow-glow-green">
              {/* Background Icon */}
              <div className="absolute top-4 right-6 text-white/10 scale-150">
                {v.icon}
              </div>

              {/* Main Icon */}
              <div className="text-white/90 mb-4 drop-shadow-lg">
                {v.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl tracking-[0.2em] whitespace-pre-line font-bold mb-3">
                {v.title}
              </h3>

              {/* Description */}
              <p className="text-sm opacity-80 tracking-wide">
                {v.description}
              </p>
            </div>
          ))}

          {/* Center Text - Better sized and positioned */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/95 dark:bg-[var(--color-bg)]/95 border-4 border-[var(--color-brand)] rounded-2xl px-6 py-4 text-center font-display text-lg md:text-2xl tracking-[0.15em] shadow-card-lg max-w-[280px]">
              <span className="text-gradient-brand font-bold">
                WHAT WE<br />STANDS FOR
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesQuadrant;
