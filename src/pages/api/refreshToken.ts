import { IApiRequest, IApiRequestWithBody } from '@/api/client/apiClient.base';
import { ServerApiClient } from '@/api/client/apiClient.server';
import { getAccessExpFromJwtAsDate } from '@/helpers/auth/getExpFrom';
import { getUserCookie } from '@/helpers/auth/userCookie';
import { IJwt } from '@/types/jwt';
import { NextServerResponse } from '@/types/next';
import { withSentry } from '@sentry/nextjs';
import { StatusCodes } from 'http-status-codes';

/**
 * Check if refresh token has expired.
 * This should NEVER be called outsied
 * @returns
 */
const refreshToken = async (req, res) => {
  console.log('check refresh token');

  if (!req || !res) {
    console.log('exit early');
    res.status(StatusCodes.CONTINUE);
    res.send(undefined);
    return;
  }

  const token = getUserCookie(req);

  if (!token || !token.accessToken) {
    res.status(StatusCodes.UNAUTHORIZED);
    res.send(undefined);
    return;
  }

  const expireDate = getAccessExpFromJwtAsDate(token);

  if (expireDate && expireDate <= new Date()) {
    console.log('token expired');
    const response = await refreshJwt(token, req, res);
    // if (
    //   response.status === StatusCodes.UNAUTHORIZED ||
    //   response.status === StatusCodes.UNPROCESSABLE_ENTITY
    // ) {
    //   response.status = StatusCodes.UNAUTHORIZED;
    //   response.data = { message: 'Invalid tokens' };
    //   removeUserCookie(request.req, res);
    //   return response;
    // }
    // res.status(StatusCodes.OK);
    res.status(response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR);
    res.send(undefined);
    return;
  }
  // res.status(StatusCodes.CONTINUE);
  res.send(undefined);
  return;
};
export const config = {
  api: {
    externalResolver: true,
  },
};
export default withSentry(refreshToken);

async function refreshJwt(
  token: IJwt,
  req: IApiRequest | IApiRequestWithBody,
  res: NextServerResponse,
) {
  try {
    const client = new ServerApiClient();
    const request = {
      headers: req.headers,
      body: { refreshToken: token.refreshToken },
    };

    const response = await client.send('/users/login/refresh', 'POST', request);
    console.log(response);
    if (!response.ok) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
