'use client';

import React, { useState, useEffect } from 'react';

export const ColorPaletteToggle: React.FC = () => {
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Color Theme
          </span>
        </div>

        <div className="flex gap-2">
          {/* Palette 1 Button */}
          <button
            onClick={() => {
              if (isPalette2) togglePalette();
            }}
            className={`group relative w-16 h-16 rounded-lg transition-all ${!isPalette2 ? 'ring-2 ring-offset-2 ring-palette1-green scale-105' : 'hover:scale-105'
              }`}
            title="Green Theme"
          >
            <div className="w-full h-full rounded-lg overflow-hidden flex flex-col">
              <div className="flex h-1/2">
                <div className="w-1/3 bg-[#4d4d4d]"></div>
                <div className="w-1/3 bg-[#348856]"></div>
                <div className="w-1/3 bg-[#00491d]"></div>
              </div>
              <div className="flex h-1/2">
                <div className="w-1/2 bg-[#ffffff] border-t border-gray-200"></div>
                <div className="w-1/2 bg-[#f1faee] border-t border-gray-200"></div>
              </div>
            </div>
            {!isPalette2 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-palette1-green rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>

          {/* Palette 2 Button */}
          <button
            onClick={() => {
              if (!isPalette2) togglePalette();
            }}
            className={`group relative w-16 h-16 rounded-lg transition-all ${isPalette2 ? 'ring-2 ring-offset-2 ring-palette2-light-cyan scale-105' : 'hover:scale-105'
              }`}
            title="Teal/Cyan Theme"
          >
            <div className="w-full h-full rounded-lg overflow-hidden flex flex-col">
              <div className="flex h-1/2">
                <div className="w-1/3 bg-[#7ce6e3]"></div>
                <div className="w-1/3 bg-[#68a0a1]"></div>
                <div className="w-1/3 bg-[#a8dadc]"></div>
              </div>
              <div className="flex h-1/2">
                <div className="w-1/3 bg-[#336366]"></div>
                <div className="w-1/3 bg-[#09282d]"></div>
                <div className="w-1/3 bg-[#e63946]"></div>
              </div>
            </div>
            {isPalette2 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-palette2-light-cyan rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
          {isPalette2 ? 'Teal Theme' : 'Green Theme'}
        </p>
      </div>
    </div>
  );
};

export default ColorPaletteToggle;
