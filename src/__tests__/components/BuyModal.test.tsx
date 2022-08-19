import type { IBuyModal } from '@/components/BuyModal/BuyModal';
import { BuyModal } from '@/components/BuyModal/BuyModal';
import { themeJump } from '@/styles/themeJump';
import { mockAssetResponse } from '@/__mocks__/mockAssetResponse';
import { ThemeProvider } from '@mui/styles';
import { render } from '@testing-library/react';

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

const mockOnClose = jest.fn;
const mockUpdateAsset = jest.fn;

const mockTotalFraction = 10;
const mockTotalPrice = 100;
const mockData = mockAssetResponse.items[0];

describe('BuyModal', () => {
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

    // const orderInfo = screen.getByText()
    test.todo;
  });
});
