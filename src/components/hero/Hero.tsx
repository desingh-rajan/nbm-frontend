import React from 'react';
import Button from '@/components/ui/Button';

export const Hero: React.FC = () => {
  return (
    <section data-section id="hero" className="relative overflow-hidden">
      {/* Gradient background with glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-5 dark:opacity-10" aria-hidden />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 -z-10 bg-gradient-glow blur-3xl opacity-30" aria-hidden />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 -z-10 bg-gradient-glow blur-3xl opacity-20" aria-hidden />

      <div className="container-shell flex flex-col gap-8 items-start relative">
        <p className="text-sm font-medium tracking-wide text-[var(--color-brand)] uppercase bg-gradient-accent bg-clip-text">
          Growth Focused Digital Strategies
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl">
          Never Before Marketing delivers{' '}
          <span className="text-gradient-brand font-bold">
            measurable impact
          </span>{' '}
          for your brand.
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl">
          We craft conversion-driven campaigns, high-performance experiences, and data-informed optimizations that accelerate sustainable growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="md" className="bg-gradient-brand text-white hover:shadow-glow-green transition-all">
            Book a Strategy Call
          </Button>
          <Button variant="outline" size="md" className="border-2 border-[var(--color-brand)] hover:bg-gradient-soft transition-all">
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
