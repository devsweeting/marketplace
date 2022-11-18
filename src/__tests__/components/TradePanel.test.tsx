import { TradePanel } from '@/components/TradePanel';
import { themeJump } from '@/styles/themeJump';
import { ThemeProvider } from '@mui/styles';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import {
  mockAssetNoImage,
  mockAssetResponse,
  mockAssetSoldOut,
} from '@/__mocks__/mockAssetResponse';
import type { IAsset } from '@/types/assetTypes';
import type { IUser } from '@/types/user';
import user from '@testing-library/user-event';
import { apiClient } from '@/api/client';
import { UserContext } from '@/helpers/auth/UserContext';
import { CartProvider } from '@/helpers/auth/CartContext';
import { mockJsonResponse } from '@/__mocks__/mockApiResponse';

const mockHandleClose = jest.fn();
const mockUpdateAsset = jest.fn();

jest.mock('@/api/client');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

const data: IAsset = mockAssetResponse.items[0];
const mockUser = {
  id: 'asdf',
  email: 'example@example.com',
  exp: new Date('3000-01-01T00:10:00.000Z'),
};

const userPortfolioAsset = {
  id: 'acecd96f-e3f7-44a1-9f1e-28b771c1f203',
  name: 'deleniti officiis amet soluta',
  description: 'Vitae alias ex accusamus quibusdam sit officiis quod.',
  media: [
    {
      id: '18b4456d-0592-4722-a30f-63a678ca7d89',
      title: 'quae ducimus modi unde',
      description: 'aliquam omnis exercitationem qui',
      sourceUrl: 'https://loremflickr.com/640/480',
      sortOrder: 1,
      assetId: 'acecd96f-e3f7-44a1-9f1e-28b771c1f203',
      fileId: 'd7bed264-9e69-4b43-80f9-387dcdcf25ac',
      file: 'http://localhost:4566/test-bucket/assets/acecd96f-e3f7-44a1-9f1e-28b771c1f203/b0b43dba-f96f-466b-8b49-76f169e110cb',
      absoluteUrl:
        'http://localhost:4566/test-bucket/assets/acecd96f-e3f7-44a1-9f1e-28b771c1f203/b0b43dba-f96f-466b-8b49-76f169e110cb',
    },
  ],
  refId: '46205lr5',
  slug: 'deleniti-officiis-amet-soluta',
  createdAt: '2022-10-20T14:41:41.829Z',
  updatedAt: '2022-10-20T14:41:41.829Z',
  attributes: [
    {
      trait: 'brand',
      value: 'Joe Montana',
      display: null,
    },
    {
      trait: 'card number',
      value: '#724',
      display: null,
    },
    {
      trait: 'category',
      value: 'Baseball',
      display: null,
    },
    {
      trait: 'grade',
      value: 6,
      display: null,
    },
    {
      trait: 'grading service',
      value: 'BGS',
      display: null,
    },
    {
      trait: 'producer',
      value: 'Topps',
      display: null,
    },
    {
      trait: 'year',
      value: 1990,
      display: null,
    },
  ],
  partner: 'aVEVLpXpo4UgZDVgJVQEuLZkabz',
  sellOrders: [
    {
      id: '91c2a996-e437-4f03-a324-10000a14686c',
      assetId: 'acecd96f-e3f7-44a1-9f1e-28b771c1f203',
      userId: 'feeb7cb9-460d-469e-b1fa-2db3c3539d4c',
      partnerId: '48496929-ea32-40c0-9a9b-ac9ccc6fa876',
      fractionQty: 57177,
      fractionQtyAvailable: 50000,
      fractionPriceCents: 8700,
      expireTime: 1678750064481,
      startTime: 1652276928626,
      deletedTime: 0,
      type: 'standard',
      userFractionLimit: null,
      userFractionLimitEndTime: null,
    },
  ],
  userAsset: {
    id: '836a8d24-27fe-4947-a63d-3d5931c41438',
    assetId: 'acecd96f-e3f7-44a1-9f1e-28b771c1f203',
    quantityOwned: 7177,
  },
  category: 'overview',
  isOnUserPortfolio: true,
};

const MockTradePanel = ({ asset }: { asset: IAsset }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <CartProvider>
        <TradePanel
          asset={asset}
          open={true}
          handleClose={mockHandleClose}
          updateAsset={mockUpdateAsset}
        />
      </CartProvider>
    </ThemeProvider>
  );
};

const MockTradePanelWithUser = ({ asset, user }: { asset: IAsset; user: IUser }) => {
  return (
    <UserContext.Provider value={{ user, refreshUser: jest.fn(), logout: jest.fn() }}>
      <CartProvider>
        <MockTradePanel asset={asset} />
      </CartProvider>
    </UserContext.Provider>
  );
};

