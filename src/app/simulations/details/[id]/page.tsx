'use client';
import useSimulation from '@/hooks/useSimulation';
import { useParams } from 'next/navigation';
import DetailsHeader from './DetailsHeader';
import InsightsCard from './InsightsCard';
import { Flex } from 'antd';

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useSimulation(id);

  return (
    <>
      {isLoading || !data ? (
        <p>Loading...</p>
      ) : (
        <Flex vertical gap={'small'}>
          <DetailsHeader simulation={data} />
          <InsightsCard />
        </Flex>
      )}
    </>
  );
};

export default Page;
