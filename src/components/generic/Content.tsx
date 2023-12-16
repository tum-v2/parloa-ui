import theme from '@/theme/theme';
import React from 'react';

interface ContentProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Content = ({ children, style }: ContentProps) => {
  const contentStyle: React.CSSProperties = {
    padding: theme.padding.l,
    // width: '100%',
    maxWidth: 1440,
    marginLeft: 'auto',
    marginRight: 'auto',
    ...style
  };

  return <div style={contentStyle}>{children}</div>;
};

export default Content;
