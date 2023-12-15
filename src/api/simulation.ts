import { SimulationSchema, CreateSimulation } from './schemas/simulation';

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

/**
 * Create a new simulation.
 *
 * @param simulationData - The data for the new simulation.
 * @returns The created simulation data.
 * @throws If there's an error during the creation process.
 */
export const createSimulation = async (simulationData: CreateSimulation) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/simulation/run`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(simulationData)
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create simulation'); // Handle non-2xx HTTP responses
  }

  const zodResponse = SimulationSchema.safeParse(await response.json());

  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};

export const createOptimizedSimulation = async (
  simulationData: CreateSimulation
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/optimization/run`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(simulationData)
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create simulation'); // Handle non-2xx HTTP responses
  }

  const zodResponse = SimulationSchema.safeParse(await response.json());

  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};
