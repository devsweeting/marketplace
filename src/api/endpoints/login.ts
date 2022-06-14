import type { IncomingMessage } from 'http';
import { getStringFromQuery } from '@/helpers/getStringFromQuery';
import { getIpAddress } from '@/helpers/getIpAddress';
import { parseLocale } from '@/helpers/parseLocale';

export const loginWithToken = async ({
  req,
  token,
}: {
  req: IncomingMessage;
  token?: string | string[];
}): Promise<string | undefined> => {
  const parsedToken = getStringFromQuery(token);

  if (!parsedToken) {
    return;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: parsedToken,
      metadata: {
        ipAddress: getIpAddress(req),
        browserUserAgent: req.headers['user-agent'],
        localeInformation: parseLocale(req),
      },
    }),
  });

  if (!response.ok) {
    return;
  }

  return await response.text();
};
