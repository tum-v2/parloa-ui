import React, { useEffect } from 'react';
import { Dashboard } from '@/api/schemas/dashboard';
import { getDashboard } from '@/api/dashboard';
import { useQuery } from '@tanstack/react-query';
import { Datapoint } from '@/types/chart';
import { useRouter } from 'next/navigation';

export interface FormatedDashboard extends Dashboard {
  formatedSimulationSuccessGraph: {
    chartData: Datapoint[][];
    ids: string[];
  };
}

const useDashboard = (days: number) => {
  const [formatedDashboard, setFormatedDashboard] =
    React.useState<FormatedDashboard | null>(null);

  const { data, isLoading, error } = useQuery<Dashboard, Error>({
    queryKey: ['dashboard', days],
    queryFn: () => getDashboard(days)
  });

  const router = useRouter();

  useEffect(() => {
    if (error?.message === '401') {
      // router.push('/login');
      console.log('Redirecting to login page');
    }
  }, [error]);

  useEffect(() => {
    if (data && data.simulationSuccessGraph) {
      const formatedDashboard: FormatedDashboard = {
        ...data,
        formatedSimulationSuccessGraph: {
          chartData: [
            data.simulationSuccessGraph.map((simulation, index) => {
              return {
                x: index + 1,
                y: simulation.successRate * 100 // Convert score to percentage
              };
            })
          ],
          ids: data.simulationSuccessGraph.map(simulation => simulation.id)
        }
      };
      console.log(formatedDashboard);
      setFormatedDashboard(formatedDashboard);
    }
  }, [data]);

  return { data: formatedDashboard, isLoading, error };
};

export default useDashboard;
