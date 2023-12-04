import { EvaluationBySimulation } from '@/api/schemas/evaluation';
import { formatEvaluation } from '@/lib/charts/formatEvaluationData';
import { BarChartData, Datapoint } from '@/types/chart';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Generate mock data with 10 different conversations and data points
const mockEvaluation: EvaluationBySimulation = {
  averageScore: 0.8729286324786324,
  conversations: [
    {
      conversation: '1',
      score: 0.91,
      metrics: [
        {
          name: 'response_time',
          rawValue: 98,
          value: 0.8729286324786324,
          weight: 0.33
        },
        {
          name: 'message_count',
          rawValue: 23,
          value: 0.8729286324786324,
          weight: 0.33
        }
      ]
    },
    {
      conversation: '2',
      score: 0.89,
      metrics: [
        {
          name: 'response_time',
          rawValue: 102,
          value: 0.8729286324786324,
          weight: 0.33
        },
        {
          name: 'message_count',
          rawValue: 34,
          value: 0.8729286324786324,
          weight: 0.33
        }
      ]
    },
    {
      conversation: '3',
      score: 0.65,
      metrics: [
        {
          name: 'response_time',
          rawValue: 67,
          value: 0.8729286324786324,
          weight: 0.33
        },
        {
          name: 'message_count',
          rawValue: 45,
          value: 0.8729286324786324,
          weight: 0.33
        }
      ]
    },
    {
      conversation: '4',
      score: 0.77,
      metrics: [
        {
          name: 'response_time',
          rawValue: 83,
          value: 0.8729286324786324,
          weight: 0.33
        },
        {
          name: 'message_count',
          rawValue: 56,
          value: 0.8729286324786324,
          weight: 0.33
        }
      ]
    },
    {
      conversation: '5',
      score: 0.8,
      metrics: [
        {
          name: 'response_time',
          rawValue: 145,
          value: 0.8729286324786324,
          weight: 0.33
        },
        {
          name: 'message_count',
          rawValue: 9,
          value: 0.8729286324786324,
          weight: 0.33
        }
      ]
    },
    {
      conversation: '6',
      score: 0.96,
      metrics: [
        {
          name: 'response_time',
          rawValue: 99,
          value: 0.8729286324786324,
          weight: 0.33
        },
        {
          name: 'message_count',
          rawValue: 15,
          value: 0.8729286324786324,
          weight: 0.33
        }
      ]
    },
    {
      conversation: '7',
      score: 0.92,
      metrics: [
        {
          name: 'response_time',
          rawValue: 154,
          value: 0.8729286324786324,
          weight: 0.33
        },
        {
          name: 'message_count',
          rawValue: 12,
          value: 0.8729286324786324,
          weight: 0.33
        }
      ]
    },
    {
      conversation: '8',
      score: 0.86,
      metrics: [
        {
          name: 'response_time',
          rawValue: 109,
          value: 0.8729286324786324,
          weight: 0.33
        },
        {
          name: 'message_count',
          rawValue: 29,
          value: 0.8729286324786324,
          weight: 0.33
        }
      ]
    },
    {
      conversation: '9',
      score: 0.78,
      metrics: [
        {
          name: 'response_time',
          rawValue: 112,
          value: 0.8729286324786324,
          weight: 0.33
        },
        {
          name: 'message_count',
          rawValue: 16,
          value: 0.8729286324786324,
          weight: 0.33
        }
      ]
    },
    {
      conversation: '10',
      score: 0.94,
      metrics: [
        {
          name: 'response_time',
          rawValue: 204,
          value: 0.8729286324786324,
          weight: 0.33
        },
        {
          name: 'message_count',
          rawValue: 7,
          value: 0.8729286324786324,
          weight: 0.33
        }
      ]
    }
  ]
};

export interface FormattedEvaluation {
  averageScore: number;
  evaluationScores: Datapoint[][];
  responseTime: BarChartData[];
  messageCount: BarChartData[];
}

const useSimulationEvaluation = (id: string) => {
  // TODO: Remove this once we have the API endpoint
  const getMockEvaluation = () => {
    return new Promise<EvaluationBySimulation>(resolve => {
      setTimeout(() => {
        resolve(mockEvaluation);
      }, 1000);
    });
  };

  const [formatedEvaluation, setFormatedEvaluation] =
    useState<FormattedEvaluation | null>(null);

  const { data, isLoading, error } = useQuery<EvaluationBySimulation, Error>({
    queryKey: ['simulationEvaluation', id],
    queryFn: getMockEvaluation
  });

  useEffect(() => {
    if (data) {
      setFormatedEvaluation(formatEvaluation(data));
    }
  }, [data]);

  return {
    data: formatedEvaluation,
    isLoading,
    error
  };
};

export default useSimulationEvaluation;
