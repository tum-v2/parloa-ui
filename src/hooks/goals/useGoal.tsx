import { getGoal } from '@/api/goal';
import { Goal } from '@/api/schemas/goal';
import { useQuery } from '@tanstack/react-query';

const useGoal = (id: string) => {
  const query = useQuery<Goal, Error>({
    queryKey: ['goal', id],
    queryFn: () => getGoal(id)
  });
  return query;
};

export default useGoal;
