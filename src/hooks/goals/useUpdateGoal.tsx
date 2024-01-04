import { Goal } from '@/api/schemas/goal';
import { updateGoal } from '@/api/goal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateGoal = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Goal, Error, Goal>({
    mutationKey: ['createGoal'],
    mutationFn: (goal: Goal) => updateGoal(goal),
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

export default useUpdateGoal;
