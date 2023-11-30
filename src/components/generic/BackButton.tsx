import React from 'react';
import theme from '@/theme/theme';
import { IoChevronBack } from 'react-icons/io5';

interface BackButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const BackButton = ({ onClick, children }: BackButtonProps) => {
  const iconSize = theme.iconSize.l;
  const fontSize = theme.fontSize.l;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: Math.max(iconSize, fontSize)
  };

  const buttonStyle: React.CSSProperties = {
    fontFamily: theme.font.lexend.style.fontFamily,
    fontWeight: 'bold',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: fontSize
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      <div style={containerStyle}>
        <IoChevronBack size={iconSize} />
        {children}
      </div>
    </button>
  );
};

export default BackButton;
