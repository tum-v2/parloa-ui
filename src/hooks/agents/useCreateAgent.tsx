import { CreateAgent, Agent } from '@/api/schemas/agent';
import { createAgent } from '@/api/agent';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateAgent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Agent, Error, CreateAgent>({
    mutationKey: ['createAgent'],
    mutationFn: (agent: CreateAgent) => createAgent(agent),
    onSuccess: () => {
      // Update all agents query
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
    onError: error => {
      console.log(error);
    }
  });
  return mutation;
};

export default useCreateAgent;
