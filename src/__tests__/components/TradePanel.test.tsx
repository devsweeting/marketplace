import { TradePanel } from '@/components/TradePanel';
import { themeJump } from '@/styles/themeJump';
import { ThemeProvider } from '@mui/styles';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import { mockAssetResponse, mockSellorderResponse } from '@/__mocks__/mockAssetResponse';
import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';
import type { IAsset } from '@/types/assetTypes';

const handleClose = jest.fn();

const data = mockAssetResponse.items[0];
const mockSellorder = mockSellorderResponse.items[0];
const details = parseAssetAttributes(data.attributes);
const MockTradePanel = ({ asset }: { asset: IAsset }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <TradePanel asset={asset} open={true} handleClose={handleClose} sellorder={mockSellorder} />
    </ThemeProvider>
  );
};

describe('TradePanel', () => {
  test('should contain all the content', () => {
    render(<MockTradePanel asset={data} />);
    screen.debug;
    const cardTitle = screen.getByText(/research drawer/i);
    const closeBtn = screen.getByRole('button', { name: /close/i });
    const name = screen.getByText(data.name);
    const images = screen.getAllByRole('img');
    const detail = screen.getByText(
      `${details.year} #xxx ${details.grading_service} ${details.grading}`,
    );
    const slider = screen.getByRole('slider');
    const buyBtn = screen.getByRole('button', { name: /buy now/i });
    const orderSummary = screen.getByText(/order summary/i);

    expect(cardTitle).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(detail).toBeInTheDocument();
    expect(images[0]).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
    expect(buyBtn).toBeInTheDocument();
    expect(orderSummary).toBeInTheDocument();
  });

  test('should allow user to select a number of shares', async () => {
    render(<MockTradePanel asset={data} />);
    const slider = screen.getByRole('slider');
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
    const totalPrice = screen.getByText(
      `$${mockSellorder.fraction_price_cents * mockSellorder.fraction_qty}`,
    );
    expect(totalPrice).toBeInTheDocument();
  });

  test('should allow user to buy share', async () => {
    render(<MockTradePanel asset={data} />);
    const slider = screen.getByRole('slider');
    const buyBtn = screen.getByRole('button', { name: /buy/i });
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
    const buyModal = screen.getByRole('tabpanel');
    expect(buyModal).toBeInTheDocument();
  });
});

test('should reset if the card data changes', async () => {
  test.todo;
});
