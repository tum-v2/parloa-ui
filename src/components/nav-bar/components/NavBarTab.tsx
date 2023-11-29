import React, { Dispatch, SetStateAction } from 'react';
import { Segmented, ConfigProvider } from 'antd';
import { IoAppsOutline, IoDiceOutline } from 'react-icons/io5';
import theme from '@/theme/theme';
import { useRouter } from 'next/navigation';

export interface NavBarTabOption {
  name: string;
  route: string;
  icon: React.ReactNode;
}

interface NavBarTabProps {
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

export const navBarTabOptions: NavBarTabOption[] = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    icon: <IoAppsOutline />
  },
  {
    name: 'Simulations',
    route: '/simulations',
    icon: <IoDiceOutline />
  }
];

const navBarTabElementStyle: React.CSSProperties = {
  padding: theme.padding.xs,
  display: 'flex',
  alignItems: 'center'
};

const navBarTabElementIconStyle: React.CSSProperties = {
  width: '1rem',
  height: '1rem',
  marginRight: theme.padding.s,
  display: 'flex',
  alignItems: 'center'
};

const NavBarTab = ({ selectedTab, setSelectedTab }: NavBarTabProps) => {
  const router = useRouter();

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
        options={navBarTabOptions.map((option, index) => {
          return {
            label: (
              <div style={navBarTabElementStyle}>
                <div style={navBarTabElementIconStyle}>{option.icon}</div>
                <div>{option.name}</div>
              </div>
            ),
            value: index
          };
        })}
        value={selectedTab}
        onChange={value => {
          const navBarTab = navBarTabOptions[value as number];
          setSelectedTab(value as number);
          router.push(navBarTab.route);
        }}
      />
    </ConfigProvider>
  );
};

export default NavBarTab;
