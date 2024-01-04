import { CreateGoal, Goal } from '@/api/schemas/goal';
import { createGoal } from '@/api/goal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateGoal = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Goal, Error, CreateGoal>({
    mutationKey: ['createGoal'],
    mutationFn: (goal: CreateGoal) => createGoal(goal),
    onSuccess: () => {
      // Update all goals query
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
    onError: error => {
      console.log(error);
    }
  });
  return mutation;
};

export default useCreateGoal;
