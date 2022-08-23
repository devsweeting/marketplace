import { safeParseInt } from '@/helpers/safeParseInt';

describe('safeParseInt', () => {
  test('should parse a string to a number', () => {
    const result = safeParseInt('12');
    expect(result).toBe(12);
  });

  test('should return undefined for non-numbers', () => {
    const result = safeParseInt('twelve');
    expect(result).toBeUndefined();
  });
});
