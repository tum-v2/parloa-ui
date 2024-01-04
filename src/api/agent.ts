import { AgentSchema, CreateAgentSchema, CreateAgent } from './schemas/agent';
import secureLocalStorage from 'react-secure-storage';

/**
 * /agents/:id Get agent
 */
export const getAgent = async (id: string) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/agents/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const zodResponse = AgentSchema.safeParse(await response.json());

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};

/**
 * /agents Create agent
 */
export const createAgent = async (agent: CreateAgent) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/agents`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agent)
    }
  );

  const zodResponse = CreateAgentSchema.safeParse(await response.json());

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
