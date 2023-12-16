import { CreateOptimizationResponse } from '@/api/schemas/optimization';
import { CreateSimulation } from '@/api/schemas/simulation';
import { createOptimizedSimulation } from '@/api/simulation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateOptimizedSimulation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    CreateOptimizationResponse,
    Error,
    CreateSimulation
  >({
    mutationKey: ['createSimulation'],
    mutationFn: (simulation: CreateSimulation) =>
      createOptimizedSimulation(simulation),
    onSuccess: () => {
      // Invalidate all simulations query
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
    onError: error => {
      console.log(error);
    }
  });
  return mutation;
};

export default useCreateOptimizedSimulation;
