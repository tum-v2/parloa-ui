import { SimulationSchema } from './schemas/simulation';

/**
 * /simulation/:id Get simulation
 */
export const getSimulation = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/simulation/${id}`
  );

  const zodResponse = SimulationSchema.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};

/**
 * /simulation/all Get all simulations
 */
export const getAllSimulations = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/simulation/all`
  );

  const zodResponse = SimulationSchema.array().safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
