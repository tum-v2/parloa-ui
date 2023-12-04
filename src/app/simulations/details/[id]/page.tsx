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
  IoChatboxEllipsesOutline,
  IoSwapHorizontalOutline,
  IoTimeOutline
} from 'react-icons/io5';
import useSimulationEvaluation from '@/hooks/useSimulationEvaluation';

const { Title } = Typography;

const metricsCardIconStyle: React.CSSProperties = {
  width: '2rem',
  height: '2rem'
};

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
        {evaluationData ? (
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
                value={'19min 20s'} // TODO Get from backend when this is implemented
              />
              <MetricsCard
                title="Number of interactions"
                icon={<IoSwapHorizontalOutline style={metricsCardIconStyle} />}
                value={'150'} // TODO Get from backend when this is implemented
              />
              <MetricsCard
                title="Number of conversations"
                icon={<IoChatboxEllipsesOutline style={metricsCardIconStyle} />}
                value={data.numConversations}
              />
            </Flex>
            <InsightsCard formattedEvaluation={evaluationData} />
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
