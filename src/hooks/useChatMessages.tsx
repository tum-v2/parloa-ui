import { useEffect, useState } from 'react';
import useConversation from '@/hooks/useConversation';
import { Message } from '@/api/schemas/conversation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMessage } from '@/api/conversation';

const useChatMessages = (
  simulationId: string,
  chatId: string,
  interactive: boolean
) => {
  const [initiallyLoading, setInitiallyLoading] = useState(true);
  const [displayAgentLoading, setDisplayAgentLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: fetchedMessages, error } = useConversation(
    simulationId,
    chatId,
    true, // Always fetch messages to make we don't miss any messages
    interactive
  );

  const sendMutation = useMutation<
    Message,
    Error,
    { simulationId: string; message: string }
  >({
    mutationKey: ['sendMessage'],
    mutationFn: (message: { simulationId: string; message: string }) =>
      postMessage(message.simulationId, message.message),
    onMutate: ({ simulationId, message }) => {
      // We're sending a message, so we can start displaying the loading indicator:
      setDisplayAgentLoading(true);

      // Add the message to the list of messages:
      queryClient.setQueryData(
        ['conversation', simulationId],
        (old: Message[]) => {
          if (!old) {
            return [];
          }

          const newMessage: Message = {
            text: message,
            userCanReply: false,
            sender: 'USER',
            timestamp: new Date().toISOString()
          };

          return [...old, newMessage];
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['conversation', simulationId]
      });
      // We received a message from the agent, so we can stop displaying the loading indicator:
      setDisplayAgentLoading(false);
    },
    onError: error => {
      console.log(error);
    }
  });

  useEffect(() => {
    if (!fetchedMessages) {
      return;
    }

    if (initiallyLoading) {
      setInitiallyLoading(false);
    }
  }, [fetchedMessages, initiallyLoading]);

  return {
    messages: fetchedMessages,
    initiallyLoading,
    displayAgentLoading,
    sendMutation,
    error
  };
};

export default useChatMessages;
