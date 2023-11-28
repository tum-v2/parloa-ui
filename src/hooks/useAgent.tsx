import { getAgent } from '@/api/agent';
import { Agent } from '@/api/schemas/agent';
import { useQuery } from '@tanstack/react-query';

const useAgent = (id: string) => {
  const query = useQuery<Agent, Error>({
    queryKey: ['agent', id],
    queryFn: () => getAgent(id)
  });
  return query;
};

export default useAgent;
