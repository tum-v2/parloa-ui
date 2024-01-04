'use client';
import useSimulation from '@/hooks/useSimulation';
import { useParams } from 'next/navigation';
import DetailsHeader from './DetailsHeader';
import { Alert, Empty, Flex, Spin, Typography } from 'antd';
import {
  SettingOutlined,
  TableOutlined,
  StockOutlined
} from '@ant-design/icons';
import ConfigurationCard from './ConfigurationCard';
import Content from '@/components/generic/Content';
import useSimulationEvaluation from '@/hooks/useSimulationEvaluation';
import MetricsGrid from './MetricsGrid';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import { ParentSize } from '@visx/responsive';
import InsightsCard from './InsightsCard';

const { Title } = Typography;

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useSimulation(id);
  const { data: evaluationData, isLoading: evaluationLoading } =
    useSimulationEvaluation(id);

  // Show loading indicator while fetching simulation
  if (isLoading || evaluationLoading) {
    return <Spin fullscreen size="large" />;
  }

  // Handle simulation not found
  if (!data) {
    return <Empty description="Simulation not found" />;
  }

  return (
    <>
      <Content>
        <Flex vertical>
          <DetailsHeader simulation={data} />
          {evaluationData && evaluationData.status === 'evaluated' ? (
            <>
              <Title level={4}>
                <TableOutlined /> Metrics
              </Title>
              <MetricsGrid simulation={data} evaluation={evaluationData} />
              <Title level={4}>
                <StockOutlined /> Insights
              </Title>
              <Flex gap={'middle'} vertical>
                <Flex gap={'middle'}>
                  <InsightsCard
                    title="Evaluation Score (%)"
                    chart={
                      <ParentSize>
                        {({ width, height }) => (
                          <LineChart
                            data={evaluationData.evaluationScores}
                            width={width}
                            height={height}
                            yUnit="%"
                            yMax={100}
                          />
                        )}
                      </ParentSize>
                    }
                    tooltip="The evaluation score is a weighted average of the other metrics"
                  />
                  <InsightsCard
                    title="Amount of steps"
                    chart={
                      <ParentSize>
                        {({ width, height }) => (
                          <BarChart
                            data={evaluationData.messageCount}
                            width={width}
                            height={height}
                            yUnit=" steps"
                          />
                        )}
                      </ParentSize>
                    }
                    tooltip="Amount of steps each conversation took to reach the customer's goal"
                  />
                </Flex>
                <Flex gap={'middle'}>
                  <InsightsCard
                    title="Response time (ms)"
                    chart={
                      <ParentSize>
                        {({ width, height }) => (
                          <BarChart
                            data={evaluationData.responseTime}
                            width={width}
                            height={height}
                            yUnit=" ms"
                          />
                        )}
                      </ParentSize>
                    }
                  />
                </Flex>
              </Flex>
            </>
          ) : (
            <Alert
              message="Evaluation in progress"
              description="The evaluation is still running. Please come back later."
              type="warning"
              showIcon
              closable
              className="mt-5"
            />
          )}

          <Title level={4}>
            <SettingOutlined /> Configurations
          </Title>
          <Flex gap={'small'}>
            <ConfigurationCard title="Agent" agentId={data.serviceAgent} />
            {data.userAgent && (
              <ConfigurationCard title="User" agentId={data.userAgent} />
            )}
          </Flex>
        </Flex>
      </Content>
    </>
  );
};

export default Page;
