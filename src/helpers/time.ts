import { padTo2Digits } from './padTo2Digits';

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
export function convertSecondsToHHMMSS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

export function convertTimeDiffToHHMMSS(startDate: Date | string, endDate: Date | string) {
  const seconds = calcTimeDifference(startDate, endDate) ?? 0;
  return convertSecondsToHHMMSS(seconds);
}
