/**
 * @jest-environment node
 */
import { ApiClient } from '@/api/client';
import { StatusCodes } from 'http-status-codes';
import { Headers } from 'next/dist/server/web/spec-compliant/headers';
import { getUserCookie } from '@/helpers/auth/userCookie';
import type { NextServerRequest } from '@/types/next';

jest.mock('@/helpers/auth/userCookie');

const mockGetUserCookie = getUserCookie as unknown as jest.MockedFn<typeof getUserCookie>;

describe('ApiClient', () => {
  const client = new ApiClient();
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
    const mockValidJwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJJZCI6MTMzNywiaWF0IjoxNjU1NzYwNzY0LCJleHAiOjE2NTU4Njg3NjR9.jT_lLXBBTqaAOaSesfsASQNhYuBwY2osw8aYAMT2khs';

    const mockRequest = {} as NextServerRequest;

    mockGetUserCookie.mockReturnValue(mockValidJwt);

    await client.post('/test', { req: mockRequest, body: { test: 'test' } });

    const expectedUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/test`;

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl, {
      body: JSON.stringify({ test: 'test' }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockValidJwt}`,
      },
    });
  });

  test('it turns runtime errors into invalid response', async () => {
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

    expect(res.ok).toBe(false);
    expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.isJson).toBe(false);
  });
});
