/**
 * /simulation/:id/poll Get simulation
 */
export const getSimulation = async (id: string) => {
  const response = await fetch(
    `${process.env.SIMULATION_API_URL}/simulation/${id}/poll`
  );
  const data = await response.json();
  return data;
};
