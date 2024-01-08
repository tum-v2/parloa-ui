import customFetch from '@/lib/utils/fetch';
import { EvaluationBySimulation } from './schemas/evaluation';

export const getEvaluationBySimulation = async (id: string) => {
  const response = await customFetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/evaluations/simulations/${id}`
  );

  const zodResponse = EvaluationBySimulation.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
