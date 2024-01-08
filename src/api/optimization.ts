import customFetch from '@/lib/utils/fetch';
import { getEvaluationBySimulation } from './evaluation';
import { OptimizationSchema } from './schemas/optimization';

/**
 * /optimizations/:id Get child simulations of optimization
 */
export const getChildSimulations = async (id: string) => {
  const response = await customFetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/optimizations/${id}`
  );

  const zodResponse = OptimizationSchema.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  // TODO: This is a workaround to get the child simulations evaluations because the API doesn't support it yet
  // Get child simulations evaluations
  const evaluations = zodResponse.data.map(async simulation => {
    const evaluation = await getEvaluationBySimulation(simulation);
    return { _id: simulation, evaluation: evaluation };
  });

  return await Promise.all(evaluations);
};
