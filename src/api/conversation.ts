import {
  ConversationSchema,
  MessageSchema,
  Message
} from './schemas/conversation';

/**
 * /simulation/conversation/:id Get conversation
 */
export const getConversation = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/simulation/conversation/${id}`
  );

  const zodResponse = ConversationSchema.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};

export const postMessage = async (
  simulationId: string,
  message: string
): Promise<Message> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/chat/${simulationId}/send-message`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    }
  );

  const zodResponse = MessageSchema.safeParse(await response.json());
  if (!zodResponse.success) {
    throw new Error(`Response status: ${zodResponse.error.message}`);
  }

  return zodResponse.data;
};
