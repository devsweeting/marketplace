/**
 * Safely parse an string into a number or return undefined if nan
 * @param number a string of a number
 * @returns undefined or the number
 */
export const safeParseInt = (number: string): number | undefined => {
  const result = parseInt(number);
  if (isNaN(result)) {
    return;
  }
  return result;
};
