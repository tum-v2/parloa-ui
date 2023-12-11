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
  const buttonStyle: React.CSSProperties = {
    cursor: 'pointer'
  };

  const childrenStyle: React.CSSProperties = {
    color: selected ? theme.color.white : theme.color.deepPurple
  };

  return (
    <div style={buttonStyle} onClick={onClick}>
      <Card color={selected ? theme.color.primary : theme.color.white}>
        <div style={childrenStyle}>{children}</div>
      </Card>
    </div>
  );
};

export default SelectableButton;
