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

/**
 * Format a number in seconds to a string in minutes and seconds e.g. 120 -\> 2min 0s or 10 -\> 10s or 119.5643 -\> 2min 0s
 * @param seconds - number in seconds to format
 * @returns formatted string
 */
export const formatSecondsToMinutesAndSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  // If rounded seconds is 60, add 1 to minutes and set remaining seconds to 0
  if (remainingSeconds === 60) {
    return `${minutes + 1}min 0s`;
  }

  return `${minutes ? `${minutes}min ` : ''}${remainingSeconds}s`;
};
