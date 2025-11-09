'use client';

import { useEffect } from 'react';

export default function LandingPageWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Aggressively force light mode on mount and keep checking
    const forceLight = () => {
      const html = document.documentElement;
      html.classList.remove('dark');
      html.classList.add('light', 'theme-palette-2');
      html.style.colorScheme = 'light';
      html.setAttribute('data-theme', 'light');
    };

    // Force immediately
    forceLight();

    // Watch for any class changes and revert them
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' || mutation.attributeName === 'style') {
          const html = document.documentElement;
          if (html.classList.contains('dark')) {
            forceLight();
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
