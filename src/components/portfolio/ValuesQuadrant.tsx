import React from 'react';

const VALUES = [
  { id: 'trend', title: 'TREND-BASED\nSTRATEGY' },
  { id: 'fast', title: 'FAST\nTURNAROUND' },
  { id: 'brand', title: 'BRAND-FIRST\nTHINKING' },
  { id: 'quality', title: 'QUALITY\nVISUALS' },
];

export const ValuesQuadrant: React.FC = () => {
  return (
    <section data-section id="values" className="relative">
      <div className="container-shell">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 relative">
          {VALUES.map((v, i) => (
            <div key={v.id} className="relative rounded-[4rem] p-10 min-h-[260px] flex items-center justify-center text-center font-display text-lg md:text-xl tracking-[0.2em] whitespace-pre-line text-white bg-gradient-to-br from-[var(--color-brand-dark)] to-[var(--color-brand)]">
              {v.title}
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-[var(--color-bg)]/95 border-2 border-[var(--color-brand-dark)] rounded-3xl px-10 py-8 text-center font-display text-2xl md:text-4xl tracking-[0.15em] shadow-card w-[70%] bg-gradient-to-br from-[#009e60] to-[#004d28] dark:from-[#5fffa1] dark:to-[#0d8f4a] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,64,32,0.18)]">
              WHAT WE<br />STANDS FOR
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesQuadrant;
