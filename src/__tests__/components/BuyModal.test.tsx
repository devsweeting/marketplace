import type { IBuyModal } from '@/components/BuyModal/BuyModal';
import { BuyModal } from '@/components/BuyModal/';
import { themeJump } from '@/styles/themeJump';
import { mockAssetResponse } from '@/__mocks__/mockAssetResponse';
import { ThemeProvider } from '@mui/styles';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { StatusCodes } from 'http-status-codes';
import type { IUser } from '@/types';
import { apiClient } from '@/api/client';
import { UserContext } from '@/helpers/auth/UserContext';
import { mockJsonResponse } from '@/__mocks__/mockApiResponse';

jest.mock('@/api/client');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

interface IMockBuyModal extends IBuyModal {
  user: IUser | undefined;
}
const MockBuyModal = ({
  totalFractions,
  totalPrice,
  onClose,
  sellOrder,
  updateAsset,
  user,
}: IMockBuyModal) => {
  return (
    <ThemeProvider theme={themeJump}>
      <UserContext.Provider value={{ user, refreshUser: jest.fn(), logout: jest.fn() }}>
        <BuyModal
          isOpen={true}
          totalFractions={totalFractions}
          totalPrice={totalPrice}
          onClose={onClose}
          sellOrder={sellOrder}
          updateAsset={updateAsset}
        ></BuyModal>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

const mockOnClose = jest.fn();
const mockUpdateAsset = jest.fn();
const mockUser = {
  id: 'asdf',
  email: 'example@example.com',
  exp: new Date('3000-01-01T00:10:00.000Z'),
};
const mockTotalFraction = 10;
const mockTotalPrice = 100;
const mockData = mockAssetResponse.items[0];

describe('BuyModal', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockApiClient.get.mockResolvedValue(mockJsonResponse());
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should display fractions and total price', async () => {
    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
        user={mockUser}
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
        user={mockUser}
      ></MockBuyModal>,
    );

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should allow the user to confirm the buy', async () => {
    mockApiClient.post.mockResolvedValue(mockJsonResponse({}, { status: StatusCodes.CREATED }));

    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
        user={mockUser}
      ></MockBuyModal>,
    );
    const confirmBtn = await screen.findByRole('button', { name: /confirm/i });
    await user.click(confirmBtn);

    expect(mockApiClient.post).toBeCalledTimes(1);
    const success = await screen.findByText(/success!/i);
    const closeBtn = await screen.findByRole('button', { name: /close/i });
    expect(closeBtn).toBeInTheDocument();
    expect(success).toBeInTheDocument();
    await user.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should display an error message if user is not logged in', async () => {
    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
        user={undefined}
      ></MockBuyModal>,
    );
    const confirmBtn = screen.queryByRole('button', { name: /confirm/i });
    expect(confirmBtn).toBeNull();
  });

  test('should display an error message if something goes wrong', async () => {
    mockApiClient.post.mockResolvedValue(mockJsonResponse({}, { status: StatusCodes.NOT_FOUND }));

    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
        user={mockUser}
      ></MockBuyModal>,
    );

    const confirmBtn = await screen.findByRole('button', { name: /confirm/i });
    await user.click(confirmBtn);
    const errorMessage = await screen.findByText(/Something went wrong./i);
    expect(errorMessage).toBeInTheDocument();

    expect(mockApiClient.post).toBeCalledTimes(1);
  });

  test('should display message if user has reached their limit.', async () => {
    mockApiClient.post.mockResolvedValue(
      mockJsonResponse({ message: 'PURCHASE_LIMIT_REACHED' }, { status: StatusCodes.BAD_REQUEST }),
    );

    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
        user={mockUser}
      ></MockBuyModal>,
    );

    const confirmBtn = await screen.findByRole('button', { name: /confirm/i });
    await user.click(confirmBtn);
    const errorMessage = await screen.findByText(
      /You cannot purchase any more of this item at this time./i,
    );
    expect(errorMessage).toBeInTheDocument();

    expect(mockApiClient.post).toBeCalledTimes(1);
  });

  test('should display message if user tries to buy own asset.', async () => {
    mockApiClient.post.mockResolvedValue(
      mockJsonResponse(
        { message: 'USER_CANNOT_PURCHASE_OWN_ORDER' },
        { status: StatusCodes.BAD_REQUEST },
      ),
    );

    render(
      <MockBuyModal
        totalFractions={mockTotalFraction}
        totalPrice={mockTotalPrice}
        sellOrder={mockData.sellOrders[0]}
        isOpen={true}
        onClose={mockOnClose}
        updateAsset={mockUpdateAsset}
        user={mockUser}
      ></MockBuyModal>,
    );

    const confirmBtn = await screen.findByRole('button', { name: /confirm/i });
    await user.click(confirmBtn);
    const errorMessage = await screen.findByText(/You cannot purchase your own order./i);
    expect(errorMessage).toBeInTheDocument();
    expect(mockApiClient.post).toBeCalledTimes(1);
  });
});
