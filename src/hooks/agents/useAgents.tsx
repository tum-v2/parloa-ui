import { getAllAgents } from 'src/api/agent';
import { Agent } from 'src/api/schemas/agent';
import { useQuery } from '@tanstack/react-query';

const useAgents = () => {
  const query = useQuery<Agent[], Error>({
    queryKey: ['agents'],
    queryFn: getAllAgents,
    // Polling every 10 seconds to update the list of simulations
    refetchInterval: 10000
  });
  return query;
};

export default useAgents;
