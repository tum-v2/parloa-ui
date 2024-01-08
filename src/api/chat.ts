import customFetch from '@/lib/utils/fetch';
import { CreateChat, CreateChatResponseSchema } from './schemas/chat';

export const createChatSimulation = async (chat: CreateChat) => {
  const response = await customFetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/chats`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chat)
    }
  );

  const zodResponse = CreateChatResponseSchema.safeParse(await response.json());
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }
  return zodResponse.data;
};
