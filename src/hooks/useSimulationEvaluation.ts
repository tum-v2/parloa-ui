import { getEvaluationBySimulation } from '@/api/evaluation';
import { EvaluationBySimulation } from '@/api/schemas/evaluation';
import { formatEvaluation } from '@/lib/charts/formatEvaluationData';
import { BarChartData, Datapoint } from '@/types/chart';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface FormattedEvaluation {
  averageScore: number;
  evaluationScores: Datapoint[][];
  responseTime: BarChartData[];
  messageCount: BarChartData[];
  status: string;
}

const useSimulationEvaluation = (id: string) => {
  const [formatedEvaluation, setFormatedEvaluation] =
    useState<FormattedEvaluation | null>(null);

  const { data, isLoading, error } = useQuery<EvaluationBySimulation, Error>({
    queryKey: ['simulationEvaluation', id],
    queryFn: () => getEvaluationBySimulation(id)
  });

  useEffect(() => {
    if (data) {
      setFormatedEvaluation({ ...formatEvaluation(data), status: data.status });
    }
  }, [data]);

  return {
    data: formatedEvaluation,
    isLoading,
    error
  };
};

export default useSimulationEvaluation;
