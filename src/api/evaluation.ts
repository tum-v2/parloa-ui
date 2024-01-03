import { EvaluationBySimulation } from './schemas/evaluation';
import secureLocalStorage from 'react-secure-storage';

export const getEvaluationBySimulation = async (id: string) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/evaluations/simulations/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const zodResponse = EvaluationBySimulation.safeParse(await response.json());

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
