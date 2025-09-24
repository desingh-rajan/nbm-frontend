import React from 'react';
import Button from '@/components/ui/Button';

export const Hero: React.FC = () => {
  return (
    <section data-section id="hero" className="relative">
      <div className="absolute inset-0 -z-10 opacity-40 dark:opacity-30 bg-gradient-brand blur-3xl" aria-hidden />
      <div className="container-shell flex flex-col gap-8 items-start">
        <p className="text-sm font-medium tracking-wide text-[var(--color-brand)] uppercase">Growth Focused Digital Strategies</p>
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl">Never Before Marketing delivers <span className="text-[var(--color-brand)]">measurable impact</span> for your brand.</h1>
        <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl">We craft conversion-driven campaigns, high-performance experiences, and data-informed optimizations that accelerate sustainable growth.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="md">Book a Strategy Call</Button>
          <Button variant="outline" size="md">View Our Work</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
