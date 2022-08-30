import {
  calcTimeDifference,
  convertSecondsToHHMMSS,
  convertTimeDiffToHHMMSS,
} from '@/helpers/time';

describe('Time: calcTimeDifference', () => {
  test('should return 0 if the dates are the same', () => {
    expect(calcTimeDifference(new Date(), new Date())).toBe(0);
  });

  test('should return the difference in seconds between 2 dates', () => {
    expect(calcTimeDifference(new Date(0), new Date(1000))).toBe(1);
  });

  test('should be able to get the time difference of dates in string form', () => {
    expect(calcTimeDifference('12-12-2020', '12-12-2021')).toBe(31536000);
    expect(calcTimeDifference('2022-08-30T20:18:49.622Z', '2022-08-30T20:18:50.622Z')).toBe(1);
  });

  test('should return undefined if string is not a date', () => {
    expect(calcTimeDifference('bob', 'bill')).toBe(undefined);
    expect(calcTimeDifference('bob', '2022-08-30T20:18:50.622Z')).toBe(undefined);
  });
});

describe('Time: convertTimeDiffToHHMMSS', () => {
  test('should return time in seconds to format HHMMSS', () => {
    expect(convertSecondsToHHMMSS(0)).toEqual('00:00:00');
    expect(convertSecondsToHHMMSS(1)).toEqual('00:00:01');
    expect(convertSecondsToHHMMSS(121)).toEqual('00:02:01');
    expect(convertSecondsToHHMMSS(12100)).toEqual('03:21:40');
    expect(convertSecondsToHHMMSS(1536000)).toEqual('18:40:00');
  });
});

describe('Time: convertTimeDiffToHHMMSS', () => {
  test('should return time in seconds to format HHMMSS', () => {
    expect(convertTimeDiffToHHMMSS(new Date(), new Date())).toEqual('00:00:00');
    expect(convertTimeDiffToHHMMSS(new Date(0), new Date(1000))).toEqual('00:00:01');
    expect(convertTimeDiffToHHMMSS('12-12-2020', '12-12-2021')).toEqual('18:40:00');
  });
});
