import {
  addToWatchlist,
  checkForAssetOnWatchlist,
  hasBeenAddedWatchlist,
} from '@/api/endpoints/watchlist';
import { mockAssetResponse } from '@/__mocks__/mockAssetResponse';
import { StatusCodes } from 'http-status-codes';
import { apiClient } from '@/api/client';
import { mockJsonResponse } from '@/__mocks__/mockApiResponse';

jest.mock('@/api/client');
const mockedClient = apiClient as jest.Mocked<typeof apiClient>;

const mockData = mockAssetResponse.items[0];
const mockProductData = { id: mockData.id, name: mockData.name };

beforeEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('watchlist checkForAssetOnWatchList', () => {
  test('should return true if on watchlist', async () => {
    mockedClient.get.mockResolvedValue(
      mockJsonResponse({ assetId: mockData.id, inWatchlist: true }),
    );

    const res = await checkForAssetOnWatchlist(mockData.id);

    expect(res).toBeTruthy();
    expect(mockedClient.get).toBeCalledTimes(1);
  });

  test('should return false if not on watchlist', async () => {
    mockedClient.get.mockResolvedValue(
      mockJsonResponse({ assetId: mockData.id, inWatchlist: false }),
    );

    const res = await checkForAssetOnWatchlist(mockData.id);

    expect(res).toBeFalsy();
    expect(mockedClient.get).toBeCalledTimes(1);
  });
});

describe('watchlist addToWatchlist', () => {
  test('should return 201 on successful watchlist addition', async () => {
    mockedClient.post.mockResolvedValue(mockJsonResponse({}, { status: StatusCodes.CREATED }));

    const res = await addToWatchlist(mockProductData);
    expect(res).toBe(StatusCodes.CREATED);
    expect(mockedClient.post).toBeCalledTimes(1);
  });
});

describe('watchlist removeFromWatchList', () => {
  test('should return 204 on successful watchlist removal', async () => {
    mockedClient.post.mockResolvedValue(mockJsonResponse({}, { status: StatusCodes.NO_CONTENT }));

    const res = await addToWatchlist(mockProductData);
    expect(res).toBe(StatusCodes.NO_CONTENT);
    expect(mockedClient.post).toBeCalledTimes(1);
  });

  test('should return 404 if watchlist item is not found', async () => {
    mockedClient.post.mockResolvedValue(mockJsonResponse({}, { status: StatusCodes.NOT_FOUND }));

    const res = await addToWatchlist(mockProductData);
    expect(res).toBe(StatusCodes.NOT_FOUND);
    expect(mockedClient.post).toBeCalledTimes(1);
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
