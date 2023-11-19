import React from 'react';
import { Button as AntdButton } from 'antd';
import theme from '@/theme/theme';

interface ButtonProps {
  icon?: React.ReactNode;
  onClick: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ icon, onClick, children }) => {
  const buttonStyle: React.CSSProperties = {
    borderRadius: theme.borderRadius.m,
    width: icon && !children ? '50px' : 'max-content',
    height: icon ? '50px' : '40px',
    boxShadow: 'none' // Remove the default shadow of the AntD component.
  };

  return (
    <AntdButton
      type={'primary'}
      icon={icon}
      size={'large'}
      style={buttonStyle}
      onClick={onClick}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
