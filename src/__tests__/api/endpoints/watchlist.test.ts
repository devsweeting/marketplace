import {
  addToWatchlist,
  checkForAssetOnWatchlist,
  hasBeenAddedWatchlist,
} from '@/api/endpoints/watchlist';
import { mockAssetResponse } from '@/__mocks__/mockAssetResponse';
import { StatusCodes } from 'http-status-codes';

const mockData = mockAssetResponse.items[0];
const mockPoductData = { id: mockData.id, name: mockData.name };

const globalFetch = global.fetch;

beforeEach(() => {
  jest.resetAllMocks();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      headers: new Headers({
        'content-type': 'application/json',
      }),
      ok: true,
      status: StatusCodes.CREATED,
      json: () => Promise.resolve({ test: 'test' }),
    }),
  ) as jest.Mock;
});

afterAll(() => {
  global.fetch = globalFetch;
});

describe('watchlist checkForAssetOnWatchList', () => {
  test('should return true if on watchlist', async () => {
    const mockFetch = (global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: true,
        status: StatusCodes.CREATED,
        json: () => Promise.resolve({ assetId: mockData.id, inWatchlist: true }),
      }),
    ) as jest.Mock);

    const res = await checkForAssetOnWatchlist(mockData.id);

    expect(res).toBeTruthy();
    expect(mockFetch).toBeCalledTimes(2);
  });

  test('should return false if not on watchlist', async () => {
    const mockFetch = (global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: true,
        status: StatusCodes.CREATED,
        json: () => Promise.resolve({ assetId: mockData.id, inWatchlist: false }),
      }),
    ) as jest.Mock);

    const res = await checkForAssetOnWatchlist(mockData.id);

    expect(res).toBeFalsy();
    expect(mockFetch).toBeCalledTimes(2);
  });
});

describe('watchlist addToWatchlist', () => {
  test('should return 201 on successful watchlist addition', async () => {
    const mockFetch = (global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: true,
        status: StatusCodes.CREATED,
        json: () => Promise.resolve({ test: 'test' }),
      }),
    ) as jest.Mock);

    const res = await addToWatchlist(mockPoductData);
    expect(res).toBe(StatusCodes.CREATED);
    expect(mockFetch).toBeCalledTimes(2);
  });
});

describe('watchlist removeFromWatchList', () => {
  test('should return 204 on successful watchlist removal', async () => {
    const mockFetch = (global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: true,
        status: StatusCodes.NO_CONTENT,
        json: () => Promise.resolve({ test: 'test' }),
      }),
    ) as jest.Mock);

    const res = await addToWatchlist(mockPoductData);
    expect(res).toBe(StatusCodes.NO_CONTENT);
    expect(mockFetch).toBeCalledTimes(2);
  });

  test('should return 404 if watchlist item is not found', async () => {
    const mockFetch = (global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: true,
        status: StatusCodes.NOT_FOUND,
        json: () => Promise.resolve({ test: 'test' }),
      }),
    ) as jest.Mock);

    const res = await addToWatchlist(mockPoductData);
    expect(res).toBe(StatusCodes.NOT_FOUND);
    expect(mockFetch).toBeCalledTimes(2);
  });
});

describe('watchlist hasBeenAddedWatchList', () => {
  test('should return true for status CREATED and CONFLICT', async () => {
    expect(hasBeenAddedWatchlist(StatusCodes.CREATED)).toBeTruthy();
    expect(hasBeenAddedWatchlist(StatusCodes.CONFLICT)).toBeTruthy();
    expect(hasBeenAddedWatchlist(StatusCodes.INTERNAL_SERVER_ERROR)).toBeFalsy();
    expect(hasBeenAddedWatchlist(StatusCodes.NOT_FOUND)).toBeFalsy();
    expect(hasBeenAddedWatchlist(StatusCodes.UNAUTHORIZED)).toBeFalsy();
  });
});
