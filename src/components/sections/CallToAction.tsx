import React from 'react';
import Button from '@/components/ui/Button';

export const CallToAction: React.FC = () => {
  return (
    <section data-section id="cta" className="relative">
      <div className="container-shell relative overflow-hidden rounded-2xl bg-gradient-brand text-white p-12 flex flex-col gap-8 shadow-card-lg">
        <div className="max-w-3xl flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">Ready to engineer sustainable growth?</h2>
          <p className="text-white/85 text-lg md:text-xl">Let’s build a roadmap that compounds results and strengthens your brand moats.</p>
        </div>
        <div>
          <Button variant="secondary" className="bg-white text-[var(--color-brand)] hover:brightness-95" size="md">Start the Conversation</Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
