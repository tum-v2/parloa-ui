import { CreateSimulation, Simulation } from '@/api/schemas/simulation';
import { createSimulation } from '@/api/simulation';
import { useMutation } from '@tanstack/react-query';

const useCreateSimulation = () => {
  const mutation = useMutation<Simulation, Error, CreateSimulation>({
    mutationKey: ['createSimulation'],
    mutationFn: (simulation: CreateSimulation) => createSimulation(simulation)
  });
  return mutation;
};

export default useCreateSimulation;
