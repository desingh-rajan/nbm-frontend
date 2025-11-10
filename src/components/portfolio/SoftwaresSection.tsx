'use client'

import React from 'react';
import Image from 'next/image';
import { useSiteSettingValue } from '@/hooks';

interface SoftwareItem {
  name: string;
  icon: string;
}

export const SoftwaresSection: React.FC = () => {
  const softwaresData = useSiteSettingValue<{ title: string, items: SoftwareItem[] }>(
    'softwares_section',
    {
      title: 'Industry-Leading Tools',
      items: [
        { name: 'After Effects', icon: '/logos/after-effects.svg' },
        { name: 'Premiere Pro', icon: '/logos/premiere-pro.svg' },
        { name: 'DaVinci Resolve', icon: '/logos/davinci-resolve.svg' },
        { name: 'Photoshop', icon: '/logos/photoshop.svg' },
        { name: 'Canva', icon: '/logos/canva.svg' },
      ]
    }
  );

  return (
    <section data-section id="softwares" className="relative">
      <div className="container-shell">
        <div className="rounded-[2.5rem] p-12 md:p-16 bg-gradient-overlay flex flex-col gap-12 shadow-card-lg">
          <h3 className="text-[clamp(2rem,5vw,3.25rem)] font-display tracking-wide text-gradient-brand text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
            {softwaresData.title}
          </h3>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <ul className="flex flex-wrap gap-6 w-full lg:max-w-sm">
              {softwaresData.items.map(s => (
                <li key={s.name} className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 dark:bg-[var(--color-surface)] border-2 border-[var(--color-brand)] shadow-card hover:shadow-glow-green hover:scale-105 transition-all">
                  {s.icon && (
                    <Image src={s.icon} alt={s.name} width={40} height={40} className="h-10 w-10 rounded-xl" />
                  )}
                  <span className="text-sm font-medium tracking-wide text-[var(--color-brand)] group-hover:text-[var(--color-brand-dark)] transition-colors">{s.name}</span>
                </li>
              ))}
            </ul>
            <div className="flex-1 grid place-items-center w-full min-h-[260px] rounded-3xl bg-gradient-card border-2 border-[var(--color-brand)]/30 backdrop-blur relative overflow-hidden shadow-card">
              <div className="absolute inset-0 bg-gradient-glow opacity-20" aria-hidden />
              <div className="w-full max-w-xl aspect-[16/9] rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-[var(--color-brand)] relative overflow-hidden shadow-glow-green">
                {/* Mock timeline interface */}
                <div className="absolute top-2 left-2 right-2 h-8 bg-slate-700 rounded flex items-center px-3 text-xs text-white font-mono">timeline_project_final_v3.aep</div>
                <div className="absolute bottom-2 left-2 right-2 h-16 bg-slate-800 rounded p-2">
                  <div className="grid grid-cols-8 gap-1 h-full">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className={`rounded ${i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-green-500' : 'bg-purple-500'}`} />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/70 text-xs text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center text-lg">▶</div>
                    Motion Graphics Workflow
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftwaresSection;

