/**
 * Finds the amount of time (in seconds) between two dates
 * @param startDate the starting date
 * @param endDate the end date
 * @returns amount of time before the 2 dates in seconds
 */
export function calcTimeDifference(startDate: Date | string, endDate: Date | string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return (end.getTime() - start.getTime()) / 1000;
}

/**
 * convert time in seconds to HH:MM:SS
 * @param seconds
 * @returns string formatted to HH:MM:SS
 */
export function convertSecondsToHHMMSS(seconds: number): string {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
}

export function convertTimeDiffToHHMMSS(startDate: Date | string, endDate: Date | string) {
  return convertSecondsToHHMMSS(calcTimeDifference(startDate, endDate));
}
