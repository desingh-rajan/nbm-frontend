import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Oswald, Poppins, Playfair_Display, Inter } from 'next/font/google';
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
  openGraph: {
    title: 'Never Before Marketing – Creative Portfolio',
    description: 'Creative digital portfolio showcasing works, motion graphics, animations, values, software stack, and clients.'
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
        {children}
      </body>
    </html>
  );
}
