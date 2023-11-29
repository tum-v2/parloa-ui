import React from 'react';
import StoreProvider from '@/store/StoreProvider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default Layout;
