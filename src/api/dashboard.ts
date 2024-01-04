import { DashboardSchema } from './schemas/dashboard';
import secureLocalStorage from 'react-secure-storage';

/**
 * /dashboard?days=days Get dashboard by given days
 */
export const getDashboard = async (days: number) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/dashboard/?days=${days}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const zodResponse = DashboardSchema.safeParse(await response.json());

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
