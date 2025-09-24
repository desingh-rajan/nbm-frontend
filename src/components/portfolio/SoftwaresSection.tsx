import React from 'react';
import Image from 'next/image';

interface SoftwareItem { name: string; logo: string; }
const SOFTWARES: SoftwareItem[] = [
  { name: 'After Effects', logo: '/logos/after-effects.svg' },
  { name: 'Premiere Pro', logo: '/logos/premiere-pro.svg' },
  { name: 'DaVinci Resolve', logo: '/logos/davinci-resolve.svg' },
  { name: 'Photoshop', logo: '/logos/photoshop.svg' },
  { name: 'Canva', logo: '/logos/canva.svg' },
];

export const SoftwaresSection: React.FC = () => {
  return (
    <section data-section id="softwares" className="relative">
      <div className="container-shell">
        <div className="rounded-[2.5rem] p-12 md:p-16 bg-[radial-gradient(circle_at_top_left,rgba(0,104,55,0.18),rgba(0,77,40,0.85))] flex flex-col gap-12">
          <h3 className="text-[clamp(2rem,5vw,3.25rem)] font-display tracking-wide bg-gradient-to-br from-[#009e60] to-[#004d28] dark:from-[#5fffa1] dark:to-[#0d8f4a] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,64,32,0.18)]">SOFTWARES</h3>
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <ul className="flex flex-wrap gap-6 w-full lg:max-w-sm">
              {SOFTWARES.map(s => (
                <li key={s.name} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/85 border border-[var(--color-brand-dark)] shadow-sm">
                  <Image src={s.logo} alt={s.name} width={40} height={40} className="h-10 w-10 rounded-xl" />
                  <span className="text-sm font-medium tracking-wide text-[var(--color-brand-dark)]">{s.name}</span>
                </li>
              ))}
            </ul>
            <div className="flex-1 grid place-items-center w-full min-h-[260px] rounded-3xl bg-white/10 border border-white/25 backdrop-blur relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" aria-hidden />
              <div className="w-full max-w-xl aspect-[16/9] rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-[var(--color-brand)] relative overflow-hidden">
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
