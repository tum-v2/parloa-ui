'use client';
import useSimulation from '@/hooks/useSimulation';
import { useParams } from 'next/navigation';
import DetailsHeader from './DetailsHeader';
import InsightsCard from './InsightsCard';
import { Alert, Empty, Flex, Progress, Spin, Typography } from 'antd';
import { SettingOutlined, TableOutlined } from '@ant-design/icons';
import ConfigurationCard from './ConfigurationCard';
import Content from '@/components/generic/Content';
import MetricsCard from '@/components/metrics-card/MetricsCard';
import {
  IoAnalyticsOutline,
  IoChatboxEllipsesOutline,
  IoSwapHorizontalOutline,
  IoTimeOutline
} from 'react-icons/io5';
import useSimulationEvaluation from '@/hooks/useSimulationEvaluation';
import { formatSecondsToMinutesAndSeconds } from '@/lib/utils/dateTime';
import OptimizationInsightsCard from './OptimizationInsightsCard';

const { Title } = Typography;

const metricsCardIconStyle: React.CSSProperties = {
  width: '2rem',
  height: '2rem'
};

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSimulation(id);
  const { data: evaluationData, isLoading: evaluationLoading } =
    useSimulationEvaluation(id);

  console.log(error);

  // Show loading indicator while fetching simulation
  if (isLoading || evaluationLoading) {
    return <Spin fullscreen size="large" />;
  }

  // Handle simulation not found
  if (!data) {
    return <Empty description="Simulation not found" />;
  }

  return (
    <Content>
      <Flex vertical gap={'small'}>
        <DetailsHeader simulation={data} />
        {evaluationData && evaluationData.status === 'evaluated' ? (
          <>
            <Title level={4}>
              <TableOutlined /> Metrics
            </Title>
            <Flex gap={'small'}>
              <MetricsCard
                title="Average score"
                icon={<IoAnalyticsOutline style={metricsCardIconStyle} />}
                value={(evaluationData.averageScore * 100).toFixed(0) + '%'}
              />
              <MetricsCard
                title="Time to run"
                icon={<IoTimeOutline style={metricsCardIconStyle} />}
                value={formatSecondsToMinutesAndSeconds(data.duration)}
              />
              <MetricsCard
                title="Interactions"
                icon={<IoSwapHorizontalOutline style={metricsCardIconStyle} />}
                value={data.totalNumberOfInteractions}
              />
              <MetricsCard
                title="Conversations"
                icon={<IoChatboxEllipsesOutline style={metricsCardIconStyle} />}
                value={data.numConversations}
              />
            </Flex>
            {data.numConversations > 1 ? (
              data.optimization ? (
                <OptimizationInsightsCard optimizationId={data.optimization} />
              ) : (
                <InsightsCard formattedEvaluation={evaluationData} />
              )
            ) : (
              <>
                <Flex gap={'small'}>
                  <div className="w-1/2">
                    <Title level={5}>Number of steps</Title>
                    <Progress
                      percent={
                        (evaluationData.messageCount[0].dataPoints[0].y / 50) *
                        100
                      }
                      size={[600, 40]}
                      format={percent => `${((percent ?? 0) / 100) * 50} steps`}
                    />
                  </div>
                  <div>
                    <Title level={5}>Response time</Title>
                    <Progress
                      percent={
                        (evaluationData.responseTime[0].dataPoints[0].y / 200) *
                        100
                      }
                      size={[600, 40]}
                      format={percent => `${((percent ?? 0) / 100) * 200} ms`}
                    />
                  </div>
                </Flex>
                <Alert
                  message="Insights not available"
                  description="Insights are only available for simulations with multiple conversations."
                  type="warning"
                  showIcon
                  closable
                  className="mt-5"
                />
              </>
            )}
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
          <ConfigurationCard title="User" agentId={data.userAgent} />
        </Flex>
      </Flex>
    </Content>
  );
};

export default Page;
