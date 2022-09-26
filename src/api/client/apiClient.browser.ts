import AwaitLock from 'await-lock';
import { StatusCodes } from 'http-status-codes';
import Router from 'next/router';
import type { IApiRequest, IApiRequestWithBody, IApiResponse, IApiUrl } from './apiClient.base';
import { BaseApiClient } from './apiClient.base';

export class BrowserApiClient extends BaseApiClient {
  getBaseUrl() {
    return '/api/jump';
  }
  private _lock = new AwaitLock();

  async send(
    path: IApiUrl,
    method: string,
    request: IApiRequest | IApiRequestWithBody,
  ): Promise<IApiResponse> {
    let response;
    await this._lock.acquireAsync();
    try {
      response = await super.send('/refreshToken', 'GET', {});
    } finally {
      this._lock.release();
    }

    if (response.status !== StatusCodes.UNAUTHORIZED) {
      response = await super.send(path, method, request);
    }

    if (response.status >= StatusCodes.MOVED_TEMPORARILY) {
      const data = response.data as unknown as any;
      await Router.push(response.headers.Location ?? data.destination ?? '/');
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
