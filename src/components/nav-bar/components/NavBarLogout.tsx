import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { Button } from 'antd';

interface NavBarLogoutProps {
  onClick: () => void;
  isLoading?: boolean;
}

const NavBarLogout = ({ onClick, isLoading }: NavBarLogoutProps) => {
  const navBarLogoutButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: 36
  };

  const navBarLogoutIconStyle: React.CSSProperties = {
    width: '1rem',
    height: '1rem'
  };

  return (
    <Button
      style={navBarLogoutButtonStyle}
      type="text"
      icon={<IoLogOutOutline style={navBarLogoutIconStyle} />}
      loading={isLoading}
      onClick={onClick}
    >
      Logout
    </Button>
  );
};

export default NavBarLogout;
