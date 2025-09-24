import React from 'react';

const CLIENTS = ['ANU', 'MOKSA', 'SMB', 'ATR', 'THANGAMAYIL', 'BESPOKE', 'RAJMAHAL'];

export const ClientsSection: React.FC = () => {
  return (
    <section data-section id="clients" className="relative">
      <div className="container-shell flex flex-col gap-10">
        <div className="flex flex-wrap justify-center gap-10 opacity-90 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),rgba(0,104,55,0.12))] rounded-3xl py-10">
          {CLIENTS.map(c => (
            <span key={c} className="text-[var(--color-brand-dark)] font-medium tracking-wide text-sm md:text-base">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
