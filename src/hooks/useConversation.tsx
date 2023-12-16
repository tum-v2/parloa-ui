import { useQuery } from '@tanstack/react-query';
import { Message } from '@/api/schemas/conversation';
import { getConversation, loadManualConversation } from '@/api/conversation';

const useConversation = (
  simulationId: string,
  chatId: string,
  shouldPoll = false,
  interactive = false
) => {
  return useQuery<Array<Message>, Error>({
    queryKey: ['conversation', interactive ? simulationId : chatId],
    queryFn: () =>
      interactive
        ? loadManualConversation(simulationId)
        : getConversation(chatId),
    refetchInterval: shouldPoll ? 3000 : false
  });
};

export default useConversation;
