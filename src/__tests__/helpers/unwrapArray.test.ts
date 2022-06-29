import { unwrapArray } from '@/helpers/unwrapArray';

describe('unwrapArray', () => {
  test('returns an array if the item an array', () => {
    const query = ['test', 'test2'];
    const result = unwrapArray(query);
    expect(result).toStrictEqual(['test', 'test2']);
  });

  test('returns string array if the item is a string', () => {
    const query = 'test';
    const result = unwrapArray(query);
    expect(result).toStrictEqual(['test']);
  });

  test('returns an empty array if the item is undefined', () => {
    const query = undefined;
    const result = unwrapArray(query);
    expect(result).toStrictEqual([]);
  });
});
