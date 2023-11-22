import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { Button } from 'antd';

interface NavBarLogoutProps {
  onClick: () => void;
  isLoading?: boolean;
}

const NavBarLogout: React.FC<NavBarLogoutProps> = ({ onClick, isLoading }) => {
  const navBarLogoutButtonStyle: React.CSSProperties = {
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    height: 36
  };

  const navBarLogoutIconStyle: React.CSSProperties = {
    width: 20,
    height: 20
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
