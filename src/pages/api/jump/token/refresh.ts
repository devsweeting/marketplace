import { ServerApiClient } from '@/api/client/apiClient.server';
import { getAccessExpFromJwtAsDate } from '@/helpers/auth/getExpFrom';
import { getUserCookie, removeUserCookie, updateUserCookie } from '@/helpers/auth/userCookie';
import type { IJwt } from '@/types/jwt';
import type { NextServerResponse } from '@/types/next';
import { withSentry } from '@sentry/nextjs';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Check if refresh token has expired.
 * This should NEVER be called outside of BrowserApiClient
 */
const refreshToken = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req || !res) {
    res.status(StatusCodes.BAD_REQUEST).send(undefined);
    return;
  }

  const token = getUserCookie(req);

  if (!token || !token.accessToken) {
    res.status(StatusCodes.OK).send(undefined);
    return;
  }

  const expireDate = getAccessExpFromJwtAsDate(token);

  if (!expireDate || expireDate > new Date()) {
    res.status(StatusCodes.OK).send(undefined);
    return;
  }

  const response = await refreshJwt(token, req, res);
  if (response.status === StatusCodes.UNAUTHORIZED) {
    // Log out user
    removeUserCookie(req, res);
    res.status(response.status).json({ data: { message: 'Invalid token' } });
    return;
  }

  res.status(response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR).send(undefined);
  return;
};
export const config = {
  api: {
    externalResolver: true,
  },
};
export default withSentry(refreshToken);

async function refreshJwt(token: IJwt, req: NextApiRequest, res: NextServerResponse) {
  try {
    const client = new ServerApiClient();
    const request: any = {
      headers: req.headers,
      body: { refreshToken: token.refreshToken },
      __allowAuthInServerSideRequest: true,
    };

    const response = await client.post('/users/login/refresh', request);

    if (!response.ok) {
      return response;
    }

    const data = (await response.data) as unknown as any;
    await updateUserCookie(data, request, res);
    return response;
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      ok: false,
      headers: {},
      isJson: false,
    };
  }
}
