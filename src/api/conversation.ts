import { ConversationSchema } from './schemas/conversation';

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
