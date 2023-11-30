import { firstLetterToUpperCase, underscoresToSpaces } from '@/lib/utils/text';

test('firstLetterToUpperCase should capitalize the first letter of a string', () => {
  expect(firstLetterToUpperCase('test')).toEqual('Test');

  expect(firstLetterToUpperCase('TEST')).toEqual('Test');

  expect(firstLetterToUpperCase('tEST')).toEqual('Test');

  expect(firstLetterToUpperCase('Test')).toEqual('Test');
});

test('firstLetterToUpperCase should return empty string if input is empty string', () => {
  expect(firstLetterToUpperCase('')).toEqual('');
});

test('underscoresToSpaces should convert a string with underscores to a string with spaces', () => {
  expect(underscoresToSpaces('test_string')).toEqual('test string');

  expect(underscoresToSpaces('TEST_STRING')).toEqual('TEST STRING');

  expect(underscoresToSpaces('tEST_sTRING')).toEqual('tEST sTRING');

  expect(underscoresToSpaces('Test_String')).toEqual('Test String');
});
