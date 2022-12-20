import type { IncomingMessage } from 'http';
import { unwrapString } from '@/helpers/unwrapString';
import { getIpAddress } from '@/helpers/getIpAddress';
import { parseLocale } from '@/helpers/parseLocale';
import { apiClient } from '@/api/client';
import type { IJwt } from '@/types';

export const loginConfirm = async ({
  req,
  token,
}: {
  req: IncomingMessage;
  token?: string | string[];
}): Promise<IJwt | undefined> => {
  const parsedToken = unwrapString(token);

  if (!parsedToken) {
    return;
  }
  const response = await apiClient.post('/users/login/confirm', {
    body: {
      token: parsedToken,
      metadata: {
        ipAddress: getIpAddress(req),
        browserUserAgent: req?.headers['user-agent'] ?? '',
        localeInformation: parseLocale(req),
      },
    },
  });

  if (
    !response.ok ||
    !response.isJson ||
    !response.data.accessToken ||
    !response.data.refreshToken
  ) {
    return;
  }

  return response.data as unknown as IJwt;
};
