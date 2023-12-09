import { EvaluationBySimulation } from '@/api/schemas/evaluation';
import { FormattedEvaluation } from '@/hooks/useSimulationEvaluation';
import { BarChartData, Datapoint } from '@/types/chart';

/**
 * Format the evaluation data for the charts
 * @param evaluation - Evaluation data from the API
 * @returns formatted evaluation data used for the charts
 */
export const formatEvaluation = (
  evaluation: EvaluationBySimulation
): FormattedEvaluation => {
  const evaluationScores: Datapoint[][] = [];
  const responseTime: BarChartData[] = [];
  const messageCount: BarChartData[] = [];

  // Init line chart data
  evaluationScores.push([]);

  // Init bar chart data
  responseTime.push({
    key: 'Simulation',
    dataPoints: []
  });
  messageCount.push({
    key: 'Simulation',
    dataPoints: []
  });

  evaluation.conversations.forEach((conversation, index) => {
    const conversationNumber = ++index;

    // TODO: Change this once we have a better idea of what the data looks like for A/B testing and Optimization
    evaluationScores[0].push({
      x: conversationNumber,
      y: Math.round(conversation.score * 100) // Convert score to percentage
    });
    conversation.metrics.forEach(metric => {
      if (metric.name === 'response_time') {
        responseTime[0].dataPoints.push({
          x: conversationNumber,
          y: Math.round(metric.rawValue)
        });
      } else if (metric.name === 'message_count') {
        messageCount[0].dataPoints.push({
          x: conversationNumber,
          y: Math.round(metric.rawValue)
        });
      }
    });
  });

  return {
    averageScore: evaluation.averageScore.score,
    evaluationScores,
    responseTime,
    messageCount
  };
};
