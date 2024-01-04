import { AuthSchema } from './schemas/auth';
import secureLocalStorage from 'react-secure-storage';

/**
 * /auth/login POST login
 */

export type LoginAccessCode = {
  accessCode: string;
};

export const postLoginAccessCode = async (loginData: LoginAccessCode) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(loginData)
    }
  );

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const zodResponse = AuthSchema.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
