import { AssetCard } from '@/components/AssetCard';
import { themeJump } from '@/styles/themeJump';
import { ThemeProvider } from '@mui/styles';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import { mockAssetResponse, mockAssetSoldOut } from '@/__mocks__/mockAssetResponse';
import type { IAsset } from '@/types/assetTypes';
import type { IUser } from '@/types/user';
import { apiClient } from '@/api/client';
import { UserContext } from '@/helpers/auth/UserContext';
import {
  addToWatchlist,
  addWatchlistToLocalStorage,
  isAssetOnWatchlist,
  removeFromWatchlist,
  removeWatchlistFromLocalStorage,
} from '@/api/endpoints/watchlist';
import { mockJsonResponse } from '@/__mocks__/mockApiResponse';

jest.mock('@/api/client');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;
jest.mock('@/api/endpoints/watchlist');
const mockAddToWatchlist = addToWatchlist as jest.MockedFn<typeof addToWatchlist>;
const mockIsAssetOnWatchlist = isAssetOnWatchlist as jest.MockedFn<typeof isAssetOnWatchlist>;
const mockRemoveFromWatchlist = removeFromWatchlist as jest.MockedFn<typeof removeFromWatchlist>;
const mockAddWatchlistToLocalStorage = addWatchlistToLocalStorage as jest.MockedFn<
  typeof addWatchlistToLocalStorage
>;
const mockRemoveWatchlistFromLocalStorage = removeWatchlistFromLocalStorage as jest.MockedFn<
  typeof removeWatchlistFromLocalStorage
>;

const handleClick = jest.fn();

const mockData = mockAssetResponse.items[0];
const mockUser = {
  id: 'asdf',
  email: 'example@example.com',
  exp: new Date('3000-01-01T00:10:00.000Z'),
};
const MockAssetCard = ({ asset, user }: { asset: IAsset; user: IUser | undefined }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <UserContext.Provider value={{ user, refreshUser: jest.fn(), logout: jest.fn() }}>
        <AssetCard onClick={handleClick} assetData={asset} />
      </UserContext.Provider>
    </ThemeProvider>
  );
};

describe('Asset Card', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockApiClient.get.mockResolvedValue(mockJsonResponse());
    mockIsAssetOnWatchlist.mockResolvedValue(true);
    mockAddToWatchlist.mockResolvedValue({ success: true });
    mockRemoveFromWatchlist.mockResolvedValue({ success: true });
    mockAddWatchlistToLocalStorage.mockResolvedValue({ success: true });
    mockRemoveWatchlistFromLocalStorage.mockResolvedValue({ success: true });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should display card data', async () => {
    render(<MockAssetCard asset={mockData} user={mockUser} />);
    const title = await screen.findByText(mockData.name);
    const price = await screen.findByText(/price/i, { exact: false });
    const valuation = await screen.findByText(/valuation/i, { exact: false });
    const image = await screen.findByRole('img');

    expect(title).toBeInTheDocument();
    expect(valuation).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test('should be clickable', async () => {
    render(<MockAssetCard asset={mockData} user={mockUser} />);
    await user.click(await screen.findByText(mockData.name));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should be tab-able', async () => {
    render(<MockAssetCard asset={mockData} user={mockUser} />);
    await user.tab();
    await user.keyboard('{enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should display sold out when no sellOrders available', async () => {
    const { rerender } = render(<MockAssetCard asset={mockData} user={null as unknown as IUser} />);
    const notSoldOut = screen.queryByText(/sold out/i);
    expect(notSoldOut).toBeNull();
    rerender(<MockAssetCard asset={mockAssetSoldOut} user={null as unknown as IUser} />);
    await act(() => Promise.resolve());
    const soldOut = await screen.findByText(/sold out/i);
    expect(soldOut).toBeInTheDocument();
  });

  test('should allow non auth user to add and remove item from watchlist ', async () => {
    render(<MockAssetCard asset={mockData} user={undefined} />);

    const addToWatchListBtn = await screen.findByRole('button', { name: /add to watchlist/i });
    expect(addToWatchListBtn).toBeInTheDocument();
    await user.click(addToWatchListBtn);
    expect(mockAddWatchlistToLocalStorage).toHaveBeenCalledTimes(1);
    const removeFromWatchListBtn = await screen.findByRole('button', {
      name: /remove from watchlist/i,
    });
    expect(removeFromWatchListBtn).toBeInTheDocument();
    await user.click(removeFromWatchListBtn);

    const addToWatchListBtn2 = await screen.findByRole('button', { name: /add to watchlist/i });
    expect(addToWatchListBtn2).toBeInTheDocument();
    expect(mockAddWatchlistToLocalStorage).toHaveBeenCalledTimes(1);
    expect(mockRemoveWatchlistFromLocalStorage).toHaveBeenCalledTimes(1);
    expect(mockAddToWatchlist).toHaveBeenCalledTimes(0);
  });

  test('should allow auth user to add and remove items', async () => {
    mockIsAssetOnWatchlist.mockResolvedValue(false);
    render(<MockAssetCard asset={mockData} user={mockUser} />);
    const addToWatchListBtn = await screen.findByRole('button', { name: /add to watchlist/i });
    expect(addToWatchListBtn).toBeInTheDocument();
    await user.click(addToWatchListBtn);
    expect(mockAddToWatchlist).toHaveBeenCalledTimes(1);
    expect(mockIsAssetOnWatchlist).toHaveBeenCalledTimes(1);
    const removeFromWatchListBtn = await screen.findByRole('button', {
      name: /remove from watchlist/i,
    });
    expect(removeFromWatchListBtn).toBeInTheDocument();
    await user.click(removeFromWatchListBtn);

    const addToWatchListBtn2 = await screen.findByRole('button', { name: /add to watchlist/i });
    expect(addToWatchListBtn2).toBeInTheDocument();
    expect(mockAddToWatchlist).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromWatchlist).toHaveBeenCalledTimes(1);
  });
});
