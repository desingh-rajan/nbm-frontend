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
        { name: 'Adobe After Effects', icon: '/software-logos/after-effects.svg' },
        { name: 'Cinema 4D', icon: '/software-logos/cinema4d.svg' },
        { name: 'Blender', icon: '/software-logos/blender.png' },
        { name: 'Adobe Premiere Pro', icon: '/software-logos/premiere.svg' },
        { name: 'DaVinci Resolve', icon: '/software-logos/davinci.png' },
        { name: 'Houdini', icon: '/software-logos/houdini.svg' },
      ]
    }
  );

  return (
    <section data-section id="softwares" className="relative overflow-hidden">
      {/* Background gradient layer */}
      <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-40" aria-hidden />

      <div className="container-shell">
        <div className="rounded-[2.5rem] p-10 md:p-14 bg-gradient-overlay flex flex-col gap-12 shadow-card-lg border border-[var(--color-brand)]/10">
          <h3 className="text-[clamp(2rem,5vw,3.25rem)] font-display tracking-wide text-gradient-brand text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
            {softwaresData.title}
          </h3>

          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
            {/* Software Grid */}
            <div className="w-full lg:w-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
                {softwaresData.items.map(s => (
                  <div
                    key={s.name}
                    className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/95 dark:bg-[var(--color-surface)]/95 border-2 border-[var(--color-brand)]/20 shadow-card hover:shadow-glow-green hover:scale-105 hover:border-[var(--color-brand)]/60 transition-all duration-300"
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      {s.icon && (
                        s.icon.endsWith('.svg') ? (
                          // Use regular img tag for SVGs
                          <img
                            src={s.icon}
                            alt={s.name}
                            className="w-full h-full object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all"
                          />
                        ) : (
                          // Use Next Image for PNGs
                          <Image
                            src={s.icon}
                            alt={s.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain drop-shadow-md group-hover:drop-shadow-xl transition-all"
                          />
                        )
                      )}
                    </div>
                    <span className="text-xs font-semibold text-center tracking-wide text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors leading-tight">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock Editing Interface */}
            <div className="flex-1 w-full grid place-items-center min-h-[320px] lg:min-h-[380px]">
              <div className="w-full max-w-2xl aspect-[16/9] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-[var(--color-brand)]/50 relative overflow-hidden shadow-2xl">
                {/* Top bar */}
                <div className="absolute top-3 left-3 right-3 h-9 bg-slate-700/90 backdrop-blur rounded-lg flex items-center px-4 text-xs text-white/90 font-mono shadow-lg">
                  <span className="truncate">timeline_project_final_v3.aep</span>
                </div>

                {/* Timeline at bottom */}
                <div className="absolute bottom-3 left-3 right-3 h-20 bg-slate-800/90 backdrop-blur rounded-lg p-3 shadow-lg">
                  <div className="grid grid-cols-8 gap-2 h-full">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-md transform hover:scale-105 transition-transform ${i % 3 === 0 ? 'bg-gradient-to-t from-blue-600 to-blue-400' :
                          i % 3 === 1 ? 'bg-gradient-to-t from-green-600 to-green-400' :
                            'bg-gradient-to-t from-purple-600 to-purple-400'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Center play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[var(--color-brand)]/30 backdrop-blur-sm border-2 border-[var(--color-brand)] flex items-center justify-center text-2xl text-white shadow-glow-green cursor-pointer hover:scale-110 transition-transform">
                      ▶
                    </div>
                    <p className="text-white/80 text-sm font-medium tracking-wide">Motion Graphics Workflow</p>
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

