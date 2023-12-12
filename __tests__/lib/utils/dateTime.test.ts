import { formatSecondsToMinutesAndSeconds } from '@/lib/utils/dateTime';

test('formatSecondsToMinutesAndSeconds returns correct string for integer values', () => {
  expect(formatSecondsToMinutesAndSeconds(120)).toBe('2min 0s');
  expect(formatSecondsToMinutesAndSeconds(10)).toBe('10s');
});

test('formatSecondsToMinutesAndSeconds returns correct string for float values', () => {
  expect(formatSecondsToMinutesAndSeconds(119.5643)).toBe('2min 0s');
  expect(formatSecondsToMinutesAndSeconds(0.5643)).toBe('1s');
});
