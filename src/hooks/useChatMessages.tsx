import { useEffect, useState } from 'react';
import useConversation from '@/hooks/useConversation';
import { Message } from '@/api/schemas/conversation';

const useChatMessages = (
  simulationId: string,
  chatId: string,
  interactive: boolean
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [shouldPoll, setShouldPoll] = useState(true);
  const [initiallyLoading, setInitiallyLoading] = useState(true);
  const [displayAgentLoading, setDisplayAgentLoading] = useState(false);

  const {
    data: fetchedMessages,
    isLoading,
    error
  } = useConversation(simulationId, chatId, shouldPoll, interactive);

  useEffect(() => {
    if (!fetchedMessages) {
      return;
    }

    setMessages(fetchedMessages);

    if (initiallyLoading) {
      setInitiallyLoading(false);
    }

    // Temporarily disable polling for interactive chats while waiting for the agent's message:

    if (!interactive) {
      return;
    }

    const lastMessage = fetchedMessages.at(-1);
    if (!lastMessage) {
      return;
    }

    if (lastMessage.sender !== 'USER') {
      setShouldPoll(false);
    }
  }, [fetchedMessages, interactive, initiallyLoading]);

  useEffect(() => {
    if (!interactive) {
      return;
    }

    const lastMessage = messages.at(-1);
    if (!lastMessage || lastMessage.sender !== 'USER') {
      setDisplayAgentLoading(false);
      return;
    }

    setDisplayAgentLoading(true);
  }, [messages, interactive]);

  return {
    messages,
    setMessages,
    initiallyLoading,
    displayAgentLoading,
    error
  };
};

export default useChatMessages;
