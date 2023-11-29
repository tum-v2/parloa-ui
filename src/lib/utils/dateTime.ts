/**
 * Format a date string to a long date string e.g. 2021-08-31T15:00:00.000Z -\> August 31st 11:00:00 AM
 * @param dateString - date string to format
 * @returns formatted date string
 */

export const formatLongDateTimeString = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
};
