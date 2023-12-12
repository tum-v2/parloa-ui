import theme from '@/theme/theme';

/**
 * Function to scale a value to a color between red and green based on a min and max value first 33% of the scale is red, middle 33% is yellow, last 33% is green
 */
export const scaleValueToColor = (
  value: number,
  min: number,
  max: number,
  reversed?: boolean
) => {
  const range = max - min;
  const third = range / 3;

  if (reversed) {
    value = max - value;
  }

  if (value < min + third) {
    return theme.token.colorError;
  } else if (value < min + third * 2) {
    return theme.token.colorWarning;
  } else {
    return theme.token.colorSuccess;
  }
};
