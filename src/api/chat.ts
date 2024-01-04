import { CreateChat, CreateChatResponseSchema } from './schemas/chat';
import secureLocalStorage from 'react-secure-storage';

export const createChatSimulation = async (chat: CreateChat) => {
  const token = secureLocalStorage.getItem('token');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/chats`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(chat)
    }
  );
  if (!response.ok) {
    throw new Error(response.status.toString()); // Handle non-2xx HTTP responses
  }
  const zodResponse = CreateChatResponseSchema.safeParse(await response.json());
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }
  return zodResponse.data;
};
