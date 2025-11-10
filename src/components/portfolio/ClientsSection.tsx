'use client'

import React from 'react';
import Image from 'next/image';
import { useSiteSettingValue } from '@/hooks';

interface ClientLogo {
  name: string;
  logo: string;
}

export const ClientsSection: React.FC = () => {
  const clientsData = useSiteSettingValue<{ title: string, logos: ClientLogo[] }>(
    'clients_section',
    {
      title: 'Trusted by Leading Brands',
      logos: []
    }
  );

  return (
    <section data-section id="clients" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-30" aria-hidden />

      <div className="container-shell flex flex-col gap-10">
        <h3 className="text-[clamp(2rem,5vw,3.25rem)] font-display tracking-wide text-gradient-brand text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
          {clientsData.title}
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 bg-gradient-card rounded-3xl px-8 py-12 shadow-card border-2 border-[var(--color-brand)]/20">
          {clientsData.logos.map(client => (
            <div
              key={client.name}
              className="group relative grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
              title={client.name}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={120}
                className="object-contain max-h-32"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
