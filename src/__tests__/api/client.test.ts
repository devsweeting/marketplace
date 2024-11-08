/**
 * @jest-environment node
 */
import { StatusCodes } from 'http-status-codes';
import { getUserCookie } from '@/helpers/auth/userCookie';
import type { NextServerRequest } from '@/types';
import { logger } from '@/helpers/logger';
import {
  AuthenticatedServerRequestError,
  MissingNextRequestError,
  ServerApiClient,
} from '@/api/client/apiClient.server';
import { Headers } from 'node-fetch';

jest.mock('@/helpers/auth/userCookie');
jest.mock('@/helpers/logger');

const mockGetUserCookie = getUserCookie as unknown as jest.MockedFn<typeof getUserCookie>;
const mockLogger = logger as unknown as jest.Mocked<typeof logger>;

describe('ApiClient', () => {
  const client = new ServerApiClient();
  const globalFetch = global.fetch;

  beforeEach(() => {
    jest.resetAllMocks();

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

  test('it makes get, post, put, patch, and delete requests', async () => {
    const expectedUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/test`;

    await client.get('/test');

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      body: undefined,
      method: 'GET',
      headers: {},
    });

    await client.post('/test', { body: { test: 'test' } });

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      body: JSON.stringify({ test: 'test' }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await client.put('/test', { body: { test: 'test' } });

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      body: JSON.stringify({ test: 'test' }),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await client.patch('/test', { body: { test: 'test' } });

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      body: JSON.stringify({ test: 'test' }),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await client.delete('/test');

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      body: undefined,
      method: 'DELETE',
      headers: {},
    });
  });

  test('it sends form url encoded data', async () => {
    const expectedUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/test`;

    const urlSearchParams = new URLSearchParams({
      test: 'test',
    });

    await client.post('/test', {
      body: urlSearchParams,
    });

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      body: urlSearchParams.toString(),
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  });

  test('it handles custom headers', async () => {
    await client.get('/test', {
      headers: {
        'X-Custom-Header': 'test',
      },
    });

    expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`, {
      body: undefined,
      method: 'GET',
      headers: {
        'X-Custom-Header': 'test',
      },
    });
  });

  test('should remove host header', async () => {
    await client.get('/test', {
      headers: {
        host: 'test',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test`, {
      body: undefined,
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  });

  test('it handles return data as text or json', async () => {
    const jsonRes = await client.get('/test');

    expect(jsonRes.ok).toBe(true);
    expect(jsonRes.status).toBe(StatusCodes.OK);
    expect(jsonRes.isJson).toBe(true);
    expect(jsonRes.data).toStrictEqual({ test: 'test' });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: StatusCodes.OK,
        headers: new Headers({
          'content-type': 'text/plain',
        }),
        text: () => Promise.resolve('some text'),
      }),
    ) as jest.Mock;

    const textRes = await client.get('/test');

    expect(textRes.ok).toBe(true);
    expect(textRes.status).toBe(StatusCodes.OK);
    expect(textRes.isJson).toBe(false);
    expect(textRes.data).toBe('some text');
  });

  test('it attaches jwt if available', async () => {
    const expectedUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/test`;
    const mockValidJwt = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJJZCI6MTMzNywiaWQiOjEzMzcsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY1NTc2MDc2NCwiZXhwIjoxNjU1ODY4NzY0fQ.sbsnnXF4pygn92GeJ5FMmQjy4HHEFkWZGdldjSxvdQ0',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJJZCI6MTMzNywiaWQiOjEzMzcsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY1NTc2MDc2NCwiZXhwIjoxNjU1ODY4NzY0fQ.sbsnnXF4pygn92GeJ5FMmQjy4HHEFkWZGdldjSxvdQ0',
    };

    const mockRequest = {} as NextServerRequest;

    await client.post('/test', {
      req: mockRequest,
      body: { test: 'test' },
      __allowAuthInServerSideRequest: true,
    });

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      body: JSON.stringify({ test: 'test' }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    mockGetUserCookie.mockReturnValue(mockValidJwt);

    await client.post('/test', {
      req: mockRequest,
      body: { test: 'test' },
      __allowAuthInServerSideRequest: true,
    });
    expect(global.fetch).toHaveBeenNthCalledWith(1, expectedUrl, {
      body: JSON.stringify({ test: 'test' }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(global.fetch).toHaveBeenNthCalledWith(2, expectedUrl, {
      body: JSON.stringify({ test: 'test' }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockValidJwt.accessToken}`,
      },
    });
  });

  test('it turns runtime errors into invalid response and logs the failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: true,
        status: StatusCodes.OK,
        json: async () => JSON.parse('{]'),
      }),
    ) as jest.Mock;

    const res = await client.get('/test');

    expect(mockLogger.error).toHaveBeenCalledTimes(1);

    expect(res.ok).toBe(false);
    expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.isJson).toBe(false);
  });

  test('it properly logs requests', async () => {
    await client.get('/test');

    expect(mockLogger.info).toHaveBeenCalledTimes(1);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        headers: new Headers(),
        text: () => Promise.resolve('some text'),
      }),
    ) as jest.Mock;

    await client.get('/test');

    expect(mockLogger.error).toHaveBeenCalledTimes(1);
  });

  test('it throws if authed request is missing flag', async () => {
    const mockRequest = {} as NextServerRequest;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        headers: new Headers(),
        text: () => Promise.resolve('some text'),
      }),
    ) as jest.Mock;

    await expect(() => client.get('/test', { req: mockRequest })).rejects.toThrow(
      AuthenticatedServerRequestError,
    );
  });

  test('it throws if 401 error and no request object', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: StatusCodes.UNAUTHORIZED,
        headers: new Headers(),
        text: () => Promise.resolve('some text'),
      }),
    ) as jest.Mock;

    await expect(() => client.get('/test')).rejects.toThrow(MissingNextRequestError);
  });
});
