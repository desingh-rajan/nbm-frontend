'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if we're in the admin dashboard
    const isAdminRoute = window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/login');

    if (isAdminRoute) {
      // Admin routes: allow theme toggle functionality
      const stored = localStorage.getItem('admin-theme') as Theme | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = stored || (prefersDark ? 'dark' : 'light');

      setTheme(initialTheme);
      applyTheme(initialTheme);
    } else {
      // Landing page: FORCE light mode - handled by LandingPageWrapper
      setTheme('light');
      // Don't apply here, let LandingPageWrapper handle it
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    // Only allow theme toggle in admin/login routes
    const isAdminRoute = window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/login');
    if (!isAdminRoute) {
      return; // Do nothing for landing page
    }

    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('admin-theme', newTheme); // Separate storage for admin
    applyTheme(newTheme);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
