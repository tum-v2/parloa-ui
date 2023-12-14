import { Dashboard } from '@/api/schemas/dashboard';
import { getDashboard } from '@/api/dashboard';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Datapoint } from '@/types/chart';
import { formatDashboardChartData } from '@/lib/charts/formatDashboardData';

type DashboardWithChartData = Dashboard & { chartData: Datapoint[][] };

const useDashboard = (days: number) => {
  const query = useQuery<Dashboard, Error>({
    queryKey: ['dashboard', days],
    queryFn: () => getDashboard(days)
  });
  const [dashboard, setDashboard] = useState<DashboardWithChartData>();

  useEffect(() => {
    if (query.data) {
      setDashboard({
        ...query.data,
        chartData: formatDashboardChartData(query.data)
      });
    }
  }, [query.data]);

  return { ...query, data: dashboard };
};

export default useDashboard;
