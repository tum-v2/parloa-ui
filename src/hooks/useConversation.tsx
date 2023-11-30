import { useQuery } from '@tanstack/react-query';
import { Conversation, ConversationSchema } from '@/api/schemas/conversation';

const useConversation = (id: number) => {
  // TODO: remove mock
  const mockConversation = ConversationSchema.parse({
    _id: id,
    messages: [
      {
        _id: 1,
        message: `Hi, I am conversation with id ${id}.`,
        position: 'right'
      },
      {
        _id: 2,
        message: 'Hello, how may I help you today?',
        position: 'left'
      }
    ]
  });

  const getMockConversation = async () => {
    await new Promise(r => setTimeout(r, 1000));
    return mockConversation;
  };

  return useQuery<Conversation, Error>({
    queryKey: ['conversation', id],
    queryFn: () => getMockConversation()
  });
};

export default useConversation;
