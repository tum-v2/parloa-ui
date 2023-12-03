'use client';

import React from 'react';
import { Flex, Layout, Typography } from 'antd';
import theme from '@/theme/theme';
import CardOverall, { NumberType, Trend } from './components/CardOverall';
import { ParentSize } from '@visx/responsive';
import { Card as AntdCard } from 'antd';
import LineChart from '@/components/charts/LineChart';
import CardHighYieldSimulation from './components/CardHighYieldSimulation';
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
          <AntdCard style={{ marginTop: theme.padding.m }}>
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
          </AntdCard>
        </Content>
      </Layout>
      <Sider width={400} style={HighYieldSimulationLayoutStyle}>
        <Typography.Title level={3}>High Yield Simulation</Typography.Title>
        <div style={HighYieldSimulationInsideScrollStyle}>
          {dummyHighYieldSimulationData.map(item => (
            <div key={item.id}>
              <CardHighYieldSimulation
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
