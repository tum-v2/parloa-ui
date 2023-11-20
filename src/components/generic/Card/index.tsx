import React from 'react';
import { Card as AntdCard } from 'antd';
import theme from '@/theme/theme';

type Padding = 'xs' | 's' | 'm' | 'l' | 'xl';

interface CardProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  padding?: Padding;
}

const Card: React.FC<CardProps> = ({ children, width, height, padding }) => {
  const cardStyle: React.CSSProperties = {
    borderRadius: theme.borderRadius.m,
    width: width || '100%',
    height: height || '100%'
  };
  const bodyStyle: React.CSSProperties = {
    padding:
      padding === 'xs'
        ? theme.padding.xs
        : padding === 's'
        ? theme.padding.s
        : padding === 'm'
        ? theme.padding.m
        : padding === 'l'
        ? theme.padding.l
        : padding === 'xl'
        ? theme.padding.xl
        : theme.padding.m
  };

  return (
    <AntdCard style={cardStyle} bodyStyle={bodyStyle}>
      {children}
    </AntdCard>
  );
};

export default Card;
