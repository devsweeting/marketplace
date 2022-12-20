import { AssetCard } from '@/components/AssetCard';
import { themeJump } from '@/styles/themeJump';
import { ThemeProvider } from '@mui/styles';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import { mockAssetResponse, mockAssetSoldOut } from '@/__mocks__/mockAssetResponse';
import type { IAsset, IUser } from '@/types';
import { apiClient } from '@/api/client';
import { UserContext } from '@/helpers/auth/UserContext';
import { mockJsonResponse } from '@/__mocks__/mockApiResponse';
import { ModalContextProvider } from '@/helpers/auth/ModalContext';

jest.mock('@/api/client');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;
jest.mock('@/api/endpoints/watchlist');
const mockAdd = jest.fn();
const mockRemove = jest.fn();

const handleClick = jest.fn();

const mockData = mockAssetResponse.items[0];
const mockUser = {
  id: 'asdf',
  email: 'example@example.com',
  exp: new Date('3000-01-01T00:10:00.000Z'),
};
const MockAssetCard = ({
  asset,
  user,
  watched = false,
}: {
  asset: IAsset;
  user: IUser | undefined;
  watched?: boolean;
}) => {
  return (
    <ThemeProvider theme={themeJump}>
      <UserContext.Provider value={{ user, refreshUser: jest.fn(), logout: jest.fn() }}>
        <ModalContextProvider>
          <AssetCard
            onClick={handleClick}
            assetData={asset}
            watched={watched}
            watchlistAdd={mockAdd}
            watchlistRemove={mockRemove}
          />
        </ModalContextProvider>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

describe('Asset Card', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockApiClient.get.mockResolvedValue(mockJsonResponse());
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

  describe('Watchlist actions', () => {
    test('can add an item to watchlist', async () => {
      render(<MockAssetCard asset={mockData} user={mockUser} />);

      const button = await screen.findByRole('button', { name: /add to watchlist/i });

      expect(button).toBeInTheDocument();

      await user.click(button);

      expect(mockAdd).toBeCalled();
    });

    test('can remove an item from watchlist', async () => {
      render(<MockAssetCard asset={mockData} user={mockUser} watched={true} />);

      const button = await screen.findByRole('button', { name: /remove from watchlist/i });

      expect(button).toBeInTheDocument();

      await user.click(button);

      expect(mockRemove).toBeCalled();
    });
  });
});
