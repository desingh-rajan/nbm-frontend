'use client'

import React from 'react';
import { useSiteSettingValue } from '@/hooks';

export const ContactSection: React.FC = () => {
  const contactTitle = useSiteSettingValue<{ title: string }>('contact_title', { title: 'GET IN TOUCH' });
  const contactEmail = useSiteSettingValue<{ email: string }>('contact_email', { email: 'neverbeforemarketing@outlook.com' });
  const contactAddress = useSiteSettingValue<{ address: string }>(
    'contact_address',
    { address: 'New Naicker Street, 213, 2nd Floor, Madurai, Tamilnadu 625009' }
  );
  const contactPhone = useSiteSettingValue<{ phone: string }>('contact_phone', { phone: '0452-4904927' });
  const contactLocation = useSiteSettingValue<{ location: string }>('contact_location', { location: 'INDIA, TAMILNADU' });

  return (
    <section data-section id="contact" className="relative">
      <div className="container-shell flex flex-col gap-16 items-center">
        <div className="rounded-[2.5rem] bg-gradient-hero text-white px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8 w-full shadow-card-lg relative overflow-hidden">
          {/* Glow effects */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-glow blur-3xl opacity-50" aria-hidden />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-glow blur-3xl opacity-50" aria-hidden />

          <h3 className="font-display tracking-[0.35em] text-2xl md:text-4xl text-center text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)] relative z-10">{contactTitle.title}</h3>
          <button className="h-16 w-16 rounded-full bg-white text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white font-display text-2xl flex items-center justify-center shadow-card hover:scale-110 transition-all relative z-10" aria-label="Contact CTA">↗</button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="group rounded-3xl border-2 border-[var(--color-brand)] p-8 flex flex-col gap-4 bg-white/90 dark:bg-[var(--color-bg)]/90 shadow-card hover:shadow-glow-green hover:scale-105 transition-all">
            <h4 className="tracking-[0.25em] font-display text-[var(--color-brand)]">MAIL US @</h4>
            <p className="text-sm md:text-base leading-relaxed tracking-wide text-[var(--color-text)]">{contactEmail.email}</p>
          </div>
          <div className="group rounded-3xl border-2 border-[var(--color-brand)] p-8 flex flex-col gap-4 bg-white/90 dark:bg-[var(--color-bg)]/90 shadow-card hover:shadow-glow-green hover:scale-105 transition-all">
            <h4 className="tracking-[0.25em] font-display text-[var(--color-brand)]">REACH US @</h4>
            <p className="text-sm md:text-base leading-relaxed tracking-wide text-[var(--color-text)]">{contactAddress.address}</p>
          </div>
          <div className="group rounded-3xl border-2 border-[var(--color-brand)] p-8 flex flex-col gap-4 bg-white/90 dark:bg-[var(--color-bg)]/90 shadow-card hover:shadow-glow-green hover:scale-105 transition-all">
            <h4 className="tracking-[0.25em] font-display text-[var(--color-brand)]">CALL US @</h4>
            <p className="text-sm md:text-base leading-relaxed tracking-wide text-[var(--color-text)]">{contactPhone.phone}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="rounded-2xl border-2 border-[var(--color-brand-dark)] h-16 w-16 flex items-center justify-center bg-white/80 text-[var(--color-brand-dark)] font-display">IG</div>
          <div className="rounded-2xl border-2 border-[var(--color-brand-dark)] h-16 w-16 flex items-center justify-center bg-[var(--color-brand-light)] text-white font-display">FB</div>
          <div className="ml-auto rounded-full bg-[var(--color-brand-dark)] text-white px-6 h-12 flex items-center tracking-[0.25em] text-xs font-display">{contactLocation.location}</div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
