import { testApiHandler } from 'next-test-api-route-handler';
import { jumpApiProxy } from '@/pages/api/jump/[...params]';
import { StatusCodes } from 'http-status-codes';
import { apiClient } from '@/api/client';
import type { IApiResponse } from '@/api/client/apiClient.base';
jest.mock('@/api/client');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

beforeEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('api/jump/[..params]', () => {
  test('should return unsupported method from incorrect method', async () => {
    await testApiHandler({
      handler: jumpApiProxy,
      url: '/api/jump/test',
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'HEAD' });
        await expect(res.status).toStrictEqual(StatusCodes.METHOD_NOT_ALLOWED);
      },
    });
  });

  test('should return unsupported method from incorrect url', async () => {
    await testApiHandler({
      handler: jumpApiProxy,
      url: 'test',
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        await expect(res.status).toStrictEqual(StatusCodes.METHOD_NOT_ALLOWED);
      },
    });
  });

  test('Should correctly handle a json response', async () => {
    mockApiClient.get.mockResolvedValueOnce({
      data: 'test',
      isJson: true,
      status: 200,
    } as unknown as IApiResponse);

    await testApiHandler({
      rejectOnHandlerError: true,
      handler: jumpApiProxy,
      url: '/api/jump/test',
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        await expect(res.status).toStrictEqual(StatusCodes.OK);
      },
    });
  });

  test('should correctly handle a non-json response', async () => {
    mockApiClient.get.mockResolvedValueOnce({
      status: 200,
    } as unknown as IApiResponse);
    await testApiHandler({
      rejectOnHandlerError: true,
      handler: jumpApiProxy,
      url: '/api/jump/test',
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        await expect(res.status).toStrictEqual(StatusCodes.OK);
      },
    });
  });

  test('should remove host from header', async () => {
    mockApiClient.get.mockResolvedValueOnce({
      status: 200,
    } as unknown as IApiResponse);
    await testApiHandler({
      rejectOnHandlerError: true,
      handler: jumpApiProxy,
      url: '/api/jump/test',
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET', header: { head: 'test' } });
        await expect(res.head).toStrictEqual(undefined);
      },
    });
  });

  test('should correctly handle content type application/json', async () => {
    test.todo;
  });

  test('should correctly handle content type application/x-www-form-urlencoded', async () => {
    test.todo;
  });
});
