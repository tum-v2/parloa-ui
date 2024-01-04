'use client';
import useSimulation from '@/hooks/useSimulation';
import { useParams } from 'next/navigation';
import { Empty, Flex, Spin } from 'antd';
import Content from '@/components/generic/Content';
import useSimulationEvaluation from '@/hooks/useSimulationEvaluation';
import ABTestingDetails from './ABTestingDetails';
import SingleSimulationDetails from './SingleSimulationDetails';

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

  // Redirect to chat page if simulation is a chat simulation
  if (data.type === 'CHAT') {
    // TODO: Redirect to chat page
    return <Empty description="Chat simulations are not supported yet" />;
  }

  return (
    <Content>
      <Flex vertical gap={'small'}>
        {data.type === 'A/B TESTING' ? (
          <ABTestingDetails simulation={data} evaluationData={evaluationData} />
        ) : (
          <SingleSimulationDetails
            simulation={data}
            evaluationData={evaluationData}
          />
        )}
      </Flex>
    </Content>
  );
};

export default Page;
