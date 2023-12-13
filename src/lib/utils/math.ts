/**
 * Function to scale a value linearly between a min and max value to a value between 0 and 100
 * @param value - value to scale
 * @param min - min value of the scale
 * @param max - max value of the scale
 * @returns Scaled value
 */

export const scaleValueLinearly = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
};
