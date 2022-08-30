/**
 * Finds the amount of time (in seconds) between two dates
 * @param startDate the starting date
 * @param endDate the end date
 * @returns amount of time before the 2 dates in seconds
 */
export function calcTimeDifference(startDate: Date | string, endDate: Date | string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const result = (end.getTime() - start.getTime()) / 1000;

  return isNaN(result) ? undefined : result;
}

/**
 * convert time in seconds to HH:MM:SS
 * @param seconds
 * @returns string formatted to HH:MM:SS
 */
export function convertSecondsToHHMMSS(seconds: number): string {
  //TODO fix this function
  console.log(new Date(seconds * 1000));
  return new Date(seconds * 1000).toISOString().slice(11, 19);
}

export function convertTimeDiffToHHMMSS(startDate: Date | string, endDate: Date | string) {
  const seconds = calcTimeDifference(startDate, endDate) ?? 0;
  console.log(seconds);
  return convertSecondsToHHMMSS(seconds);
}
