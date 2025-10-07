import React from 'react';
import Button from '@/components/ui/Button';

export const CallToAction: React.FC = () => {
  return (
    <section data-section id="cta" className="relative">
      <div className="container-shell relative overflow-hidden rounded-2xl bg-gradient-hero text-white p-12 flex flex-col gap-8 shadow-card-lg">
        {/* Animated glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-glow blur-3xl opacity-50 animate-pulse" aria-hidden />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-glow blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} aria-hidden />

        <div className="max-w-3xl flex flex-col gap-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">Ready to engineer sustainable growth?</h2>
          <p className="text-white/90 text-lg md:text-xl">Let&apos;s build a roadmap that compounds results and strengthens your brand moats.</p>
        </div>
        <div className="relative z-10">
          <Button variant="secondary" className="bg-white text-[var(--color-brand)] hover:brightness-95 hover:scale-105 transition-transform" size="md">Start the Conversation</Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
