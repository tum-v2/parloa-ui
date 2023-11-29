import { Simulation } from '@/api/schemas/simulation';
import { getSimulation } from '@/api/simulation';
import { useQuery } from '@tanstack/react-query';

const useSimulation = (id: string) => {
  const query = useQuery<Simulation, Error>({
    queryKey: ['simulation', id],
    queryFn: () => getSimulation(id)
  });
  return query;
};

export default useSimulation;
