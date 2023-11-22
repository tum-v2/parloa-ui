import React, { Dispatch, SetStateAction } from 'react';
import { Segmented, ConfigProvider } from 'antd';
import { IoAppsOutline, IoDiceOutline } from 'react-icons/io5';
import theme from '@/theme/theme';

interface NavBarTabProps {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}

const NavBarTab = ({ selectedTab, setSelectedTab }: NavBarTabProps) => {
  const navBarTabElementStyle: React.CSSProperties = {
    padding: 4,
    display: 'flex',
    alignItems: 'center'
  };

  const navBarTabElementIconStyle: React.CSSProperties = {
    width: 20,
    height: 20,
    paddingRight: 8
  };

  const navBarTabOptions = [
    {
      label: (
        <div style={navBarTabElementStyle}>
          <IoAppsOutline style={navBarTabElementIconStyle} />
          <div>Dashboard</div>
        </div>
      ),
      value: 'Dashboard'
    },
    {
      label: (
        <div style={navBarTabElementStyle}>
          <IoDiceOutline style={navBarTabElementIconStyle} />
          <div>Simulations</div>
        </div>
      ),
      value: 'Simulations'
    }
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: theme.token.colorSelectedNavBar
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
          setSelectedTab(value.toString());
        }}
      />
    </ConfigProvider>
  );
};

export default NavBarTab;
