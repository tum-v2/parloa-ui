import theme from '@/theme/theme';
import React from 'react';

interface ContentProps {
  children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => (
  <div style={{ padding: theme.padding.l }}>{children}</div>
);

export default Content;
