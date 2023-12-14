import { Dashboard } from '@/api/schemas/dashboard';
import { Datapoint } from '@/types/chart';

/**
 * Function to format the chart data from the dashboard endpoint
 * @param data - Dashboard data
 * @returns formatted chart data
 */
export const formatDashboardChartData = (data: Dashboard) => {
  const chartData: Datapoint[] = data.simulationSuccessGraph.map(
    (datapoint, index) => {
      return { x: index, y: Math.round(datapoint.successRate * 100) };
    }
  );

  return [chartData];
};
