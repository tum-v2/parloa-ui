import { EvaluationBySimulation } from './schemas/evaluation';

export const getEvaluationBySimulation = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/evaluation/results-for-simulation/${id}`
  );

  const zodResponse = EvaluationBySimulation.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
