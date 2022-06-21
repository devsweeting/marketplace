export const LOG_LEVELS = {
  off: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
} as const;

type LogLevel = typeof LOG_LEVELS[keyof typeof LOG_LEVELS];

const methods = {
  1: 'error',
  2: 'warn',
  3: 'info',
  4: 'log',
} as const;

export const parseLevel = (levelStr?: string): LogLevel | undefined => {
  if (!levelStr || !(levelStr in LOG_LEVELS)) {
    return;
  }

  return LOG_LEVELS[levelStr as keyof typeof LOG_LEVELS];
};

export class Logger {
  _currentLevel: LogLevel = LOG_LEVELS.off;

  setLevel(level: LogLevel) {
    this._currentLevel = level;
  }

  error(message: unknown) {
    this.log(LOG_LEVELS.error, message);
  }

  warn(message: unknown) {
    this.log(LOG_LEVELS.warn, message);
  }

  info(message: unknown) {
    this.log(LOG_LEVELS.info, message);
  }

  debug(message: unknown) {
    this.log(LOG_LEVELS.debug, message);
  }

  log(level: LogLevel, message: unknown) {
    if (level === LOG_LEVELS.off || level > this._currentLevel) {
      return;
    }

    const method = methods[level];

    console[method](message);
  }
}

export const logger = new Logger();

logger.setLevel(
  parseLevel(process.env.LOG_LEVEL ?? process.env.NEXT_PUBLIC_LOG_LEVEL) ?? LOG_LEVELS.off,
);
