import AwaitLock from 'await-lock';
import type { IApiRequest, IApiRequestWithBody, IApiResponse, IApiUrl } from './baseApiClient';
import { BaseApiClient } from './baseApiClient';

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
    console.log(
      '\npath:',
      path,
      '\nmethod: ',
      method,
      '\nrequest: ',
      request.body ? 'defined' : 'undefined',
    );

    await lock.acquireAsync();
    try {
      console.log('close lock');

      const response = await super.send(path, method, request);
      return response;
    } finally {
      lock.release();
      console.log('open lock');
    }
  }
}
