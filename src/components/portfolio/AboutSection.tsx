import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section data-section id="about" className="relative">
      <div className="container-shell flex flex-col gap-10 items-center text-center">
        <h3 className="text-[clamp(2rem,5vw,3.25rem)] font-display tracking-wide bg-gradient-to-br from-[#009e60] to-[#004d28] dark:from-[#5fffa1] dark:to-[#0d8f4a] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,64,32,0.18)] text-center">WHO ARE WE</h3>
        <p className="max-w-5xl leading-relaxed tracking-wide uppercase font-medium text-[var(--color-text-muted)] [word-spacing:0.15em]">
          Never Before Marketing is a creative digital company offering cutting-edge video marketing services. We combine content strategy, production, and post-production under one roof — delivering scroll-stopping content that engages and converts.
        </p>
        <div className="rounded-xl md:rounded-2xl bg-[var(--color-brand-dark)] text-white p-8 md:p-10 max-w-3xl text-center">
          <h4 className="font-script text-3xl mb-4 text-[var(--color-accent)]">Our Mission</h4>
          <p className="text-sm md:text-base leading-relaxed tracking-wide">To make every second of your video content count through story-driven, emotion-first edits tailored to today’s audience.</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
