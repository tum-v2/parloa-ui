import { getAllLLMs } from '@/api/llms';
import { useQuery } from '@tanstack/react-query';

const useLLMs = () => {
  const query = useQuery<string[], Error>({
    queryKey: ['language-models'],
    queryFn: getAllLLMs,
    // Polling every 10 seconds to update the list of simulations
    refetchInterval: 10000
  });
  return query;
};

export default useLLMs;
