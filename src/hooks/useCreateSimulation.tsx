import {
  CreateSimulation,
  CreateSimulationResponse
} from '@/api/schemas/simulation';
import { createSimulation } from '@/api/simulation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateSimulation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateSimulationResponse,
    Error,
    CreateSimulation
  >({
    mutationKey: ['createSimulation'],
    mutationFn: (simulation: CreateSimulation) => createSimulation(simulation),
    onSuccess: () => {
      // Update all simulations query
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
    onError: error => {
      console.log(error);
    }
  });
  return mutation;
};

export default useCreateSimulation;
