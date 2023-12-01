import React from 'react';
import { Button as AntdButton } from 'antd';
import theme from '@/theme/theme';

interface ButtonProps {
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  size?: 'small' | 'middle' | 'large';
  block?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

const Button = ({ icon, onClick, disabled = false, children }: ButtonProps) => {
  const buttonStyle: React.CSSProperties = {
    borderRadius: theme.borderRadius.m,
    width: icon && !children ? '35px' : 'max-content',
    height: '35px',
    boxShadow: 'none' // Remove the default shadow of the AntD component.
  };

  return (
    <AntdButton
      type={'primary'}
      icon={icon}
      size={'small'}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
