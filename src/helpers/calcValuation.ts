/**
 * Get the valuation of a card in dollars
 * @param fractionTotal total number of fractions
 * @param priceCents price per fraction in cents
 * @returns total price for all fractions in dollars.
 */
export const calcValuation = (fractionTotal: number, priceCents: number): number => {
  return (fractionTotal * priceCents) / 100;
};
