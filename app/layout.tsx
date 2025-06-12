import TransitionProvider from '@/components/TransitionProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Matteo - Portfolio',
  description: 'Welcome to my interactive portfolio! Explore my projects and get to know me better.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <body className={`${inter.className} h-full overflow-x-hidden`}>
        <TransitionProvider>
          <div className="min-h-screen h-full overflow-x-hidden">
            {children}
          </div>
        </TransitionProvider>
      </body>
    </html>
  );
}