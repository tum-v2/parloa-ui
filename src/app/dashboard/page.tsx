'use client';

import React from 'react';
import { Flex, Layout, Typography } from 'antd';
import theme from '@/theme/theme';
import MetricsCard, { NumberType } from './components/MetricsCard';
import { ParentSize } from '@visx/responsive';
import { Card } from 'antd';
import LineChart from '@/components/charts/LineChart';
import HighYieldSimulationCard from './components/HighYieldSimulationCard';
import Header from '@/components/generic/Header';
import DropdownTimeRange, {
  DropdownTimeRangeKeyType
} from './components/DropdownTimeRange';
import {
  dummyChartData,
  dummyDashboardData,
  dummyHighYieldSimulationData
} from './components/DummyData';

const { Content, Sider } = Layout;

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] =
    React.useState<DropdownTimeRangeKeyType>('last-24-hours');

  const DashboardLayoutStyle: React.CSSProperties = {
    height: 'calc(100vh - 65px)'
  };

  const DashboardLeftLayoutStyle: React.CSSProperties = {
    display: 'relative',
    paddingTop: theme.padding.l,
    overflowY: 'scroll',
    height: '100%'
  };
  const HighYieldSimulationLayoutStyle: React.CSSProperties = {
    paddingTop: 34,
    paddingRight: theme.padding.l
  };

  const HighYieldSimulationInsideScrollStyle: React.CSSProperties = {
    overflowY: 'scroll',
    height: 'calc(100vh - 166px)'
  };

  return (
    <Layout style={DashboardLayoutStyle} hasSider>
      <Layout
        style={{ paddingLeft: theme.padding.l, paddingRight: theme.padding.l }}
      >
        <Content style={DashboardLeftLayoutStyle}>
          <Flex justify="space-between" align="center">
            <Header title="Dashboard" />
            <DropdownTimeRange
              selectedTimeRange={selectedTimeRange}
              setSelectedTimeRange={setSelectedTimeRange}
            />
          </Flex>
          <Flex justify="space-between" gap={theme.padding.m}>
            {dummyDashboardData.map(data => (
              <MetricsCard
                title={data.title}
                icon={data.icon}
                numberType={data.numberType as NumberType}
                number={data.number}
                trendNumber={data.trendNumber}
                key={data.title}
              />
            ))}
          </Flex>
          <Card style={{ marginTop: theme.padding.m }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Success Rate Graph
            </Typography.Title>
            <div className="h-96">
              <ParentSize>
                {({ width, height }) => (
                  <LineChart
                    data={dummyChartData}
                    width={width}
                    height={height}
                    yUnit="%"
                    yMax={100}
                  />
                )}
              </ParentSize>
            </div>
          </Card>
        </Content>
      </Layout>
      <Sider width={400} style={HighYieldSimulationLayoutStyle}>
        <Typography.Title level={3}>High Yield Simulation</Typography.Title>
        <div style={HighYieldSimulationInsideScrollStyle}>
          {dummyHighYieldSimulationData.map(item => (
            <div key={item.id}>
              <HighYieldSimulationCard
                id={item.id}
                title={item.title}
                date={item.date}
                successRateNumber={item.successRateNumber}
                agentType={item.agentType}
              />
            </div>
          ))}
        </div>
      </Sider>
    </Layout>
  );
};

export default Dashboard;
