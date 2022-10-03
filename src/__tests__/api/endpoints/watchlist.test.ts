import { addToWatchlist, isAssetOnWatchlist, removeFromWatchlist } from '@/api/endpoints/watchlist';
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

    const res = await isAssetOnWatchlist(mockData.id);

    expect(res).toBeTruthy();
    expect(mockedClient.get).toBeCalledTimes(1);
  });

  test('should return false if not on watchlist', async () => {
    mockedClient.get.mockResolvedValue(
      mockJsonResponse({ assetId: mockData.id, inWatchlist: false }),
    );

    const res = await isAssetOnWatchlist(mockData.id);

    expect(res).toBeFalsy();
    expect(mockedClient.get).toBeCalledTimes(1);
  });
});

describe('watchlist addToWatchlist', () => {
  test('should return true on successful watchlist addition', async () => {
    mockedClient.post.mockResolvedValue(mockJsonResponse({}, { status: StatusCodes.CREATED }));

    const res = await addToWatchlist(mockProductData);
    expect(res.success).toBe(true);
    expect(mockedClient.post).toBeCalledTimes(1);
  });
});

describe('watchlist removeFromWatchList', () => {
  test('should return true on successful watchlist removal', async () => {
    mockedClient.delete.mockResolvedValue(mockJsonResponse({}, { status: StatusCodes.OK }));

    const res = await removeFromWatchlist(mockProductData);
    expect(res.success).toBe(true);
    expect(mockedClient.delete).toBeCalledTimes(1);
  });

  test('should return false if watchlist item is not found', async () => {
    mockedClient.post.mockResolvedValue(mockJsonResponse({}, { status: StatusCodes.NOT_FOUND }));

    const res = await addToWatchlist(mockProductData);
    expect(res.success).toBeFalsy;
    expect(mockedClient.post).toBeCalledTimes(1);
  });
});
