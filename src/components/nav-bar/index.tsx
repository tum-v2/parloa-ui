'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import NavBarTab from './components/NavBarTab';
import logo from './components/parloa-logo.png';
import NavBarLogout from './components/NavBarLogout';
import { useRouter } from 'next/navigation';
import theme from '@/theme/theme';

const navBarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.padding.s
};

const navBarContainerStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.color.white
};

const NavBar = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const router = useRouter();

  return (
    <div style={navBarContainerStyle}>
      <div style={navBarStyle}>
        <Image src={logo} alt="logo" width={36} height={36} priority={false} />
        <NavBarTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <NavBarLogout
          onClick={() => {
            // TODO: Implement Logout feature
            router.push('/login');
          }}
        />
      </div>
    </div>
  );
};

export default NavBar;
