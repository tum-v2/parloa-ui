import { CreateSimulation, Simulation } from '@/api/schemas/simulation';
import { createOptimizedSimulation } from '@/api/simulation';
import { useMutation } from '@tanstack/react-query';

const useCreateOptimizedSimulation = () => {
  const mutation = useMutation<Simulation, Error, CreateSimulation>({
    mutationKey: ['createSimulation'],
    mutationFn: (simulation: CreateSimulation) =>
      createOptimizedSimulation(simulation)
  });
  return mutation;
};

export default useCreateOptimizedSimulation;
