import {
  ConversationSchema,
  MessageSchema,
  Message
} from './schemas/conversation';
import secureLocalStorage from 'react-secure-storage';

/**
 * /simulations/conversations/:id Get conversation
 */
export const getConversation = async (id: string) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/simulations/conversations/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const zodResponse = ConversationSchema.safeParse(await response.json());

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data.messages;
};

export const loadManualConversation = async (simulationId: string) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/chats/${simulationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const r = await response.json();
  console.log(r);

  const zodResponse = MessageSchema.array().safeParse(r);

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

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
