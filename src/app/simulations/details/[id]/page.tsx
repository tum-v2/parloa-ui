'use client';
import useSimulation from '@/hooks/useSimulation';
import { useParams, useRouter } from 'next/navigation';
import DetailsHeader from './DetailsHeader';
import InsightsCard from './InsightsCard';
import { Empty, Flex, Spin, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ConfigurationCard from './ConfigurationCard';
import Content from '@/components/generic/Content';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/providers/AuthProvider';

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

  // Show loading indicator while fetching simulation
  if (isLoading) {
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
        <InsightsCard />
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
