import customFetch from '@/lib/utils/fetch';
import { AuthSchema } from './schemas/auth';

/**
 * /auth/login POST login
 */

export type LoginAccessCode = {
  accessCode: string;
};

export const postLoginAccessCode = async (loginData: LoginAccessCode) => {
  const response = await customFetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    }
  );

  const zodResponse = AuthSchema.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
