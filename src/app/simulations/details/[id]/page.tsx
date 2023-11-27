'use client';
import useSimulation from '@/hooks/useSimulation';
import { useParams } from 'next/navigation';
import DetailsHeader from './DetailsHeader';
import InsightsCard from './InsightsCard';
import { Empty, Flex, Spin, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ConfigurationCard from './ConfigurationCard';

const { Title } = Typography;

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useSimulation(id);

  // Show loading indicator while fetching simulation
  if (isLoading) {
    return <Spin fullscreen size="large" />;
  }

  // Handle simulation not found
  if (!data) {
    return <Empty description="Simulation not found" />;
  }

  return (
    <Flex vertical gap={'small'}>
      <DetailsHeader simulation={data} />
      <InsightsCard />
      <Title level={4}>
        <SettingOutlined /> Configurations
      </Title>
      <Flex gap={'small'}>
        {data.agents.map((agent, i) => (
          <ConfigurationCard
            key={agent._id}
            title={i == 0 ? 'Agent' : 'User'}
            agent={agent}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Page;
