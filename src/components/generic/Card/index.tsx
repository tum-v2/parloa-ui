import React from 'react';
import { Card as AntdCard } from 'antd';
import theme from '@/theme/theme';

interface CardProps {
  children: React.ReactNode;
  color?: string;
  width?: number;
  height?: number;
  padding?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Card = ({
  children,
  style,
  color = theme.color.white,
  width,
  height,
  padding,
  onClick
}: CardProps) => {
  const cardStyle: React.CSSProperties = {
    borderRadius: theme.borderRadius.m,
    width: width || '100%',
    height: height || '100%',
    backgroundColor: color
  };

  const bodyStyle: React.CSSProperties = {
    padding: padding
  };

  return (
    <AntdCard
      style={{ ...cardStyle, ...style }}
      bodyStyle={bodyStyle}
      onClick={onClick}
    >
      {children}
    </AntdCard>
  );
};

export default Card;
