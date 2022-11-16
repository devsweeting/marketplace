import { getUserFromJwt } from '@/helpers/auth/getUserFrom';
import { getUserCookie } from '@/helpers/auth/userCookie';
import { getIpAddress } from '@/helpers/getIpAddress';
import { logger } from '@/helpers/logger';
import { formatDate, getTimezoneOffset } from '@/helpers/time';
import type { IApiRequest, IApiRequestWithBody, IApiResponse, IApiUrl } from './apiClient.base';
import { BaseApiClient } from './apiClient.base';

export interface IServerApiRequest extends IApiRequest {
  // Required to be set to true in order to be called from an API route
  // This is not intended to be used in get server side props
  useAuthInApiRoute?: boolean;
}

export interface IServerApiRequestWithBody extends IServerApiRequest, IApiRequestWithBody {}

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
    { useAuthInApiRoute = false, ...request }: IServerApiRequest | IServerApiRequestWithBody,
  ): Promise<IApiResponse> {
    if (!useAuthInApiRoute) {
      throw new Error(
        'Cannot use api client on the server side with auth.' +
          'Please use the api client in the browser instead',
      );
    }

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
    return response;
  }
}
