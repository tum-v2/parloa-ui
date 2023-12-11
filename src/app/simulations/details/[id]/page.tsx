'use client';
import useSimulation from '@/hooks/useSimulation';
import { useParams } from 'next/navigation';
import DetailsHeader from './DetailsHeader';
import InsightsCard from './InsightsCard';
import { Alert, Empty, Flex, Spin, Typography } from 'antd';
import { SettingOutlined, TableOutlined } from '@ant-design/icons';
import ConfigurationCard from './ConfigurationCard';
import Content from '@/components/generic/Content';
import MetricsCard from '@/components/metrics-card/MetricsCard';
import {
  IoAnalyticsOutline,
  IoBarChartOutline,
  IoChatboxEllipsesOutline,
  IoSpeedometerOutline,
  IoSwapHorizontalOutline,
  IoTimeOutline
} from 'react-icons/io5';
import useSimulationEvaluation from '@/hooks/useSimulationEvaluation';
import { formatSecondsToMinutesAndSeconds } from '@/lib/utils/dateTime';
import OptimizationInsightsCard from './OptimizationInsightsCard';
import { scaleValueToColor } from '@/lib/utils/color';

const { Title } = Typography;

const metricsCardIconStyle: React.CSSProperties = {
  width: '2rem',
  height: '2rem'
};

const RESPONSE_TIME_MAX = 100;
const MESSAGE_COUNT_MAX = 50;

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
    <Content>
      <Flex vertical gap={'small'}>
        <DetailsHeader simulation={data} />
        {evaluationData && evaluationData.status === 'evaluated' ? (
          <>
            <Title level={4}>
              <TableOutlined /> Metrics
            </Title>
            <Flex gap={'small'} align="stretch">
              <MetricsCard
                title="Average score"
                icon={<IoAnalyticsOutline style={metricsCardIconStyle} />}
                value={Math.round(evaluationData.averageScore * 100)}
                unit="%"
                progressOptions={{
                  min: 0,
                  max: 100,
                  color: scaleValueToColor(
                    Math.round(evaluationData.averageScore * 100),
                    100,
                    0
                  )
                }}
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
            {data.numConversations === 1 ? (
              data.optimization ? (
                <OptimizationInsightsCard optimizationId={data.optimization} />
              ) : (
                <>
                  <Flex gap={'small'}>
                    <MetricsCard
                      title="Amount of steps to reach goal"
                      icon={<IoBarChartOutline style={metricsCardIconStyle} />}
                      value={evaluationData.messageCount[0].dataPoints[0].y}
                      unit=" steps"
                      progressOptions={{
                        min: 0,
                        max: MESSAGE_COUNT_MAX,
                        color: scaleValueToColor(
                          evaluationData.messageCount[0].dataPoints[0].y,
                          0,
                          MESSAGE_COUNT_MAX,
                          true
                        )
                      }}
                    />
                    <MetricsCard
                      title="Average response time"
                      icon={
                        <IoSpeedometerOutline style={metricsCardIconStyle} />
                      }
                      value={evaluationData.responseTime[0].dataPoints[0].y}
                      unit="ms"
                      progressOptions={{
                        min: 0,
                        max: RESPONSE_TIME_MAX,
                        color: scaleValueToColor(
                          evaluationData.responseTime[0].dataPoints[0].y,
                          0,
                          RESPONSE_TIME_MAX,
                          true
                        )
                      }}
                    />
                  </Flex>
                </>
              )
            ) : (
              <InsightsCard formattedEvaluation={evaluationData} />
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
