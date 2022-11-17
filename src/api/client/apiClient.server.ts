import { StatusCodes } from 'http-status-codes';
import { getUserFromJwt } from '@/helpers/auth/getUserFrom';
import { getUserCookie } from '@/helpers/auth/userCookie';
import { getIpAddress } from '@/helpers/getIpAddress';
import { logger } from '@/helpers/logger';
import { formatDate, getTimezoneOffset } from '@/helpers/time';
import type { IApiRequest, IApiRequestWithBody, IApiResponse, IApiUrl } from './apiClient.base';
import { BaseApiClient } from './apiClient.base';

export interface IServerApiRequest extends IApiRequest {
  // This flag is to prevent accidental use of the ServerApiClient. ServerApiClient
  // doesn't handle token refresh, only the BrowserApiClient does so all requests
  // should go through BrowserApiClient. There are a few exception to this rule
  // and those use this flag. Be very careful about adding this flag elsewhere
  // since you might introduce a subtle token refresh bug
  __allowAuthInServerSideRequest?: boolean;
}

export interface IServerApiRequestWithBody extends IServerApiRequest, IApiRequestWithBody {}

export class MissingNextRequestError extends Error {}

export class AuthenticatedServerRequestError extends Error {}

export class ServerApiClient extends BaseApiClient {
  getBaseUrl() {
    return process.env.NEXT_PUBLIC_BACKEND_URL ?? '';
  }

  disallowHeader = ['host'];

  get(url: IApiUrl, request: IServerApiRequest = {}) {
    return this.send(url, 'GET', request);
  }

  post(url: IApiUrl, request: IServerApiRequestWithBody) {
    return this.send(url, 'POST', request);
  }

  put(url: IApiUrl, request: IServerApiRequestWithBody) {
    return this.send(url, 'PUT', request);
  }

  patch(url: IApiUrl, request: IServerApiRequestWithBody) {
    return this.send(url, 'PATCH', request);
  }

  delete(url: IApiUrl, request: IServerApiRequest = {}) {
    return this.send(url, 'DELETE', request);
  }

  async send(
    path: IApiUrl,
    method: string,
    {
      __allowAuthInServerSideRequest = false,
      ...request
    }: IServerApiRequest | IServerApiRequestWithBody,
  ): Promise<IApiResponse> {
    let token;
    let authUser = '-';
    let host: string | undefined = '-';
    let returnedByteSize: string;
    const time = formatDate(new Date());
    const timeZone = getTimezoneOffset();
    if (!request.headers) {
      request.headers = {};
    }

    if ('req' in request && request.req) {
      if (!__allowAuthInServerSideRequest) {
        throw new AuthenticatedServerRequestError(
          'ServerApiClient cannot handle authenticated requests.' +
            'Please use BrowserApiClient instead',
        );
      }
      token = getUserCookie(request.req);
      host = getIpAddress(request.req);

      if (request.headers['content-length']) {
        returnedByteSize = request.headers['content-length'];
      }
      if (token && token.accessToken) {
        request.headers['Authorization'] = `Bearer ${token.accessToken}`;
        authUser = getUserFromJwt(token)?.email ?? '-';
      }
    }

    const onSuccess = (response: Response) => {
      logger.info(
        `${host ?? '-'} ${authUser ?? '-'} [${time} ${timeZone}] ${method} ${response.url} ${
          response.status
        } ${returnedByteSize ?? '-'}`,
      );
    };

    const onError = (response: Response) => {
      logger.error(
        `${host ?? '-'} ${authUser ?? '-'} [${time} ${timeZone}]  ${method} ${response.url} ${
          response.status
        } ${response.statusText} ${returnedByteSize ?? '-'}`,
      );
    };

    const onCatch = (url: string, error: unknown) => {
      logger.error(`${method} ${url} ${error}`);
    };

    const response = await super.send(path, method, request, { onError, onSuccess, onCatch });

    if (response.status === StatusCodes.UNAUTHORIZED && !request.req) {
      throw new MissingNextRequestError(
        'Got a 401 unauthorized error in ServerApiClient.' +
          'Did you forget to pass in the Next.js request object?',
      );
    }

    return response;
  }
}
