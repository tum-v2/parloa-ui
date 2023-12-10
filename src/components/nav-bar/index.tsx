'use client';

import React, { useContext, useState } from 'react';
import Image from 'next/image';

import NavBarTab, { navBarTabOptions } from './components/NavBarTab';
import logo from '@/components/parloa-logo.png';
import NavBarLogout from './components/NavBarLogout';
import { usePathname, useRouter } from 'next/navigation';
import theme from '@/theme/theme';
import { AuthContext } from '@/providers/AuthProvider';

const navBarStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.padding.s
};

const navBarLeftStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%'
};

const navBarRightStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%'
};

const navBarContainerStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  // Add blur effect
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  height: theme.navbar.height
};

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setAuthState } = useContext(AuthContext);

  // Get current tab from route
  const currentTab = `/${pathname.split('/')[1]}`;
  const hideNavBar = currentTab === '/login' ? false : true;

  // Set selected tab
  const selectedInitialTab = navBarTabOptions.findIndex(
    option => option.route === currentTab
  );

  const [selectedTab, setSelectedTab] = useState<number>(
    selectedInitialTab !== -1 ? selectedInitialTab : 0
  );

  if (hideNavBar) {
    return (
      <div style={navBarContainerStyle}>
        <div style={navBarStyle}>
          <div style={navBarLeftStyle}>
            <Image
              src={logo}
              alt="logo"
              width={36}
              height={36}
              priority={false}
            />
          </div>
          <NavBarTab
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div style={navBarRightStyle}>
            <NavBarLogout
              onClick={() => {
                // TODO: Implement Logout feature
                router.push('/login');
                setAuthState({ isLoggedIn: false, token: '' });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default NavBar;
