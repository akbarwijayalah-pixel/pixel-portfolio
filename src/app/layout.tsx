import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Akbar's Pixel World — RPG Portfolio",
  description:
    'An interactive 2D RPG-style portfolio for Akbar Wijaya, a Software Engineering (RPL) student at SMKN 71 Jakarta. Explore Akbar Town to discover projects, skills, and experience.',
  keywords: [
    'Akbar Wijaya',
    'portfolio',
    'RPG',
    'pixel art',
    'web developer',
    'SMKN 71 Jakarta',
    'RPL',
    'PKL',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#1a1a2e" />
      </head>
      <body>{children}</body>
    </html>
  );
}
