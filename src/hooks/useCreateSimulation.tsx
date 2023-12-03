import { Simulation } from '@/api/schemas/simulation';
import { createSimulation } from '@/api/simulation';
import { useQuery } from '@tanstack/react-query';

const useCreateSimulation = (simulation: Simulation) => {
  const query = useQuery<Simulation, Error>({
    queryKey: ['simulation', simulation],
    queryFn: () => createSimulation(simulation)
  });
  return query;
};

export default useCreateSimulation;
