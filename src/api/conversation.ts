import {
  ConversationSchema,
  MessageSchema,
  Message
} from './schemas/conversation';

/**
 * /simulations/conversations/:id Get conversation
 */
export const getConversation = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/simulations/conversations/${id}`
  );

  const zodResponse = ConversationSchema.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data.messages;
};

export const loadManualConversation = async (simulationId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/chats/${simulationId}`
  );

  const r = await response.json();
  console.log(r);

  const zodResponse = MessageSchema.array().safeParse(r);

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
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/chats/${simulationId}`,
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
