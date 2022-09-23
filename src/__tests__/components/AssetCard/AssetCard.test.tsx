import { AssetCard } from '@/components/AssetCard';
import { themeJump } from '@/styles/themeJump';
import { ThemeProvider } from '@mui/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import { mockAssetResponse, mockAssetSoldOut } from '@/__mocks__/mockAssetResponse';
import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';
import type { IAsset } from '@/types/assetTypes';
import { UserContext } from '@/helpers/auth/UserContext';
import type { IUser } from '@/types/user';
import { StatusCodes } from 'http-status-codes';
const handleClick = jest.fn();
const mockUserContextFunctions = jest.fn();

const mockData = mockAssetResponse.items[0];
const mockUser = { id: 'asdf', email: 'example@example.com' };
const details = parseAssetAttributes(mockData.attributes);
const MockAssetCard = ({ asset, user }: { asset: IAsset; user: IUser }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <UserContext.Provider
        value={{
          user: user,
          refreshUser: mockUserContextFunctions,
          logout: mockUserContextFunctions,
        }}
      >
        <AssetCard onClick={handleClick} assetData={asset} />
      </UserContext.Provider>
    </ThemeProvider>
  );
};

describe('Asset Card', () => {
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

  test('should display card data', () => {
    render(<MockAssetCard asset={mockData} user={mockUser} />);
    const title = screen.getByText(mockData.name);
    const year = screen.getByText(`${details.year}`, { exact: false });
    const price = screen.getByText(/price/i, { exact: false });
    const valuation = screen.getByText(/valuation/i, { exact: false });
    const image = screen.getByRole('img');

    expect(title).toBeInTheDocument();
    expect(year).toBeInTheDocument();
    expect(valuation).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test('should be clickable', async () => {
    render(<MockAssetCard asset={mockData} user={mockUser} />);
    await user.click(screen.getByText(mockData.name));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should be tab-able', async () => {
    render(<MockAssetCard asset={mockData} user={mockUser} />);
    await user.tab();
    await user.keyboard('{enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should display sold out when no sellOrders available', () => {
    const { rerender } = render(<MockAssetCard asset={mockData} user={null as unknown as IUser} />);
    const notSoldOut = screen.queryByText(/sold out/i);
    expect(notSoldOut).toBeNull();
    rerender(<MockAssetCard asset={mockAssetSoldOut} user={null as unknown as IUser} />);
    const soldOut = screen.getByText(/sold out/i);
    expect(soldOut).toBeInTheDocument();
  });

  test('should allow non auth user to add and remove item from watchlist ', async () => {
    render(<MockAssetCard asset={mockData} user={null as unknown as IUser} />);

    const addToWatchListBtn = screen.getByRole('button', { name: /add to watchlist/i });
    expect(addToWatchListBtn).toBeInTheDocument();
    await user.click(addToWatchListBtn);
    const removeFromWatchListBtn = screen.getByRole('button', { name: /remove from watchlist/i });
    expect(removeFromWatchListBtn).toBeInTheDocument();
    await user.click(removeFromWatchListBtn);

    const addToWatchListBtn2 = screen.getByRole('button', { name: /add to watchlist/i });
    expect(addToWatchListBtn2).toBeInTheDocument();
    expect(global.fetch).toBeCalledTimes(0);
  });

  test('should allow auth user to add and remove items', async () => {
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
    render(<MockAssetCard asset={mockData} user={mockUser} />);

    const addToWatchListBtn = screen.getByRole('button', { name: /add to watchlist/i });
    expect(addToWatchListBtn).toBeInTheDocument();
    await user.click(addToWatchListBtn);
    expect(mockFetch).toBeCalledTimes(4);

    const removeFromWatchListBtn = await screen.findByRole('button', {
      name: /remove from watchlist/i,
    });
    expect(removeFromWatchListBtn).toBeInTheDocument();
    await user.click(removeFromWatchListBtn);

    const addToWatchListBtn2 = await screen.findByRole('button', { name: /add to watchlist/i });
    expect(addToWatchListBtn2).toBeInTheDocument();
    expect(mockFetch).toBeCalledTimes(6);
  });
});
