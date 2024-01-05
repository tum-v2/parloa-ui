import { PromptSchema } from './schemas/prompts';
import secureLocalStorage from 'react-secure-storage';
import { z } from 'zod';

/**
 * /prompts Get all prompts based on agent type and domain
 */

export const getAllPrompts = async (domain: string, agentType: string) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/dictionary/prompts?domain=${domain}&agentType=${agentType}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const zodResponse = PromptSchema.safeParse(await response.json());

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
 * /prompts Get Prompt Names for Agent Type
 */

export const getPromptNames = async (agentType: string) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/dictionary/prompt-names?agentType=${agentType}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const zodResponse = z.array(z.string()).safeParse(await response.json());

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
