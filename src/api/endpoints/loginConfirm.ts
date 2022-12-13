import type { IncomingMessage } from 'http';
import { unwrapString } from '@/helpers/unwrapString';
import { getIpAddress } from '@/helpers/getIpAddress';
import { parseLocale } from '@/helpers/parseLocale';
import { apiClient } from '@/api/client';
import type { IJwt } from '@/types';
import { jwtSchema } from '@/schemas/auth.schemas';

export const loginConfirm = async ({
  req,
  token,
}: {
  req: IncomingMessage;
  token?: string | string[];
}): Promise<IJwt | undefined> => {
  try {
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

    return jwtSchema.parse(response.data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return;
  }
};
