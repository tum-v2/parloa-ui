'use client';

import React from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Card, Flex, Layout, List, Menu, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';
import theme from '@/theme/theme';
import CardOverall, { NumberType, Trend } from './components/CardOverall';
import { IoAirplaneOutline } from 'react-icons/io5';

const { Content, Sider } = Layout;

const cardOverallIconStyle: React.CSSProperties = {
  width: 30,
  height: 30
};

const dummyDashboardData = [
  {
    title: 'Total Number of Interractions',
    icon: <IoAirplaneOutline style={cardOverallIconStyle} />,

    numberType: 'number',
    number: 23540,
    trend: 'up',
    trendNumber: 58.2
  },
  {
    title: 'Simulation Ran',
    icon: <IoAirplaneOutline style={cardOverallIconStyle} />,

    numberType: 'number',
    number: 54,
    trend: 'up',
    trendNumber: 58.2
  },
  {
    title: 'Average Success Rate',
    icon: <IoAirplaneOutline style={cardOverallIconStyle} />,

    numberType: 'percentage',
    number: 78,
    trend: 'up',
    trendNumber: 58.2
  }
];

const Dashboard = () => {
  const DashboardLayoutStyle: React.CSSProperties = {
    // TODO: Find the better way to handle this issue.
    height: 'calc(100vh - 65px)'
  };
  const DashboardLeftLayoutStyle: React.CSSProperties = {
    paddingTop: theme.padding.l,
    paddingBottom: theme.padding.l
  };
  return (
    <Layout style={DashboardLayoutStyle}>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Typography.Title level={2}>Dashboard</Typography.Title>
        <Content style={DashboardLeftLayoutStyle}>
          <Flex justify="space-between" style={{ height: '20vh' }}>
            {dummyDashboardData.map(data => (
              <CardOverall
                title={data.title}
                icon={data.icon}
                numberType={data.numberType as NumberType}
                number={data.number}
                trend={data.trend as Trend}
                trendNumber={data.trendNumber}
                key={data.title}
              />
            ))}
          </Flex>
        </Content>
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
