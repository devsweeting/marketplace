import { unwrapString } from '@/helpers/unwrapString';

describe('unwrapString', () => {
  test('returns the first element of the item if it is an array', () => {
    const query = ['test', 'test2'];
    const result = unwrapString(query);
    expect(result).toBe(query[0]);
  });

  test('returns string if the item is a string', () => {
    const query = 'test';
    const result = unwrapString(query);
    expect(result).toBe(query);
  });

  test('returns undefined if the item is undefined', () => {
    const query = undefined;
    const result = unwrapString(query);
    expect(result).toBe(undefined);
  });
});
