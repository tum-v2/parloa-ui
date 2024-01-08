import { deleteGoal } from '@/api/goal';
import { useQuery } from '@tanstack/react-query';

const useDeleteGoal = (id: string) => {
  const query = useQuery<boolean, Error>({
    queryKey: ['goal', id],
    queryFn: () => deleteGoal(id)
  });
  return query;
};

export default useDeleteGoal;
