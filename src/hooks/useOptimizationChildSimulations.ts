import { getChildSimulations } from '@/api/optimization';
import { OptimizationEvaluation } from '@/api/schemas/optimization';
import { Datapoint } from '@/types/chart';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface OptimizationChildSimulations {
  chartData: Datapoint[][];
  ids: string[];
}

const useOptimizationChildSimulations = (id: string) => {
  const [formatedEvaluation, setFormatedEvaluation] =
    useState<OptimizationChildSimulations | null>(null);

  const { data, isLoading, error } = useQuery<OptimizationEvaluation[]>({
    queryKey: ['optimization', id],
    queryFn: () => getChildSimulations(id)
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setFormatedEvaluation({
        chartData: [
          data.map((simulation, index) => {
            return {
              x: index + 1,
              y: Math.round(simulation.evaluation.averageScore.score * 100) // Convert score to percentage
            };
          })
        ],
        ids: data.map(simulation => simulation._id)
      });
    }
  }, [data]);

  return {
    data: formatedEvaluation,
    isLoading,
    error
  };
};

export default useOptimizationChildSimulations;
