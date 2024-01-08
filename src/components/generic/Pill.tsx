import React from 'react';
import { Tag } from 'antd';
import theme from '@/theme/theme';

interface PillProps {
  icon?: React.ReactNode;
  color?: string;
  width?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Pill = ({
  icon,
  color = theme.color.primary,
  width = undefined,
  onClick,
  children
}: PillProps) => {
  const pillStyle: React.CSSProperties = {
    borderRadius: 50,
    width: width || 'max-content',
    maxWidth: '150px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    paddingTop: theme.padding.xs,
    paddingLeft: theme.padding.m,
    paddingRight: theme.padding.m,
    paddingBottom: theme.padding.xs,
    cursor: onClick ? 'pointer' : 'default'
  };

  return (
    <Tag
      style={pillStyle}
      color={color}
      icon={icon}
      bordered={false}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};

export default Pill;
