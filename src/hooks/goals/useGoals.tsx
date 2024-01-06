import { getAllGoals } from '@/api/goal';
import { Goal } from '@/api/schemas/goal';
import { useQuery } from '@tanstack/react-query';

const useGoals = () => {
  const query = useQuery<Goal[], Error>({
    queryKey: ['goals'],
    queryFn: getAllGoals,
    // Polling every 10 seconds to update the list of goals
    refetchInterval: 10000
  });
  return query;
};

export default useGoals;
