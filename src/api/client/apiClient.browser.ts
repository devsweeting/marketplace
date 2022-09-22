import AwaitLock from 'await-lock';
import { StatusCodes } from 'http-status-codes';
import type { IApiRequest, IApiRequestWithBody, IApiResponse, IApiUrl } from './apiClient.base';
import { BaseApiClient } from './apiClient.base';

export class BrowserApiClient extends BaseApiClient {
  getBaseUrl() {
    return '/api/jump';
  }

  async send(
    path: IApiUrl,
    method: string,
    request: IApiRequest | IApiRequestWithBody,
  ): Promise<IApiResponse> {
    const lock = new AwaitLock();
    console.log(new Date().getTime(), 'Browser API call');
    console.log('\npath:', path, '\nmethod: ', method);
    let response;
    await lock.acquireAsync();
    try {
      console.log('close lock');
      const refreshResponse = await fetch('/api/refreshToken', {});
      console.log('refresh Response', refreshResponse);
      response = await super.send(path, method, request);
    } finally {
      lock.release();
      console.log('open lock');
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

  private async _checkRefreshToken() {
    const response = await fetch('/api/refreshToken', {});
    return response;
  }
}
