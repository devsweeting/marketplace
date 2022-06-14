import { getClientIp } from 'request-ip';
import type { IncomingMessage } from 'http';

export const getIpAddress = (request: IncomingMessage): string | undefined => {
  const detectedIp = getClientIp(request);

  if (!detectedIp) {
    return;
  }

  return detectedIp;
};
