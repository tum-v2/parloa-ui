import { Dashboard } from '@/api/schemas/dashboard';
import { getDashboard } from '@/api/dashboard';
import { useQuery } from '@tanstack/react-query';

const useDashboard = (days: number) => {
  const query = useQuery<Dashboard, Error>({
    queryKey: ['dashboard', days],
    queryFn: () => getDashboard(days)
  });
  return query;
};

export default useDashboard;
