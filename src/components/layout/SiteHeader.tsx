'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '#portfolio-hero', label: 'Home' },
  { href: '#our-works', label: 'Works' },
  { href: '#motion-graphics', label: 'Motion Graphics' },
  { href: '#animations', label: 'Animations' },
  { href: '#about', label: 'About' },
  { href: '#values', label: 'Values' },
  { href: '#softwares', label: 'Software' },
  { href: '#clients', label: 'Clients' },
  { href: '#contact', label: 'Contact' },
];

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, closeMobileMenu?: () => void) => {
  e.preventDefault();
  const targetId = href.replace('#', '');
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    const headerHeight = 80; // Account for sticky header
    const targetPosition = targetElement.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Close mobile menu after navigation
    if (closeMobileMenu) {
      closeMobileMenu();
    }
  }
};

export const SiteHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-[var(--color-bg-invert)]/70 border-b border-[var(--color-border)]">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="#" className="font-semibold text-lg tracking-tight">
          <span className="text-[var(--color-brand)]">Never Before</span> Marketing
        </Link>
        <nav className="hidden md:flex gap-8 text-sm" aria-label="Main navigation">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleSmoothScroll(e, l.href)}
              className="hover:text-[var(--color-brand)] transition-colors cursor-pointer"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-sm tracking-wide px-3 py-2 border rounded-full border-[var(--color-border)] hover:bg-[var(--color-bg-muted)] transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Navigation Menu - Only shows on mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[var(--color-bg-invert)] border-b border-[var(--color-border)] backdrop-blur supports-[backdrop-filter]:bg-white/95 dark:supports-[backdrop-filter]:bg-[var(--color-bg-invert)]/95">
          <nav className="container-shell py-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleSmoothScroll(e, l.href, closeMobileMenu)}
                  className="text-sm hover:text-[var(--color-brand)] transition-colors cursor-pointer py-2"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
