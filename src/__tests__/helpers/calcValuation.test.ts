import { calcValuation } from '@/helpers/calcValuation';

describe('calcValuation', () => {
  test('should get the valuation amount', () => {
    expect(calcValuation(100, 133)).toBe(133);
    expect(calcValuation(0, 133)).toBe(0);
    expect(calcValuation(1, 33)).toBe(0.33);
  });
});
