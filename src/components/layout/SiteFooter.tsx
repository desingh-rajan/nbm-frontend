import React from 'react';

const YEAR = new Date().getFullYear();

export const SiteFooter: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-muted)] dark:bg-[var(--color-surface-alt)]/40">
      <div className="container-shell py-12 flex flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="font-semibold text-lg tracking-tight"><span className="text-[var(--color-brand)]">Never Before</span> Marking</div>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">Strategic growth, creative acceleration, and performance systems that unlock compounding brand value.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <div className="font-medium mb-1 text-[var(--color-text)]">Explore</div>
            <a href="#services" className="hover:text-[var(--color-brand)]">Services</a>
            <a href="#portfolio" className="hover:text-[var(--color-brand)]">Work</a>
            <a href="#process" className="hover:text-[var(--color-brand)]">Process</a>
            <a href="#testimonials" className="hover:text-[var(--color-brand)]">Testimonials</a>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium mb-1 text-[var(--color-text)]">Connect</div>
            <a href="#cta" className="hover:text-[var(--color-brand)]">Contact</a>
            <a href="#" className="hover:text-[var(--color-brand)]">LinkedIn</a>
            <a href="#" className="hover:text-[var(--color-brand)]">Twitter</a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-6 text-center text-xs text-[var(--color-text-muted)]">
        <div>© {YEAR} Never Before Marketing. All rights reserved.</div>
        <div className="mt-2">
          Built by{' '}
          <a 
            href="https://desinghrajan.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--color-brand)] hover:text-[var(--color-brand-light)] transition-colors underline"
          >
            Desinghrajan
          </a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
