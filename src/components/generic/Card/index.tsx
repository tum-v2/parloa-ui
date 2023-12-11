import React from 'react';
import { Card as AntdCard } from 'antd';
import theme from '@/theme/theme';

type Padding = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';

interface CardProps {
  children: React.ReactNode;
  color?: string;
  width?: number;
  height?: number;
  padding?: Padding;
  margin?: Padding;
  style?: React.CSSProperties;
}

const Card = ({
  children,
  margin,
  style,
  color = theme.color.white,
  width,
  height,
  padding
}: CardProps) => {
  const cardStyle: React.CSSProperties = {
    borderRadius: theme.borderRadius.m,
    width: width || '100%',
    height: height || '100%',
    margin:
      margin === 'xs'
        ? theme.padding.xs
        : margin === 's'
        ? theme.padding.s
        : margin === 'm'
        ? theme.padding.m
        : margin === 'l'
        ? theme.padding.l
        : margin === 'xl'
        ? theme.padding.xl
        : margin === 'none'
        ? theme.padding.none
        : theme.padding.m,
    backgroundColor: color
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
        : theme.padding.l
  };

  return (
    <AntdCard style={{ ...cardStyle, ...style }} bodyStyle={bodyStyle}>
      {children}
    </AntdCard>
  );
};

export default Card;
