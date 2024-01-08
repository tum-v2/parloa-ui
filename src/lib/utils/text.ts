import { SimulationStatus, SimulationType } from '@/api/schemas/simulation';

/**
 * Function to capitalize the first letter of a string
 * @param str - string to capitalize
 * @returns Capitalized string
 */
export const firstLetterToUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Function to convert a string with underscores to a string with spaces
 * @param str - string to convert
 * @returns Converted string
 */
export const underscoresToSpaces = (str: string) => {
  return str.replace(/_/g, ' ');
};

/**
 * Function to convert a simulation type to its pretty description.
 * @param type - the simulation type
 * @returns The pretty string
 */
export const simulationTypeDescription = (type: SimulationType) => {
  return firstLetterToUpperCase(type);
};

/**
 * Function to convert a simulation status to its pretty description.
 * @param status - the simulation status
 * @returns The pretty string
 */
export const simulationStatusDescription = (status: SimulationStatus) => {
  return firstLetterToUpperCase(status);
};
