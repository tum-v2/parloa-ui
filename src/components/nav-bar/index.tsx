'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import NavBarTab from './components/NavBarTab';
import logo from './components/parloa-logo.png';
import NavBarLogout from './components/NavBarLogout';

const NavBar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Dashboard');

  const navBarStyle: React.CSSProperties = {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 4,
    paddingRight: 4
  };

  return (
    <div style={navBarStyle}>
      <Image src={logo} alt="logo" width={36} height={36} priority={false} />
      <NavBarTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <NavBarLogout
        onClick={() => {
          console.log('logout');
        }}
      />
    </div>
  );
};

export default NavBar;
