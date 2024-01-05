import { getPromptNames } from '@/api/prompts';
import { useQuery } from '@tanstack/react-query';

const usePromptNames = (agentType: string) => {
  const query = useQuery<string[], Error>({
    queryKey: ['prompts', agentType],
    queryFn: () => getPromptNames(agentType),
    // Polling every 10 seconds to update the list of simulations
    refetchInterval: 10000
  });
  return query;
};

export default usePromptNames;
