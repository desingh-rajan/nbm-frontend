import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Oswald, Poppins, Playfair_Display, Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
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
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${poppins.variable} ${playfair.variable} ${inter.variable} antialiased bg-[var(--color-bg)] text-[var(--color-text)]`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
