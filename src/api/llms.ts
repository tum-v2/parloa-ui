import { z } from 'zod';

export const getAllLLMs = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/language-models`
  );

  // Assuming the response is an array of strings
  const zodResponse = z.array(z.string()).safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
