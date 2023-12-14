import theme from '@/theme/theme';
import React from 'react';

interface ContentProps {
  children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
  const contentStyle: React.CSSProperties = {
    padding: theme.padding.l,
    maxWidth: 1440,
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  return <div style={contentStyle}>{children}</div>;
};

export default Content;
