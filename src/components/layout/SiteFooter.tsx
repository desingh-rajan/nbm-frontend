import React from 'react';

const YEAR = new Date().getFullYear();

export const SiteFooter: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-muted)] dark:bg-[var(--color-surface-alt)]/40">
      <div className="container-shell py-12 flex flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="font-semibold text-lg tracking-tight"><span className="text-[var(--color-brand-dark)]">Never Before</span> Marketing</div>
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
            <a href="https://www.instagram.com/nbmdigitalmarketing?igsh=MTNzZnhwYWJjczg4cg==" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand)]">Instagram</a>
            <a href="https://www.linkedin.com/company/never-before-marketing" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand)]">LinkedIn</a>
            <a href="https://www.youtube.com/@NeverBeforeMarketing" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand)]">YouTube</a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-6 text-xs text-[var(--color-text-muted)]">
        <div className="container-shell flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {YEAR} Never Before Marketing. All rights reserved.</span>
          <span>
            Designed, built, and backed by{' '}
            <a
              href="https://desinghrajan.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-brand-dark)] hover:text-[var(--color-brand)] transition-colors underline font-medium"
            >
              Desinghrajan
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
