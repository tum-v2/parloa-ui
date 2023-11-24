import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import ThemeProvider from '@/providers/ThemeProvider';
import NavBar from '@/components/nav-bar';
import theme from '@/theme/theme';

export const metadata: Metadata = {
  title: 'Parloa LLM',
  description: 'Generated by create next app'
};

const rootStyle: React.CSSProperties = {
  // @ts-ignore
  '--color-text': theme.color.deepPurple,
  '--font-lexend': theme.font.lexend.style.fontFamily
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" style={rootStyle}>
      <body className={theme.font.inter.className}>
        <ThemeProvider>
          <NavBar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
