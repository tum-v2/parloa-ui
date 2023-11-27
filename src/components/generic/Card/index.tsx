import React from 'react';
import { Card as AntdCard, CardProps as AntdCardProps } from 'antd';
import theme from '@/theme/theme';

type Padding = 'xs' | 's' | 'm' | 'l' | 'xl';

interface CardProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  padding?: Padding;
  margin?: Padding;
  props?: AntdCardProps;
}

const Card = ({
  children,
  width,
  height,
  padding,
  margin,
  props
}: CardProps) => {
  const cardStyle: React.CSSProperties = {
    borderRadius: theme.borderRadius.m,
    width: width || '100%',
    height: height || '100%',
    margin:
      margin === 'xs'
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
    <AntdCard style={cardStyle} bodyStyle={bodyStyle} {...props}>
      {children}
    </AntdCard>
  );
};

export default Card;
