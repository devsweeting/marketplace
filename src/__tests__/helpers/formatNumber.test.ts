import { formatNumber } from '@/helpers/formatNumber';

describe('formatNumber', () => {
  test('should format numbers correctly', () => {
    expect(formatNumber(1)).toBe('1');
    expect(formatNumber(100)).toBe('100');
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1000.0)).toBe('1,000');
    expect(formatNumber(1000.01)).toBe('1,000.01');
    expect(formatNumber(10000000.01)).toBe('10,000,000.01');
  });
});
