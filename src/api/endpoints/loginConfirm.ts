import type { IncomingMessage } from 'http';
import { unwrapString } from '@/helpers/unwrapString';
import { getIpAddress } from '@/helpers/getIpAddress';
import { parseLocale } from '@/helpers/parseLocale';
import { apiClient } from '@/api/client';

export const loginConfirm = async ({
  req,
  token,
}: {
  req: IncomingMessage;
  token?: string | string[];
}): Promise<string | undefined> => {
  const parsedToken = unwrapString(token);

  if (!parsedToken) {
    return;
  }

  const response = await apiClient.post('/users/login/confirm', {
    body: {
      token: parsedToken,
      metadata: {
        ipAddress: getIpAddress(req),
        browserUserAgent: req.headers['user-agent'],
        localeInformation: parseLocale(req),
      },
    },
  });

  if (!response.ok) {
    return;
  }

  if (response.isJson) {
    return;
  }

  return response.data;
};
