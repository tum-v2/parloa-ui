import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import ThemeProvider from '@/providers/ThemeProvider';
import NavBar from '@/components/nav-bar';
import theme from '@/theme/theme';
import ReactQueryClientProvider from '@/providers/ReactQueryClientProvider';

export const metadata: Metadata = {
  title: 'Parloa LLM',
  description: 'Generated by create next app'
};

const rootStyle: React.CSSProperties = {
  // @ts-expect-error CSSProperties is not compatible with Theme
  '--color-text': theme.color.deepPurple,
  '--font-lexend': theme.font.lexend.style.fontFamily
};

const childStyle: React.CSSProperties = {
  marginRight: 'auto',
  marginLeft: 'auto'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" style={rootStyle}>
      <body className={theme.font.inter.className}>
        <ReactQueryClientProvider>
          <ThemeProvider>
            <div style={childStyle}>
              <NavBar />
              <main>{children}</main>
            </div>
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
