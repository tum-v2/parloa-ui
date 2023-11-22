'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import NavBarTab from './components/NavBarTab';
import logo from './components/parloa-logo.png';
import NavBarLogout from './components/NavBarLogout';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Dashboard');
  const router = useRouter();
  const navBarStyle: React.CSSProperties = {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 4,
    paddingRight: 4,
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'white'
  };

  return (
    <div style={navBarStyle}>
      <Image src={logo} alt="logo" width={36} height={36} priority={false} />
      <NavBarTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <NavBarLogout
        onClick={() => {
          router.push('/login');
        }}
      />
    </div>
  );
};

export default NavBar;
