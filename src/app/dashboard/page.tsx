'use client';

import React from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, List, Menu, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';
import theme from '@/theme/theme';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`
}));

const items2: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`
      };
    })
  };
});

const Dashboard = () => {
  const DashboardLayoutStyle: React.CSSProperties = {
    // TODO: Find the better way to handle this issue.
    height: 'calc(100vh - 65px)'
  };
  const DashboardLeftLayoutStyle: React.CSSProperties = {
    padding: theme.padding.l
  };
  return (
    <Layout style={DashboardLayoutStyle}>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Typography.Title level={2}>Dashboard</Typography.Title>
        <Content style={DashboardLeftLayoutStyle}>Content</Content>
      </Layout>
      <Sider width={400}>
        <Typography.Title level={3}>High Yield Simulation</Typography.Title>

        {/* <List>
          <VirtualList
            data={data}
            height={ContainerHeight}
            itemHeight={47}
            itemKey="email"
            onScroll={onScroll}
          >
            {(item: UserItem) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          </VirtualList>
        </List> */}
      </Sider>
    </Layout>
  );
};

export default Dashboard;
