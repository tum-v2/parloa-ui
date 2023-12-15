'use client';

import React from 'react';
import { Flex, Layout, Skeleton, Typography } from 'antd';
import theme from '@/theme/theme';
import { ParentSize } from '@visx/responsive';
import { Card } from 'antd';
import LineChart from '@/components/charts/LineChart';
import {
  SimulationCard,
  SkeletonSimulationCard
} from './components/SimulationCard';
import Header from '@/components/generic/Header';
import DropdownTimeRange, {
  DropdownTimeRangeKeyEnum,
  DropdownTimeRangeKeyType
} from './components/DropdownTimeRange';
import { dummyChartData } from './components/DummyData';
import useDashboard from '@/hooks/useDashboard';
import {
  IoAnalyticsOutline,
  IoDiceOutline,
  IoSwapHorizontalOutline
} from 'react-icons/io5';
import MetricsCard from '@/components/metrics-card/MetricsCard';
import SkeletonMetricsCard from '@/components/metrics-card/SkeletonMetricsCard';

const { Content, Sider } = Layout;

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

const MetricsCardIconStyle: React.CSSProperties = {
  width: '2rem',
  height: '2rem'
};

const ChartStyle: React.CSSProperties = {
  height: 'calc(100vh - 400px)'
};

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] =
    React.useState<DropdownTimeRangeKeyType>(
      DropdownTimeRangeKeyEnum.SEVEN_DAYS
    );
  const { data, isLoading } = useDashboard(selectedTimeRange);

  return (
    <Layout hasSider>
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
            {data && (
              <>
                <MetricsCard
                  title="Total Number of Interractions"
                  icon={
                    <IoSwapHorizontalOutline style={MetricsCardIconStyle} />
                  }
                  value={data.interactions || 0}
                  trendNumber={undefined} // TODO: Add trend number when available from backend
                />
                <MetricsCard
                  title="Simulation Ran"
                  icon={<IoDiceOutline style={MetricsCardIconStyle} />}
                  value={data.simulationRuns || 0}
                  trendNumber={undefined} // TODO: Add trend number when available from backend
                />
                <MetricsCard
                  title="Average Success Rate"
                  icon={<IoAnalyticsOutline style={MetricsCardIconStyle} />}
                  value={Math.trunc(data.successRate * 100) || 0}
                  unit="%"
                  trendNumber={undefined} // TODO: Add trend number when available from backend
                />
              </>
            )}
            {isLoading && <SkeletonMetricsCard />}
          </Flex>
          <Card style={{ marginTop: theme.padding.m }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Success Rate Graph
            </Typography.Title>
            <div style={ChartStyle}>
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
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          High Yield Simulation
        </Typography.Title>
        <div style={HighYieldSimulationInsideScrollStyle}>
          {data &&
            data.top10Simulations.map(item => (
              <div key={item._id}>
                <SimulationCard
                  _id={item._id}
                  name={item.name}
                  createdAt={item.createdAt}
                  successRate={item.successRate}
                  domain={item.domain}
                />
              </div>
            ))}
          {isLoading && <SkeletonSimulationCard />}
        </div>
      </Sider>
    </Layout>
  );
};

export default Dashboard;