describe('TradePanel', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockApiClient.get.mockResolvedValue(mockJsonResponse());
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should contain all the content', async () => {
    render(<MockTradePanel asset={data} />);
    const cardTitle = await screen.findByText(/research drawer/i);
    const closeBtn = await screen.findByRole('button', { name: /close/i });
    const name = await screen.findByText(data.name);
    const images = await screen.findAllByRole('img');
    const slider = await screen.findByRole('slider');
    const buyBtn = await screen.findByRole('button', { name: /buy now/i });
    const orderSummary = await screen.findByText(/order summary/i);
    const valuation = await screen.findByText(/\$320/i);
    expect(cardTitle).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(images[0]).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
    expect(buyBtn).toBeInTheDocument();
    expect(orderSummary).toBeInTheDocument();
    expect(valuation).toBeInTheDocument();
  });

  test('should allow user to select a number of shares', async () => {
    render(<MockTradePanel asset={mockAssetResponse.items[0]} />);

    const slider = await screen.findByRole('slider');
    expect(slider).toBeInTheDocument();
    // mock the getBoundingClientRect
    slider.getBoundingClientRect = jest.fn(() => {
      return {
        bottom: 286.22918701171875,
        height: 28,
        left: 19.572917938232422,
        right: 583.0937919616699,
        top: 258.22918701171875,
        width: 563.5208740234375,
        x: 19.572917938232422,
        y: 258.22918701171875,
      };
    }) as unknown as () => DOMRect;
    await fireEvent.mouseDown(slider, { clientX: 1000, clientY: 1000 });
    const totalPrice = await screen.findByText(`$0.32`);
    expect(totalPrice).toBeInTheDocument();
  });

  test('should have sell now on button if on User portfolio', async () => {
    render(<MockTradePanel asset={userPortfolioAsset} />);
    const sellBtn = await screen.findByRole('button', { name: /sell now/i });
    expect(sellBtn).toBeInTheDocument();
  });

  test('should change value on button if on User portfolio', async () => {
    render(<MockTradePanel asset={userPortfolioAsset} />);
    const slider = await screen.findByRole('slider');
    const buyBtn = await screen.findByRole('button', { name: `+ 0 units` });
    expect(buyBtn).toBeDisabled;
    // mock the getBoundingClientRect
    slider.getBoundingClientRect = jest.fn(() => {
      return {
        bottom: 286.22918701171875,
        height: 28,
        left: 19.572917938232422,
        right: 583.0937919616699,
        top: 258.22918701171875,
        width: 563.5208740234375,
        x: 19.572917938232422,
        y: 258.22918701171875,
      };
    }) as unknown as () => DOMRect;
    await fireEvent.mouseDown(slider, { clientX: 162, clientY: 302 });
    expect(buyBtn).not.toBeDisabled();
    expect(buyBtn).not.toContain(`+ 0 units`);
  });

  test('should allow user to buy share', async () => {
    render(<MockTradePanelWithUser asset={data} user={mockUser} />);
    const slider = await screen.findByRole('slider');
    const buyBtn = await screen.findByRole('button', { name: /buy/i });
    expect(buyBtn).toBeDisabled;
    // mock the getBoundingClientRect
    slider.getBoundingClientRect = jest.fn(() => {
      return {
        bottom: 286.22918701171875,
        height: 28,
        left: 19.572917938232422,
        right: 583.0937919616699,
        top: 258.22918701171875,
        width: 563.5208740234375,
        x: 19.572917938232422,
        y: 258.22918701171875,
      };
    }) as unknown as () => DOMRect;
    await fireEvent.mouseDown(slider, { clientX: 162, clientY: 302 });
    expect(buyBtn).not.toBeDisabled();
    await user.click(buyBtn);

    const closeBtn = await screen.findByRole('button', { name: /close/i });
    await user.click(closeBtn);
  });
  test('should reset if the card data changes', async () => {
    const { rerender } = render(<MockTradePanel asset={data} />);
    const slider = await screen.findByRole('slider');
    const buyBtn = await screen.findByRole('button', { name: /buy/i });
    const cardName = await screen.findByText(data.name);
    expect(buyBtn).toBeDisabled;
    // mock the getBoundingClientRect
    slider.getBoundingClientRect = jest.fn(() => {
      return {
        bottom: 286.22918701171875,
        height: 28,
        left: 19.572917938232422,
        right: 583.0937919616699,
        top: 258.22918701171875,
        width: 563.5208740234375,
        x: 19.572917938232422,
        y: 258.22918701171875,
      };
    }) as unknown as () => DOMRect;
    await fireEvent.mouseDown(slider, { clientX: 162, clientY: 302 });
    expect(buyBtn).not.toBeDisabled();
    expect(cardName).toBeInTheDocument();

    rerender(<MockTradePanel asset={mockAssetResponse.items[1]} />);
    const newCardName = await screen.findByText(mockAssetResponse.items[1].name);
    expect(buyBtn).toBeDisabled();
    expect(newCardName).toBeInTheDocument();
  });

  test('should not display slider or buy button if available units is 0', async () => {
    render(<MockTradePanel asset={mockAssetSoldOut} />);
    const slider = await screen.findByRole('slider');
    const buyBtn = await screen.findByRole('button', { name: /buy/i });

    expect(slider).toBeNull;
    expect(buyBtn).toBeNull;
  });

  test('should not display image if image is null', async () => {
    render(<MockTradePanel asset={mockAssetNoImage as unknown as IAsset} />);
    await waitFor(() => {
      const img = screen.queryByRole('img');
      expect(img).toBeNull();
    });
  });
});

describe('TradePanel asset:Drop', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockApiClient.get.mockResolvedValue(mockJsonResponse());
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should only allow user buy the allotted amount of shares', async () => {
    mockApiClient.get.mockResolvedValue(
      mockJsonResponse({ fractionsAvailableToPurchase: 10, fractionsPurchased: 10 }),
    );

    render(<MockTradePanelWithUser asset={mockAssetResponse.items[2]} user={mockUser} />);

    const buyBtn = await screen.findByRole('button', { name: /buy/i });
    const maxSliderValue = await screen.findByText('10');
    expect(maxSliderValue).toBeInTheDocument();
    expect(buyBtn).toBeDisabled();
    expect(mockApiClient.get).toBeCalledTimes(1);
  });
});
