/* eslint-disable testing-library/no-debugging-utils,no-console */
import { LOG_LEVELS, Logger, parseLevel } from '@/helpers/logger';

describe('parseLevel', () => {
  test('it parses level', () => {
    expect(parseLevel('off')).toBe(LOG_LEVELS.off);
    expect(parseLevel('error')).toBe(LOG_LEVELS.error);
    expect(parseLevel('warn')).toBe(LOG_LEVELS.warn);
    expect(parseLevel('info')).toBe(LOG_LEVELS.info);
    expect(parseLevel('debug')).toBe(LOG_LEVELS.debug);
  });
});

describe('Logger', () => {
  let logger = new Logger();
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const originalLog = console.log;

  beforeEach(() => {
    logger = new Logger();
    console.error = jest.fn();
    console.warn = jest.fn();
    console.info = jest.fn();
    console.log = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
    console.warn = originalWarn;
    console.info = originalInfo;
    console.log = originalLog;
  });

  test('it logs each level to appropriate console method', () => {
    logger.setLevel(LOG_LEVELS.error);

    logger.error('test');

    expect(console.error).toHaveBeenCalledTimes(1);

    logger.warn('test');

    expect(console.warn).toHaveBeenCalledTimes(1);

    logger.info('test');

    expect(console.info).toHaveBeenCalledTimes(1);

    logger.debug('test');

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  test('it only logs when current log level matches', () => {
    logger.setLevel(LOG_LEVELS.error);
    logger.error('test');
    logger.warn('test');
    logger.info('test');
    logger.debug('test');

    logger.setLevel(LOG_LEVELS.warn);
    logger.error('test');
    logger.warn('test');
    logger.info('test');
    logger.debug('test');

    logger.setLevel(LOG_LEVELS.info);
    logger.error('test');
    logger.warn('test');
    logger.info('test');
    logger.debug('test');

    logger.setLevel(LOG_LEVELS.debug);
    logger.error('test');
    logger.warn('test');
    logger.info('test');
    logger.debug('test');

    logger.setLevel(LOG_LEVELS.off);
    logger.error('test');
    logger.warn('test');
    logger.info('test');
    logger.debug('test');
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledTimes(2);
    expect(console.info).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenCalledTimes(4);
  });
});
