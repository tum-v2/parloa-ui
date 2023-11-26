'use client';
import useSimulation from '@/hooks/useSimulation';
import { useParams } from 'next/navigation';
import DetailsHeader from './DetailsHeader';

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useSimulation(id);

  return (
    <>
      {isLoading || !data ? (
        <p>Loading...</p>
      ) : (
        <>
          <DetailsHeader simulation={data} />
        </>
      )}
    </>
  );
};

export default Page;
