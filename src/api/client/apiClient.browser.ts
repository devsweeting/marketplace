import { getCurrentUser, refreshUser } from '@/helpers/auth/UserContext';
import AwaitLock from 'await-lock';
import { StatusCodes } from 'http-status-codes';
import type { IApiRequest, IApiRequestWithBody, IApiResponse, IApiUrl } from './apiClient.base';
import { BaseApiClient } from './apiClient.base';

export interface IBrowserApiRequest extends IApiRequest {
  requireAuth?: boolean;
}

export interface IBrowserApiRequestWithBody extends IBrowserApiRequest, IApiRequestWithBody {}

export class BrowserApiClient extends BaseApiClient {
  private _TEN_SECONDS = 10000;
  getBaseUrl() {
    return '/api/jump';
  }
  getHeaderFilters(): string[] {
    return ['host'];
  }
  private _lock = new AwaitLock();

  get(url: IApiUrl, request: IBrowserApiRequest = {}) {
    return this.send(url, 'GET', request);
  }

  post(url: IApiUrl, request: IBrowserApiRequestWithBody) {
    return this.send(url, 'POST', request);
  }

  put(url: IApiUrl, request: IBrowserApiRequestWithBody) {
    return this.send(url, 'PUT', request);
  }

  patch(url: IApiUrl, request: IBrowserApiRequestWithBody) {
    return this.send(url, 'PATCH', request);
  }

  delete(url: IApiUrl, request: IBrowserApiRequest = {}) {
    return this.send(url, 'DELETE', request);
  }

  async send(
    path: IApiUrl,
    method: string,
    { requireAuth = true, ...request }: IBrowserApiRequest | IBrowserApiRequestWithBody = {},
  ): Promise<IApiResponse> {
    let response;

    if (requireAuth) {
      await this._lock.acquireAsync();
      try {
        const user = await getCurrentUser();
        if (!user) {
          throw new Error(
            'Attempting to fetch an endpoint that requires auth with no current user. ' +
              'Consider adding a user check to the code that triggers this fetch.',
          );
        }

        //Check if the token is going to expire in ten seconds
        if (user.exp && user.exp.getTime() - this._TEN_SECONDS < new Date().getTime()) {
          response = await super.send('/token/refresh', 'GET', {});
          await refreshUser();
        }
      } finally {
        this._lock.release();
      }
    }

    if (!response || response.status !== StatusCodes.UNAUTHORIZED) {
      response = await super.send(path, method, request);
    }

    if (!response) {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        ok: false,
        headers: {},
        isJson: false,
      };
    }
    return response;
  }
}
