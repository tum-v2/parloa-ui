import customFetch from '@/lib/utils/fetch';
import { DashboardSchema } from './schemas/dashboard';

/**
 * /dashboard?days=days Get dashboard by given days
 */
export const getDashboard = async (days: number) => {
  const response = await customFetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/dashboard/?days=${days}`
  );

  const zodResponse = DashboardSchema.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
