import type { IBuyModal } from '@/components/BuyModal/BuyModal';
import { BuyModal } from '@/components/BuyModal/';
import { themeJump } from '@/styles/themeJump';
import { mockAssetResponse } from '@/__mocks__/mockAssetResponse';
import { ThemeProvider } from '@mui/styles';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { StatusCodes } from 'http-status-codes';

const MockBuyModal = ({
  totalFractions,
  totalPrice,
  onClose,
  sellOrder,
  updateAsset,
}: IBuyModal) => {
  return (
    <ThemeProvider theme={themeJump}>
      <BuyModal
        isOpen={true}
        totalFractions={totalFractions}
        totalPrice={totalPrice}
        onClose={onClose}
        sellOrder={sellOrder}
        updateAsset={updateAsset}
      ></BuyModal>
    </ThemeProvider>
  );
};

const mockOnClose = jest.fn();
const mockUpdateAsset = jest.fn();

const mockTotalFraction = 10;
const mockTotalPrice = 100;
const mockData = mockAssetResponse.items[0];

describe('BuyModal', () => {
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

  test('should display fractions and total price', () => {
    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
      ></MockBuyModal>,
    );

    const orderInfo = screen.getByText(/fractions for/i, { exact: false });
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });

    expect(orderInfo).toHaveTextContent(
      `Buy ${mockTotalFraction} fractions for $${mockTotalPrice}?`,
    );
    expect(cancelBtn).toBeInTheDocument();
    expect(confirmBtn).toBeInTheDocument();
  });

  test('should close modal on cancel', async () => {
    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
      ></MockBuyModal>,
    );

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should allow the user to confirm the buy', async () => {
    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
      ></MockBuyModal>,
    );
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmBtn);
    expect(global.fetch).toBeCalledTimes(1);
    const success = screen.getByText(/success!/i);
    const closeBtn = screen.getByRole('button', { name: /close/i });
    expect(closeBtn).toBeInTheDocument();
    expect(success).toBeInTheDocument();
    await user.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should display an error message if user is not logged in', async () => {
    const mockFetch = (global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: true,
        status: StatusCodes.UNAUTHORIZED,
        json: () => Promise.resolve({ test: 'test' }),
      }),
    ) as jest.Mock);
    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
      ></MockBuyModal>,
    );
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmBtn);
    const errorMessage = screen.getByText(/please login to buy assets/i);
    expect(errorMessage).toBeInTheDocument();

    expect(mockFetch).toBeCalledTimes(1);
  });

  test('should display an error message if something goes wrong', async () => {
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
    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
      ></MockBuyModal>,
    );
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmBtn);
    const errorMessage = screen.getByText(/Something went wrong./i);
    expect(errorMessage).toBeInTheDocument();

    expect(mockFetch).toBeCalledTimes(1);
  });

  test('should display message if user has reached their limit.', async () => {
    const mockFetch = (global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: true,
        status: StatusCodes.BAD_REQUEST,
        json: () => Promise.resolve({ message: 'PURCHASE_LIMIT_REACHED' }),
      }),
    ) as jest.Mock);
    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
      ></MockBuyModal>,
    );
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmBtn);
    const errorMessage = screen.getByText(
      /You cannot purchase any more of this item at this time./i,
    );
    expect(errorMessage).toBeInTheDocument();

    expect(mockFetch).toBeCalledTimes(1);
  });

  test('should display message if user tries to buy own asset.', async () => {
    const mockFetch = (global.fetch = jest.fn(() =>
      Promise.resolve({
        headers: new Headers({
          'content-type': 'application/json',
        }),
        ok: true,
        status: StatusCodes.BAD_REQUEST,
        json: () => Promise.resolve({ message: 'USER_CANNOT_PURCHASE_OWN_ORDER' }),
      }),
    ) as jest.Mock);
    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
      ></MockBuyModal>,
    );
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmBtn);
    const errorMessage = screen.getByText(/You cannot purchase your own order./i);
    expect(errorMessage).toBeInTheDocument();

    expect(mockFetch).toBeCalledTimes(1);
  });
});
