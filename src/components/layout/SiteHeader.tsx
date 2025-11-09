'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-[var(--color-border)]">
      <div className="container-shell flex h-16 items-center justify-between gap-2 md:gap-4">
        <Link href="#" className="flex items-center gap-2 md:gap-3 font-semibold text-base md:text-lg tracking-tight group">
          <Image
            src="/nbm-logo.png"
            alt="NBM Logo"
            width={40}
            height={40}
            className="h-8 w-8 md:h-10 md:w-10 object-contain group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span className="whitespace-nowrap">
            <span className="text-[var(--color-brand)]">Never Before</span> <span className="text-[var(--color-text)]">Marketing</span>
          </span>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[var(--color-border)] backdrop-blur supports-[backdrop-filter]:bg-white/95">
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
