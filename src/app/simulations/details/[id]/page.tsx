'use client';
import useSimulation from '@/hooks/useSimulation';
import { useParams, useRouter } from 'next/navigation';
import DetailsHeader from './DetailsHeader';
import InsightsCard from './InsightsCard';
import { Alert, Empty, Flex, Spin, Typography } from 'antd';
import { SettingOutlined, TableOutlined } from '@ant-design/icons';
import ConfigurationCard from './ConfigurationCard';
import Content from '@/components/generic/Content';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import useSimulationEvaluation from '@/hooks/useSimulationEvaluation';
import OptimizationInsightsCard from './OptimizationInsightsCard';
import MetricsGrid from './MetricsGrid';

const { Title } = Typography;

const Page = () => {
  const { authState } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!authState.isLoggedIn) {
      router.push('/login');
    }
  }, [authState.isLoggedIn, router]);
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
            <MetricsGrid simulation={data} evaluation={evaluationData} />
            {data.optimization ? (
              <OptimizationInsightsCard optimizationId={data.optimization} />
            ) : (
              (data.numConversations ?? 0) > 1 && (
                <InsightsCard formattedEvaluation={evaluationData} />
              )
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
          {data.userAgent && (
            <ConfigurationCard title="User" agentId={data.userAgent} />
          )}
        </Flex>
      </Flex>
    </Content>
  );
};

export default Page;
