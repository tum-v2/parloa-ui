import { AgentSchema } from './schemas/agent';

/**
 * /agent/:id Get agent
 */
export const getAgent = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/agent/${id}`
  );

  const zodResponse = AgentSchema.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
