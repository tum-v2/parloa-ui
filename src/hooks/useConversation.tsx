import { useQuery } from '@tanstack/react-query';
import { Conversation } from '@/api/schemas/conversation';
import { getConversation } from '@/api/conversation';

const useConversation = (id: string) => {
  return useQuery<Conversation, Error>({
    queryKey: ['conversation', id],
    queryFn: () => getConversation(id)
  });
};

export default useConversation;
