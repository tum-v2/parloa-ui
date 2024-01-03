import { CreateChat, CreateChatResponseSchema } from './schemas/chat';

export const createChatSimulation = async (chat: CreateChat) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/chats`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chat)
    }
  );
  if (!response.ok) {
    throw new Error('Failed to create simulation'); // Handle non-2xx HTTP responses
  }
  const zodResponse = CreateChatResponseSchema.safeParse(await response.json());
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }
  return zodResponse.data;
};
