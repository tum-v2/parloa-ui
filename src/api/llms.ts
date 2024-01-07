import { LLMSchema } from './schemas/llms';
import secureLocalStorage from 'react-secure-storage';

export const getAllLLMs = async () => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/dictionary/language-models`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  // Assuming the response is an array of strings
  const zodResponse = LLMSchema.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
