'use client'

import React from 'react';
import { useSiteSettingValue } from '@/hooks';

export const AboutSection: React.FC = () => {
  const aboutTitle = useSiteSettingValue<{ title: string }>('about_title', { title: 'WHO ARE WE' });
  const aboutDescription = useSiteSettingValue<{ description: string }>(
    'about_description',
    { description: 'Never Before Marketing is a creative digital company offering cutting-edge video marketing services. We combine content strategy, production, and post-production under one roof — delivering scroll-stopping content that engages and converts.' }
  );
  const missionTitle = useSiteSettingValue<{ title: string }>('mission_title', { title: 'Our Mission' });
  const missionDescription = useSiteSettingValue<{ description: string }>(
    'mission_description',
    { description: 'To make every second of your video content count through story-driven, emotion-first edits tailored to today\'s audience.' }
  );

  return (
    <section data-section id="about" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-soft opacity-30" aria-hidden />

      <div className="container-shell flex flex-col gap-10 items-center text-center">
        <h3 className="text-[clamp(2rem,5vw,3.25rem)] font-display tracking-wide text-gradient-brand text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)]">{aboutTitle.title}</h3>
        <p className="max-w-5xl leading-relaxed tracking-wide uppercase font-medium text-[var(--color-text-muted)] [word-spacing:0.15em]">
          {aboutDescription.description}
        </p>
        <div className="rounded-xl md:rounded-2xl bg-gradient-hero text-white p-8 md:p-10 max-w-3xl text-center shadow-card-lg relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-glow blur-3xl opacity-50" aria-hidden />

          <h4 className="font-script text-3xl mb-4 text-white/90 relative z-10">{missionTitle.title}</h4>
          <p className="text-sm md:text-base leading-relaxed tracking-wide text-white/90 relative z-10">{missionDescription.description}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
