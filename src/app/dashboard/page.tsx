'use client';

import React from 'react';
import { Flex, Layout, List, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';
import theme from '@/theme/theme';
import CardOverall, { NumberType, Trend } from './components/CardOverall';
import {
  IoAnalyticsOutline,
  IoDiceOutline,
  IoSwapHorizontalOutline
} from 'react-icons/io5';
import { ParentSize } from '@visx/responsive';
import Card from '@/components/generic/Card';
import LineChart from '@/components/charts/LineChart';
import CardHighYieldSimulation, {
  CardHighYieldSimulationProps
} from './components/CardHighYieldSimulation';

const { Content, Sider } = Layout;

const cardOverallIconStyle: React.CSSProperties = {
  width: 30,
  height: 30
};

const dummyDashboardData = [
  {
    title: 'Total Number of Interractions',
    icon: <IoSwapHorizontalOutline style={cardOverallIconStyle} />,

    numberType: 'number',
    number: 23540,
    trend: 'up',
    trendNumber: 58.2
  },
  {
    title: 'Simulation Ran',
    icon: <IoDiceOutline style={cardOverallIconStyle} />,

    numberType: 'number',
    number: 54,
    trend: 'up',
    trendNumber: 58.2
  },
  {
    title: 'Average Success Rate',
    icon: <IoAnalyticsOutline style={cardOverallIconStyle} />,

    numberType: 'percentage',
    number: 78,
    trend: 'up',
    trendNumber: 58.2
  }
];

const dummyHighYieldSimulationData: CardHighYieldSimulationProps[] = [
  {
    id: 1,
    title: 'High Yield Simulation 1',
    date: '2021-01-01',
    successRateNumber: 99,
    agentType: 'Flight Service Agent'
  },
  {
    id: 2,
    title: 'High Yield Simulation 2',
    date: '2021-01-01',
    successRateNumber: 95,
    agentType: 'Flight Service Agent'
  },
  {
    id: 3,
    title: 'High Yield Simulation 3',
    date: '2021-01-01',
    successRateNumber: 94,
    agentType: 'Flight Service Agent'
  },
  {
    id: 4,
    title: 'High Yield Simulation 4',
    date: '2021-01-01',
    successRateNumber: 90,
    agentType: 'Flight Service Agent'
  },
  {
    id: 5,
    title: 'High Yield Simulation 5',
    date: '2021-01-01',
    successRateNumber: 88,
    agentType: 'Flight Service Agent'
  },
  {
    id: 6,
    title: 'High Yield Simulation 6',
    date: '2021-01-01',
    successRateNumber: 87,
    agentType: 'Flight Service Agent'
  },
  {
    id: 7,
    title: 'High Yield Simulation 7',
    date: '2021-01-01',
    successRateNumber: 87,
    agentType: 'Flight Service Agent'
  },
  {
    id: 8,
    title: 'High Yield Simulation 8',
    date: '2021-01-01',
    successRateNumber: 70,
    agentType: 'Flight Service Agent'
  },
  {
    id: 9,
    title: 'High Yield Simulation 9',
    date: '2021-01-01',
    successRateNumber: 58,
    agentType: 'Flight Service Agent'
  },
  {
    id: 10,
    title: 'High Yield Simulation 10',
    date: '2021-01-01',
    successRateNumber: 56,
    agentType: 'Flight Service Agent'
  }
];

const dummyChartData = [
  [
    { x: 1, y: 12 },
    { x: 2, y: 23 },
    { x: 3, y: 43 },
    { x: 4, y: 54 },
    { x: 5, y: 65 },
    { x: 6, y: 32 },
    { x: 7, y: 43 },
    { x: 8, y: 76 }
  ]
];

const Dashboard = () => {
  const DashboardLayoutStyle: React.CSSProperties = {
    // TODO: Find the better way to handle this issue.
    height: 'calc(100vh - 65px)',
    maxWidth: 1440, // maxWidth copy from GitHub.com way
    marginRight: 'auto',
    marginLeft: 'auto'
  };
  const DashboardLeftLayoutStyle: React.CSSProperties = {
    paddingTop: theme.padding.l,
    paddingBottom: theme.padding.l
  };
  return (
    <Layout style={DashboardLayoutStyle}>
      <Layout
        style={{ paddingLeft: theme.padding.l, paddingRight: theme.padding.l }}
      >
        <Typography.Title level={2}>Dashboard</Typography.Title>
        <Content style={DashboardLeftLayoutStyle}>
          <Flex justify="space-between" gap={theme.padding.m}>
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
          <Card
            height={800}
            margin="none"
            style={{ marginTop: theme.padding.m }}
          >
            <Typography.Title level={4} style={{ margin: 0 }}>
              Success Rate Graph
            </Typography.Title>
            <ParentSize>
              {({ width, height }) => (
                // TODO: Fix the height issue.
                <LineChart
                  data={dummyChartData}
                  width={width}
                  height={700}
                  yUnit="%"
                  yMax={100}
                />
              )}
            </ParentSize>
          </Card>
        </Content>
      </Layout>
      <Sider
        width={400}
        style={{ paddingTop: 34, paddingRight: theme.padding.l }}
      >
        <Typography.Title level={3}>High Yield Simulation</Typography.Title>
        <List>
          <VirtualList
            data={dummyHighYieldSimulationData}
            height={1000}
            // itemHeight={47}
            itemKey="id"
            // onScroll={onScroll}
          >
            {(item: CardHighYieldSimulationProps) => (
              <div key={item.id}>
                <CardHighYieldSimulation
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  successRateNumber={item.successRateNumber}
                  agentType={item.agentType}
                />
              </div>
            )}
          </VirtualList>
        </List>
      </Sider>
    </Layout>
  );
};

export default Dashboard;
