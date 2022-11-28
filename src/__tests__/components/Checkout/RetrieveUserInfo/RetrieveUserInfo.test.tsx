import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { UserContext } from '@/helpers/auth/UserContext';
import { CartProvider } from '@/helpers/auth/CartContext';
import user from '@testing-library/user-event';
import { RetrieveUserInfo } from '@/components/Checkout/RetrieveUserInfo';

const mockUser = {
  id: 'asdf',
  email: 'example@example.com',
  exp: new Date('3000-01-01T00:10:00.000Z'),
};

const MockRetrieveUserInfo = ({ setPage }: { setPage: () => void }) => (
  <ThemeProvider theme={themeJump}>
    <UserContext.Provider value={{ user: mockUser, refreshUser: jest.fn(), logout: jest.fn() }}>
      <CartProvider>
        <RetrieveUserInfo page={1} setPage={setPage} />
      </CartProvider>
    </UserContext.Provider>
  </ThemeProvider>
);

describe('Retrieve and send user info', () => {
  test('It should render relevant content', async () => {
    const setPage = jest.fn();
    render(<MockRetrieveUserInfo setPage={setPage} />);
    const title = await screen.findByText(/billing info/i);
    const firstName = await screen.findByRole('textbox', { name: /first name/i });
    const lastName = await screen.findByRole('textbox', { name: /last name/i });
    const phoneNumber = await screen.findByRole('textbox', {
      name: /phone number/i,
    });
    const streetAddress = await screen.findByRole('textbox', {
      name: /street address/i,
    });
    const countryView = await screen.findByTestId('address_country_code');

    const countrySelector = await within(countryView).findByRole('button', {
      // eslint-disable-next-line no-irregular-whitespace
      name: /​/i,
    });

    const stateView = await screen.findByTestId('address_subdivision');

    const stateSelector = await within(stateView).findByRole('button', {
      // eslint-disable-next-line no-irregular-whitespace
      name: /​/i,
    });

    const elements = [
      title,
      firstName,
      lastName,
      phoneNumber,
      streetAddress,
      countrySelector,
      stateSelector,
    ];

    for (const element of elements) {
      expect(element).toBeInTheDocument();
    }
  });
});
