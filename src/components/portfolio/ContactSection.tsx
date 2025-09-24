import React from 'react';

export const ContactSection: React.FC = () => {
  return (
    <section data-section id="contact" className="relative">
      <div className="container-shell flex flex-col gap-16">
        <div className="rounded-[2.5rem] bg-[var(--color-brand)] text-white px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <h3 className="font-display tracking-[0.35em] text-2xl md:text-4xl text-center md:text-left bg-gradient-to-br from-[#009e60] to-[#004d28] dark:from-[#5fffa1] dark:to-[#0d8f4a] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,64,32,0.18)]">GET IN TOUCH</h3>
          <button className="h-16 w-16 rounded-full bg-white text-[var(--color-brand)] font-display text-2xl flex items-center justify-center shadow-card" aria-label="Contact CTA">↗</button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-3xl border-2 border-[var(--color-brand-dark)] p-8 flex flex-col gap-4 bg-white/90"><h4 className="tracking-[0.25em] font-display">MAIL US @</h4><p className="text-xs tracking-wide text-[var(--color-brand-dark)]">neverbeforemarketing@outlook.com</p></div>
          <div className="rounded-3xl border-2 border-[var(--color-brand-dark)] p-8 flex flex-col gap-4 bg-white/90"><h4 className="tracking-[0.25em] font-display">REACH US @</h4><p className="text-xs tracking-wide text-[var(--color-brand-dark)]">New Naicker Street, 213, 2nd Floor, Madurai, Tamilnadu 625009</p></div>
          <div className="rounded-3xl border-2 border-[var(--color-brand-dark)] p-8 flex flex-col gap-4 bg-white/90"><h4 className="tracking-[0.25em] font-display">CALL US @</h4><p className="text-xs tracking-wide text-[var(--color-brand-dark)]">0452-4904927</p></div>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="rounded-2xl border-2 border-[var(--color-brand-dark)] h-16 w-16 flex items-center justify-center bg-white/80 text-[var(--color-brand-dark)] font-display">IG</div>
          <div className="rounded-2xl border-2 border-[var(--color-brand-dark)] h-16 w-16 flex items-center justify-center bg-[var(--color-brand-light)] text-white font-display">FB</div>
          <div className="ml-auto rounded-full bg-[var(--color-brand-dark)] text-white px-6 h-12 flex items-center tracking-[0.25em] text-xs font-display">INDIA, TAMILNADU</div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
