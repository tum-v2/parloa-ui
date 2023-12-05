import { CreateSimulation, Simulation } from '@/api/schemas/simulation';
import { createSimulation } from '@/api/simulation';
import { useMutation } from '@tanstack/react-query';

const useCreateSimulation = () => {
  const mutation = useMutation<CreateSimulation, Error, Simulation>({
    mutationKey: ['simulation'],
    mutationFn: (simulation: Simulation) => createSimulation(simulation)
  });
  return mutation;
};

export default useCreateSimulation;
