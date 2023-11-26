import { SimulationSchema } from './schemas/simulation';

/**
 * /simulation/:id/poll Get simulation
 */
export const getSimulation = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/simulation/${id}/poll`
  );

  const zodResponse = SimulationSchema.safeParse(await response.json());

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
