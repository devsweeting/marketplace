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
import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';
import type { IAsset } from '@/types/assetTypes';
import type { IUser } from '@/types/user';
import user from '@testing-library/user-event';

import { UserContext } from '@/helpers/auth/UserContext';
import { StatusCodes } from 'http-status-codes';
const mockHandleClose = jest.fn();
const mockUpdateAsset = jest.fn();
const mockUserContextFunctions = jest.fn();

const data: IAsset = mockAssetResponse.items[0];
const mockUser = { id: 'asdf', email: 'example@example.com' };

const details = parseAssetAttributes(data.attributes);
const MockTradePanel = ({ asset }: { asset: IAsset }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <TradePanel
        asset={asset}
        open={true}
        handleClose={mockHandleClose}
        updateAsset={mockUpdateAsset}
      />
    </ThemeProvider>
  );
};

const MockTradePanelWithUser = ({ asset, user }: { asset: IAsset; user: IUser }) => {
  return (
    <UserContext.Provider
      value={{
        user: user,
        refreshUser: mockUserContextFunctions,
        logout: mockUserContextFunctions,
      }}
    >
      <MockTradePanel asset={asset} />
    </UserContext.Provider>
  );
};

describe('TradePanel', () => {
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

  test('should contain all the content', async () => {
    render(<MockTradePanel asset={data} />);
    const cardTitle = await screen.findByText(/research drawer/i);
    const closeBtn = await screen.findByRole('button', { name: /close/i });
    const name = await screen.findByText(data.name);
    const images = await screen.findAllByRole('img');
    const detail = await screen.findByText(
      `${details.year} #xxx ${details.grading_service} ${details.grading}`,
    );
    const slider = await screen.findByRole('slider');
    const buyBtn = await screen.findByRole('button', { name: /buy now/i });
    const orderSummary = await screen.findByText(/order summary/i);
    const valuation = await screen.findByText(/\$320/i);
    expect(cardTitle).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(detail).toBeInTheDocument();
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

    const closeBtn = await screen.findByRole('button', { name: /cancel/i });
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
    const fractionAvailability = await screen.findByText(/No units Available/i);

    expect(slider).toBeNull;
    expect(buyBtn).toBeNull;
    expect(fractionAvailability).toBeInTheDocument();
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

  test('should only allow user buy the allotted amount of shares', async () => {
    const mockFetch = (global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: true,
        status: StatusCodes.OK,
        json: () => Promise.resolve({ fractionsAvailableToPurchase: 10, fractionsPurchased: 10 }),
      }),
    ) as jest.Mock);
    render(<MockTradePanelWithUser asset={mockAssetResponse.items[2]} user={mockUser} />);
    const buyBtn = await screen.findByRole('button', { name: /buy/i });
    const maxSliderValue = await screen.findByText('10');
    expect(maxSliderValue).toBeInTheDocument();
    expect(buyBtn).toBeDisabled;
    expect(mockFetch).toBeCalledTimes(1);
  });
});
