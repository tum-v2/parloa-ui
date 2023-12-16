import Card from '@/components/generic/Card';
import React from 'react';
import theme from '@/theme/theme';

interface SelectableButtonProps {
  selected?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const SelectableButton = ({
  selected = false,
  onClick,
  children
}: SelectableButtonProps) => {
  const childrenStyle: React.CSSProperties = {
    color: selected ? theme.color.white : theme.color.deepPurple
  };

  const cardStyle: React.CSSProperties = {
    cursor: 'pointer'
  };

  return (
    <Card
      color={selected ? theme.color.primary : theme.color.white}
      padding={theme.padding.m}
      onClick={onClick}
      style={cardStyle}
    >
      <div style={childrenStyle}>{children}</div>
    </Card>
  );
};

export default SelectableButton;
