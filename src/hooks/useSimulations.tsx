import { Simulation } from '@/api/schemas/simulation';
import { getAllSimulations } from '@/api/simulation';
import { useQuery } from '@tanstack/react-query';

const useSimulations = () => {
  const query = useQuery<Simulation[], Error>({
    queryKey: ['simulations'],
    queryFn: getAllSimulations
  });
  return query;
};

export default useSimulations;
