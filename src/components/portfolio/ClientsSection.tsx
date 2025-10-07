import React from 'react';

const CLIENTS = ['ANU', 'MOKSA', 'SMB', 'ATR', 'THANGAMAYIL', 'BESPOKE', 'RAJMAHAL'];

export const ClientsSection: React.FC = () => {
  return (
    <section data-section id="clients" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-30" aria-hidden />

      <div className="container-shell flex flex-col gap-10">
        <div className="flex flex-wrap justify-center gap-10 bg-gradient-card rounded-3xl py-10 shadow-card border-2 border-[var(--color-brand)]/20">
          {CLIENTS.map(c => (
            <span key={c} className="text-[var(--color-brand)] font-bold tracking-wide text-sm md:text-base hover:scale-110 transition-transform">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
