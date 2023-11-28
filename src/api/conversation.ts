import { ConversationSchema } from './schemas/conversation';

/**
 * /chat/:id Get conversation
 */
export const getSimulation = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/chat/${id}`
  );

  const zodResponse = ConversationSchema.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
