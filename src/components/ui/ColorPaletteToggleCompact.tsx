'use client';

import React, { useState, useEffect } from 'react';

export const ColorPaletteToggleCompact: React.FC = () => {
  const [isPalette2, setIsPalette2] = useState(false);

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('colorPalette');
    if (saved === 'palette2') {
      setIsPalette2(true);
      document.documentElement.classList.add('theme-palette-2');
    }
  }, []);

  const togglePalette = () => {
    const newValue = !isPalette2;
    setIsPalette2(newValue);

    if (newValue) {
      document.documentElement.classList.add('theme-palette-2');
      localStorage.setItem('colorPalette', 'palette2');
    } else {
      document.documentElement.classList.remove('theme-palette-2');
      localStorage.setItem('colorPalette', 'palette1');
    }
  };

  return (
    <button
      onClick={togglePalette}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-bg-muted)] transition-all group"
      title={isPalette2 ? 'Switch to Green Theme' : 'Switch to Teal Theme'}
      aria-label="Toggle color palette"
    >
      {/* Color indicator circles */}
      <div className="flex gap-1">
        <span
          className={`w-3 h-3 rounded-full transition-all ${!isPalette2
              ? 'bg-palette1-green ring-2 ring-palette1-green ring-offset-1'
              : 'bg-palette1-green opacity-40'
            }`}
        />
        <span
          className={`w-3 h-3 rounded-full transition-all ${isPalette2
              ? 'bg-palette2-light-cyan ring-2 ring-palette2-light-cyan ring-offset-1'
              : 'bg-palette2-light-cyan opacity-40'
            }`}
        />
      </div>

      {/* Optional text label (hidden on mobile) */}
      <span className="hidden sm:inline text-xs font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)] transition-colors">
        {isPalette2 ? 'Teal' : 'Green'}
      </span>
    </button>
  );
};

export default ColorPaletteToggleCompact;
