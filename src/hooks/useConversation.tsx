import { useQuery } from '@tanstack/react-query';
import { Conversation } from '@/api/schemas/conversation';
import { getConversation } from '@/api/conversation';

const useConversation = (id: string, shouldPoll = false) => {
  return useQuery<Conversation, Error>({
    queryKey: ['conversation', id],
    queryFn: () => getConversation(id),
    refetchInterval: shouldPoll ? 3000 : false
  });
};

export default useConversation;
