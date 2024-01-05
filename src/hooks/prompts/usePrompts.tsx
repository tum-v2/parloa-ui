import { getAllPrompts } from '@/api/prompts';
import { Prompts } from '@/api/schemas/prompts';
import { useQuery } from '@tanstack/react-query';

const usePrompts = (domain: string, agentType: string) => {
  const query = useQuery<Prompts, Error>({
    queryKey: ['prompts', domain, agentType],
    queryFn: () => getAllPrompts(domain, agentType),
    // Polling every 10 seconds to update the list of simulations
    refetchInterval: 10000
  });
  return query;
};

export default usePrompts;
