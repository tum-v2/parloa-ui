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
