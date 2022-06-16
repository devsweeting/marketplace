import { truncateName } from '@/helpers/truncate';

describe('truncateName', () => {
  test('should return the same string if it is shorter than the length', () => {
    const name = 'test';
    const length = name.length + 1;
    const result = truncateName(name, length);
    expect(result).toBe(name);
  });

  test('should return the string with the last three characters replaced with ".." if it is longer than the length', () => {
    const name = 'test';
    const length = name.length - 3;
    const result = truncateName(name, length);
    expect(result).toBe(`${name.slice(0, length)}..`);
  });

  test('should return the string if the string is the same length as the value', () => {
    const name = 'test';
    const length = name.length;
    const result = truncateName(name, length);
    expect(result).toBe(name);
  });
});
