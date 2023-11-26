/* eslint-disable no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';
import { Segmented, ConfigProvider } from 'antd';
import { IoAppsOutline, IoDiceOutline } from 'react-icons/io5';
import theme from '@/theme/theme';
import { useRouter } from 'next/navigation';

export enum NavBarTabOptions {
  Dashboard = 'dashboard',
  Simulations = 'simulations'
}

interface NavBarTabProps {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}

const NavBarTab = ({ selectedTab, setSelectedTab }: NavBarTabProps) => {
  const router = useRouter();
  const path = (path: string) => {
    if (path === NavBarTabOptions.Dashboard) {
      return NavBarTabOptions.Dashboard;
    } else {
      return NavBarTabOptions.Simulations;
    }
  };

  const navBarTabElementStyle: React.CSSProperties = {
    padding: theme.padding.xs,
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize'
  };

  const navBarTabElementIconStyle: React.CSSProperties = {
    width: '1rem',
    height: '1rem',
    marginRight: theme.padding.s
  };

  const navBarTabOptions = [
    {
      label: (
        <div style={navBarTabElementStyle}>
          <IoAppsOutline style={navBarTabElementIconStyle} />
          <div>{NavBarTabOptions.Dashboard}</div>
        </div>
      ),
      value: NavBarTabOptions.Dashboard
    },
    {
      label: (
        <div style={navBarTabElementStyle}>
          <IoDiceOutline style={navBarTabElementIconStyle} />
          <div>{NavBarTabOptions.Simulations}</div>
        </div>
      ),
      value: NavBarTabOptions.Simulations
    }
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: theme.color.lightPrimary
          }
        },
        token: {
          colorBgLayout: 'white',
          boxShadowTertiary: 'none'
        }
      }}
    >
      <Segmented
        options={navBarTabOptions}
        value={selectedTab}
        onChange={value => {
          const selectedTab = value.toString();
          const pathOfSelectedTab = path(selectedTab);
          setSelectedTab(pathOfSelectedTab);
          router.push(selectedTab);
        }}
      />
    </ConfigProvider>
  );
};

export default NavBarTab;
