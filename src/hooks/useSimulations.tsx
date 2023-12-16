import { Simulation } from '@/api/schemas/simulation';
import { getAllSimulations } from '@/api/simulation';
import { useQuery } from '@tanstack/react-query';

const useSimulations = () => {
  const query = useQuery<Simulation[], Error>({
    queryKey: ['simulations'],
    queryFn: getAllSimulations,
    // Polling every 10 seconds to update the list of simulations
    refetchInterval: 10000
  });
  return query;
};

export default useSimulations;
