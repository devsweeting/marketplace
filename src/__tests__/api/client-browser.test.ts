import { BrowserApiClient } from '@/api/client/apiClient.browser';
import { refreshUser } from '@/helpers/auth/UserContext';
import { StatusCodes } from 'http-status-codes';

jest.mock('@/helpers/auth/UserContext', () => ({
  getCurrentUser: jest.fn().mockReturnValue({
    id: 1,
    email: 'test@example.com',
    exp: new Date('3000-01-01T00:10:00.000Z'),
  }),
  refreshUser: jest.fn().mockReturnValue(Promise.resolve()),
}));

jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] });

describe('ApiClient browser', () => {
  const client = new BrowserApiClient();
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
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  test('it proxies request through next api route', async () => {
    jest.setSystemTime(new Date('3000-01-01T00:09:99.999Z'));

    await client.get('/test');

    expect(global.fetch).toHaveBeenCalledWith('/api/jump/test', {
      body: undefined,
      method: 'GET',
      headers: {},
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  test('it should only sends a refresh if the expire time is less than the current time', async () => {
    jest.setSystemTime(new Date('3000-01-01T00:10:00.000Z'));
    await client.get('/test');
    expect(global.fetch).toHaveBeenCalledWith('/api/jump/token/refresh', {
      body: undefined,
      method: 'GET',
      headers: {},
    });
    expect(refreshUser).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test('it should return unauthorized if refresh token returns unauthorized.', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        json: () => Promise.resolve({ test: 'test' }),
      }),
    ) as jest.Mock;

    jest.setSystemTime(new Date('3000-01-01T00:10:00.000Z'));
    const response = await client.get('/test');

    expect(global.fetch).toHaveBeenCalledWith('/api/jump/token/refresh', {
      body: undefined,
      method: 'GET',
      headers: {},
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
  });

  test('should return 500 error if response is undefined', async () => {
    jest.setSystemTime(new Date('2000-01-01T00:09:99.999Z'));

    global.fetch = jest.fn(() => Promise.resolve({ undefined })) as jest.Mock;
    const response = await client.get('/test');
    expect(global.fetch).toHaveBeenCalledWith('/api/jump/test', {
      body: undefined,
      method: 'GET',
      headers: {},
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(response.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
