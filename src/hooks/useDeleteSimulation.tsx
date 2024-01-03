import { DeleteSimulation } from '@/api/schemas/simulation';
import { deleteSimulation } from '@/api/simulation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteSimulation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['deleteSimulation'],
    mutationFn: (simulation: DeleteSimulation) => deleteSimulation(simulation),
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

export default useDeleteSimulation;
