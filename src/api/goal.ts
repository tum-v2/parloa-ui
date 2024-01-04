import { Goal, CreateGoal, GoalSchema } from './schemas/goal';

import secureLocalStorage from 'react-secure-storage';

/**
 * /goals/:id Get goal
 * @param id - The ID of the goal.
 */

export const getGoal = async (id: string) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/goals/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const zodResponse = GoalSchema.safeParse(await response.json());

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
 * /goals Get all goals
 */

export const getAllGoals = async () => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/goals`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const zodResponse = GoalSchema.array().safeParse(await response.json());

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
 * Create a new goal.
 *
 * @param goal - The goal object to create.
 */

export const createGoal = async (goal: CreateGoal) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/goals`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(goal)
    }
  );

  const zodResponse = GoalSchema.safeParse(await response.json());

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
 * Update a goal.
 *
 * @param goal - The goal object to update.
 */

export const updateGoal = async (goal: Goal) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/goals/${goal._id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(goal)
    }
  );

  const zodResponse = GoalSchema.safeParse(await response.json());

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
 * Delete a goal.
 *
 * @param id - The ID of the goal to delete.
 */

export const deleteGoal = async (id: string) => {
  const token = secureLocalStorage.getItem('token');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SIMULATION_API_URL}/goals/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return true;
};
