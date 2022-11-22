import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { UserContext } from '@/helpers/auth/UserContext';
import { CartProvider } from '@/helpers/auth/CartContext';
import user from '@testing-library/user-event';
import { setLocalStorage } from '@/helpers/mockLocalStorage';
import { PaymentMethods } from '@/components/Checkout/PaymentMethods';

jest.mock('@/api/endpoints/sellorders');

const mockId = '@local-cart';
const mockJson = [
  {
    id: 'fbb1a80f-41e2-47e9-9adb-cce684ec507c',
    quantity: 400,
    fractionPriceCents: 7500,
    totalPrice: 30000,
  },
];

const mockUser = {
  id: 'asdf',
  email: 'example@example.com',
  exp: new Date('3000-01-01T00:10:00.000Z'),
};

const MockPaymentMethods = ({ setPage }: { setPage: () => void }) => (
  <ThemeProvider theme={themeJump}>
    <UserContext.Provider value={{ user: mockUser, refreshUser: jest.fn(), logout: jest.fn() }}>
      <CartProvider>
        <PaymentMethods page={1} setPage={setPage} />
      </CartProvider>
    </UserContext.Provider>
  </ThemeProvider>
);

describe('Payment methods', () => {
  beforeEach(() => {
    setLocalStorage(mockId, mockJson);
  });

  afterEach(() => {
    window.localStorage.clear();
  });
  test('Should render out all of the content', async () => {
    const setPage = jest.fn();
    render(<MockPaymentMethods setPage={setPage} />);
    const presentation = await screen.findByRole('presentation');

    const backButton = await screen.findByRole('button', {
      name: /close cart modal/i,
    });
    const removeFromCartButton = await screen.findByRole('button', {
      name: /Close Cart Modal/i,
    });

    const dismissText = await screen.findByText(/dismiss/i);

    const balanceLink = await screen.findByText(/here\./i);

    const withdrawLink = await screen.findByText(/withdraw balance/i);

    const jumpBalanceRadio = await screen.findByRole('radio', {
      name: /a/i,
    });
    const addFundsToBalanceInput = await screen.findByRole('spinbutton');
    const addFundsToBalanceButton = await screen.findByRole('button', { name: /add funds/i });

    const creditDebitCardRadio = await screen.findByRole('radio', {
      name: /b/i,
    });

    const units = await screen.findByText(/400 units/i);
    const valuation = await screen.findByText(/\$30,000/i);
    const cancelButton = await screen.findByRole('button', { name: /cancel/i });
    const addCreditCardButton = await screen.findByRole('button', { name: /add credit card/i });

    const elements = [
      presentation,
      backButton,
      removeFromCartButton,
      balanceLink,
      dismissText,
      withdrawLink,
      jumpBalanceRadio,
      addFundsToBalanceInput,
      addFundsToBalanceButton,
      creditDebitCardRadio,
      units,
      valuation,
      addCreditCardButton,
      cancelButton,
    ];

    for (const element of elements) {
      if (elements.length > 0) {
        return expect(element).toBeInTheDocument();
      } else {
        return fail('it should not reach here');
      }
    }
  });
  test('Should allow input and button to no longer be disabled', async () => {
    const setPage = jest.fn();
    render(<MockPaymentMethods setPage={setPage} />);

    const jumpBalanceRadio = await screen.findByRole('radio', {
      name: /a/i,
    });
    const addFundsToBalanceInput = await screen.findByRole('spinbutton');
    const addFundsToBalanceButton = await screen.findByRole('button', { name: /add funds/i });
    expect(addFundsToBalanceButton).toBeDisabled();
    await user.click(jumpBalanceRadio);
    await user.type(addFundsToBalanceInput, '50');
    await user.click(addFundsToBalanceButton);

    expect(addFundsToBalanceInput).toHaveDisplayValue(/50$/i);
    expect(addFundsToBalanceButton).not.toBeDisabled();
  });
  test('Should allow add/pay button click', async () => {
    const setPage = jest.fn();
    render(<MockPaymentMethods setPage={setPage} />);

    const addCreditCardButton = await screen.findByRole('button', { name: /add credit card/i });
    const jumpBalanceRadio = await screen.findByRole('radio', {
      name: /a/i,
    });

    await user.click(addCreditCardButton);
    expect(setPage).toHaveBeenCalledTimes(1);

    await user.click(jumpBalanceRadio);
    const payWithJumpBalanceButton = await screen.findByRole('button', {
      name: /pay with jump balance/i,
    });
    await user.click(payWithJumpBalanceButton);
    expect(setPage).toHaveBeenCalledTimes(2);

    expect(payWithJumpBalanceButton).toBeInTheDocument();
  });
});
