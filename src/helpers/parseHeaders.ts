import type { IncomingHttpHeaders } from 'http';
import { unwrapString } from './unwrapString';

/**
 * Parse headers removing disallowed headers
 * @param headers Request headers
 * @param disallowHeaders array of headers to remove
 * @returns Request header with headers removed
 */
export const parseHeaders = (
  headers: IncomingHttpHeaders,
  disallowHeaders: string[] = [],
): Record<string, string> => {
  const updatedHeaders: Record<string, string> = {};

  const headersToRemove = disallowHeaders.map((headerName) => {
    return headerName.toLowerCase();
  });
  for (const [key, value] of Object.entries(headers)) {
    if (headersToRemove.includes(key.toLowerCase())) {
      continue;
    }
    const updatedValue = unwrapString(value);

    if (updatedValue) {
      updatedHeaders[key] = updatedValue;
    }
  }

  return updatedHeaders;
};
