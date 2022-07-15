import { ApiClient } from '@/api/client';
import { Headers } from 'next/dist/server/web/spec-compliant/headers';
import { StatusCodes } from 'http-status-codes';

describe('ApiClient browser', () => {
  const client = new ApiClient();
  const globalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: true,
        status: StatusCodes.OK,
        json: () => Promise.resolve({ test: 'test' }),
      }),
    ) as jest.Mock;
  });

  afterAll(() => {
    global.fetch = globalFetch;
  });

  test('it proxies request through next api route', async () => {
    await client.get('/test');

    expect(global.fetch).toHaveBeenCalledWith('/api/jump/test', {
      body: undefined,
      method: 'GET',
      headers: {},
    });
  });
});
