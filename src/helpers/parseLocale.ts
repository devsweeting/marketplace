import { parse } from 'accept-language-parser';
import type { IncomingMessage } from 'http';

export const parseLocale = (request: IncomingMessage): string | undefined => {
  const [locale] = parse(request.headers['accept-language']);

  if (!locale) {
    return;
  }

  let parsedLocale = locale.code;

  if (locale.region) {
    parsedLocale += `-${locale.region}`;
  }

  return parsedLocale;
};
