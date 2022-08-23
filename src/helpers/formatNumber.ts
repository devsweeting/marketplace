/**
 * format a number to a number with commas.
 * @param number number to be converted to formatted string
 * @returns string of number with commas
 */
export function formatNumber(number: number): string {
  const formattedNumber = number.toLocaleString('en-US');
  return formattedNumber;
}
