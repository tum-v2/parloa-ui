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
import Content from '@/components/generic/Content';
import { useRouter } from 'next/navigation';

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
  height: 'calc(100vh - 140px)'
};

const MetricsCardIconStyle: React.CSSProperties = {
  width: '2rem',
  height: '2rem'
};

const ChartStyle: React.CSSProperties = {
  height: 'calc(100vh - 400px)'
};

const Dashboard = () => {
  const router = useRouter();

  const [selectedTimeRange, setSelectedTimeRange] =
    React.useState<DropdownTimeRangeKeyType>(
      DropdownTimeRangeKeyEnum.SEVEN_DAYS
    );
  const { data, isLoading } = useDashboard(selectedTimeRange);

  return (
    <Content>
      <Layout hasSider>
        <Layout
          style={{
            paddingLeft: theme.padding.l,
            paddingRight: theme.padding.l
          }}
        >
          <Layout.Content style={DashboardLeftLayoutStyle}>
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
                    title="Interactions"
                    icon={
                      <IoSwapHorizontalOutline style={MetricsCardIconStyle} />
                    }
                    value={data.interactions || 0}
                    trendNumber={undefined} // TODO: Add trend number when available from backend
                  />
                  <MetricsCard
                    title="Simulations Run"
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
                      // TODO: Comment out for now, as we might have to change to specific LineChart for Dashboard
                      // <LineChart
                      //   data={data.formatedSimulationSuccessGraph.chartData}
                      //   width={width}
                      //   height={height}
                      //   yUnit="%"
                      //   yMax={100}
                      //   onClick={index => {
                      //     // TODO: Fix on click return index always 0, Find the way to display date on x-axis
                      //     console.log(index);
                      //     router.push(
                      //       `/simulations/details/${data.formatedSimulationSuccessGraph.ids[index]}`
                      //     );
                      //   }}
                      //   tooltipTitle="Simulation"
                      //   tooltipExtra={
                      //     <div className="mt-2">
                      //       <Typography.Link>
                      //         <InfoCircleOutlined className="mr-2" />
                      //         Click to view details
                      //       </Typography.Link>
                      //     </div>
                      //   }
                      // />

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
          </Layout.Content>
        </Layout>
        <Layout.Sider width={400} style={HighYieldSimulationLayoutStyle}>
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            Best Simulations
          </Typography.Title>
          <div style={HighYieldSimulationInsideScrollStyle}>
            {data &&
              data.top10Simulations.map(item => (
                <div key={item._id}>
                  <SimulationCard
                    simulation={item}
                    onClick={() =>
                      router.push(`/simulations/details/${item._id}`)
                    }
                    value={item.successRate}
                  />
                </div>
              ))}
            {isLoading && <SkeletonSimulationCard />}
          </div>
        </Layout.Sider>
      </Layout>
    </Content>
  );
};

export default Dashboard;
