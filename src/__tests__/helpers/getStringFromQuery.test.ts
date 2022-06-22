import { getStringFromQuery } from '@/helpers/getStringFromQuery';

describe('getStringFromQuery', () => {
  test('returns the first element of the query if it is an array of strings', () => {
    const query = ['test', 'test2'];
    const result = getStringFromQuery(query);
    expect(result).toBe(query[0]);
  });

  test('returns string if the query is a string', () => {
    const query = 'test';
    const result = getStringFromQuery(query);
    expect(result).toBe(query);
  });

  test('returns undefined if the query is undefined', () => {
    const query = undefined;
    const result = getStringFromQuery(query);
    expect(result).toBe(undefined);
  });
});
