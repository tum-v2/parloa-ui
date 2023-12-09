'use client';

import React from 'react';
import { Flex, Layout, Skeleton, Typography } from 'antd';
import theme from '@/theme/theme';
import {
  MetricsCard,
  NumberType,
  SkeletonMetricsCard
} from './components/MetricsCard';
import { ParentSize } from '@visx/responsive';
import { Card } from 'antd';
import LineChart from '@/components/charts/LineChart';
import {
  HighYieldSimulationCard,
  SkeletonHighYieldSimulationCard
} from './components/HighYieldSimulationCard';
import Header from '@/components/generic/Header';
import DropdownTimeRange, {
  DropdownTimeRangeKeyEnum,
  DropdownTimeRangeKeyType
} from './components/DropdownTimeRange';
import { dummyChartData } from './components/DummyData';
import useDashboard from '@/hooks/useDashboard';
import { metricCardData } from './components/DataParser';

const { Content, Sider } = Layout;

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] =
    React.useState<DropdownTimeRangeKeyType>(
      DropdownTimeRangeKeyEnum.SEVEN_DAYS
    );
  const { data, isLoading } = useDashboard(selectedTimeRange);

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
            {data &&
              metricCardData(data).map(data => (
                <MetricsCard
                  title={data.title}
                  icon={data.icon}
                  numberType={data.numberType as NumberType}
                  number={data.number}
                  trendNumber={data.trendNumber}
                  key={data.title}
                />
              ))}
            {isLoading && <SkeletonMetricsCard />}
          </Flex>
          <Card style={{ marginTop: theme.padding.m }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Success Rate Graph
            </Typography.Title>
            <div className="h-96">
              {data && (
                <ParentSize>
                  {({ width, height }) => (
                    // TODO: Find the right way for parsing LineChart data
                    <LineChart
                      data={dummyChartData}
                      width={width}
                      height={height}
                      yUnit="%"
                      yMax={100}
                    />
                  )}
                </ParentSize>
              )}
              {isLoading && <Skeleton active />}
            </div>
          </Card>
        </Content>
      </Layout>
      <Sider width={400} style={HighYieldSimulationLayoutStyle}>
        <Typography.Title level={3}>High Yield Simulation</Typography.Title>
        <div style={HighYieldSimulationInsideScrollStyle}>
          {data &&
            data.top10Simulations.map(item => (
              <div key={item._id}>
                <HighYieldSimulationCard
                  _id={item._id}
                  name={item.name}
                  createdAt={item.createdAt}
                  successRate={item.successRate}
                  domain={item.domain}
                />
              </div>
            ))}
          {isLoading && <SkeletonHighYieldSimulationCard />}
        </div>
      </Sider>
    </Layout>
  );
};

export default Dashboard;
