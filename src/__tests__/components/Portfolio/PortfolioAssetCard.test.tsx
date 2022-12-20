import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { portfolioAssetCardData, watchlistAssetCardData } from '@/__mocks__/mockApiData';
import { PortfolioAssetCard } from '@/components/PortfolioPage/PortfolioAssetCard/PortfolioAssetCard';
import { themeJump } from '@/styles/themeJump';
import { StatusCodes } from 'http-status-codes';
import { apiClient } from '@/api/client';
import { UserContext } from '@/helpers/auth/UserContext';
import type { IAsset, IUser } from '@/types';
import { mockJsonResponse } from '@/__mocks__/mockApiResponse';
import { TestRouter } from '../../utils/TestRouter';
import user from '@testing-library/user-event';

jest.mock('@/api/client');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

const handleClick = jest.fn();
const closeDrawer = jest.fn();

const mockUser = {
  id: 'asdf',
  email: 'example@example.com',
  exp: new Date('3000-01-01T00:10:00.000Z'),
};

const push = jest.fn();

const MockPortfolioAssetCard = ({
  assetData,
  user,
}: {
  assetData: IPortfolioAsset;
  user: IUser | undefined;
}) => {
  return (
    <TestRouter router={{ push, asPath: '/account' }}>
      <ThemeProvider theme={themeJump}>
        <UserContext.Provider value={{ user, refreshUser: jest.fn(), logout: jest.fn() }}>
          <PortfolioAssetCard
            onClick={handleClick}
            assetData={assetData}
            closeDrawer={closeDrawer}
          />
        </UserContext.Provider>
      </ThemeProvider>
    </TestRouter>
  );
};

describe('Portfolio Stats', () => {
  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));

  beforeEach(() => {
    jest.resetAllMocks();
    mockApiClient.get.mockResolvedValue(mockJsonResponse());
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should display card data', async () => {
    render(<MockPortfolioAssetCard assetData={portfolioAssetCardData} user={mockUser} />);
    const title = await screen.findByText(portfolioAssetCardData.name);
    const priceTitle = await screen.findByText(/Unit price paid/i, { exact: false });
    const valuationTitle = await screen.findByText('Valuation');
    const image = await screen.findByRole('img');

    expect(title).toBeInTheDocument();
    expect(valuationTitle).toBeInTheDocument();
    expect(priceTitle).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test('should be clickable', async () => {
    render(<MockPortfolioAssetCard assetData={portfolioAssetCardData} user={mockUser} />);
    await user.click(await screen.findByText(portfolioAssetCardData.name));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should be tab-able', async () => {
    render(<MockPortfolioAssetCard assetData={portfolioAssetCardData} user={mockUser} />);
    await user.tab();
    await user.keyboard('{enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should allow user to remove item from watchlist ', async () => {
    mockApiClient.delete.mockResolvedValue(mockJsonResponse({}, { status: StatusCodes.OK }));
    render(<MockPortfolioAssetCard assetData={watchlistAssetCardData} user={mockUser} />);

    const removeFromWatchListBtn = await screen.findByRole('button', {
      name: /remove from watchlist/i,
    });
    expect(removeFromWatchListBtn).toBeInTheDocument();
    await user.click(removeFromWatchListBtn);
    expect(mockApiClient.delete).toBeCalledTimes(1);
  });
});
