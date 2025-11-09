import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Oswald, Poppins, Playfair_Display, Inter } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { QueryProvider } from '@/providers/QueryProvider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-script',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Never Before Marketing – Creative Portfolio",
  description: "Creative digital portfolio showcasing works, motion graphics, animations, values, software stack, and clients.",
  icons: {
    icon: [
      { url: '/nbm-logo.png', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' }
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Never Before Marketing – Creative Portfolio',
    description: 'Creative digital portfolio showcasing works, motion graphics, animations, values, software stack, and clients.',
    images: ['/nbm-logo.png'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var isAdmin = window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/login');
                  
                  if (isAdmin) {
                    // Admin: restore saved theme or use system preference
                    var html = document.documentElement;
                    html.setAttribute('data-admin', 'true');
                    
                    var savedTheme = localStorage.getItem('admin-theme');
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var theme = savedTheme || (prefersDark ? 'dark' : 'light');
                    
                    if (theme === 'dark') {
                      html.classList.add('dark');
                      html.classList.remove('light');
                    } else {
                      html.classList.add('light');
                      html.classList.remove('dark');
                    }
                  } else {
                    // Landing page: force light mode
                    var html = document.documentElement;
                    html.classList.add('light', 'theme-palette-2');
                    html.classList.remove('dark');
                    html.style.colorScheme = 'light';
                    localStorage.setItem('colorPalette', 'palette2');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${poppins.variable} ${playfair.variable} ${inter.variable} antialiased bg-[var(--color-bg)] text-[var(--color-text)]`}
      >
        <QueryProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
