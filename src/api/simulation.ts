import { CreateOptimizationResponseSchema } from './schemas/optimization';
import {
  SimulationSchema,
  CreateSimulation,
  CreateSimulationResponseSchema,
  DeleteSimulation
} from './schemas/simulation';
import secureLocalStorage from 'react-secure-storage';

/**
 * /simulations/:id Get simulation
 */
export const getSimulation = async (id: string) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/simulations/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const zodResponse = SimulationSchema.safeParse(await response.json());

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  // Return error to react-query
  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};

/**
 * /simulations Get all simulations
 */
export const getAllSimulations = async () => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/simulations`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const zodResponse = SimulationSchema.array().safeParse(await response.json());

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

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
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/simulations`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(simulationData)
    }
  );

  if (!response.ok) {
    throw new Error(response.status.toString()); // Handle non-2xx HTTP responses
  }

  const zodResponse = CreateSimulationResponseSchema.safeParse(
    await response.json()
  );

  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};

export const createOptimizedSimulation = async (
  simulationData: CreateSimulation
) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/optimizations`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(simulationData)
    }
  );

  if (!response.ok) {
    throw new Error(response.status.toString()); // Handle non-2xx HTTP responses
  }

  const zodResponse = CreateOptimizationResponseSchema.safeParse(
    await response.json()
  );

  if (!zodResponse.success) {
    throw new Error(zodResponse.error.message);
  }

  return zodResponse.data;
};

export const deleteSimulation = async (
  deleteSimulationData: DeleteSimulation
) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/simulations/${deleteSimulationData._id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(response.status.toString()); // Handle non-2xx HTTP responses
  }
  // Becuase the response is empty, we can't use zod to parse it
  return response;
};
