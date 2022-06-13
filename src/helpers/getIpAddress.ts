import { getClientIp } from 'request-ip';
import type { IncomingMessage } from 'http';

export function getIpAddress(request: IncomingMessage): string | undefined {
  const detectedIp = getClientIp(request);

  if (!detectedIp) {
    return;
  }

  return detectedIp;
}
