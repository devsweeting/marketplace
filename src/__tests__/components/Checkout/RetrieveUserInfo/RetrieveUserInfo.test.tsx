import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { UserContext } from '@/helpers/auth/UserContext';
import { CartProvider } from '@/helpers/auth/CartContext';
import user from '@testing-library/user-event';
import { RetrieveUserInfo } from '@/components/Checkout/RetrieveUserInfo';
import { verifyAddress } from '@/api/endpoints/payments';

jest.mock('@/api/endpoints/payments');

const mockverifyAddress = verifyAddress as jest.MockedFn<typeof verifyAddress>;

const mockUser = {
  id: 'asdf',
  email: 'example@example.com',
  exp: new Date('3000-01-01T00:10:00.000Z'),
};

const MockRetrieveUserInfo = ({ setPage }: { setPage: () => void }) => (
  <ThemeProvider theme={themeJump}>
    <UserContext.Provider value={{ user: mockUser, refreshUser: jest.fn(), logout: jest.fn() }}>
      <CartProvider>
        <RetrieveUserInfo setPage={setPage} />
      </CartProvider>
    </UserContext.Provider>
  </ThemeProvider>
);

describe('Retrieve and send user info', () => {
  beforeEach(() => {
    jest.setTimeout(2000);
    mockverifyAddress.mockResolvedValue({
      status: 200,
      address: { deliverability: '', deliverability_analysis: {}, normalized_address: {} },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

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

    const city = await screen.findByRole('textbox', {
      name: /city/i,
    });

    const zipCode = await screen.findByRole('textbox', {
      name: /zip\/postal code/i,
    });

    const button = await screen.findByRole('button', {
      name: /confirm info/i,
    });

    const elements = [
      title,
      firstName,
      lastName,
      phoneNumber,
      streetAddress,
      countrySelector,
      stateSelector,
      city,
      zipCode,
      button,
    ];

    for (const element of elements) {
      expect(element).toBeInTheDocument();
    }
  });

  test('Should allow users to enter information', async () => {
    const setPage = jest.fn();
    render(<MockRetrieveUserInfo setPage={setPage} />);

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

    const city = await screen.findByRole('textbox', {
      name: /city/i,
    });

    const zipCode = await screen.findByRole('textbox', {
      name: /zip\/postal code/i,
    });

    const button = await screen.findByRole('button', {
      name: /confirm info/i,
    });

    expect(button).toBeDisabled();

    await user.type(firstName, ' ');
    expect(firstName).toHaveValue(' ');
    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
    await user.clear(firstName);
    await user.type(firstName, 'John');
    await user.tab();
    expect(firstName).toHaveValue('John');

    await user.type(lastName, ' ');
    expect(lastName).toHaveValue(' ');
    expect(await screen.findByText(/last name is required/i)).toBeInTheDocument();
    await user.clear(lastName);
    await user.type(lastName, 'Doe');
    await user.tab();
    expect(lastName).toHaveValue('Doe');

    await user.type(phoneNumber, ' ');
    expect(phoneNumber).toHaveValue(' ');
    expect(await screen.findByText(/Not a valid phone number/i)).toBeInTheDocument();
    await user.clear(phoneNumber);
    await user.type(phoneNumber, '5555555555');
    await user.tab();
    expect(phoneNumber).toHaveValue('5555555555');

    await user.type(streetAddress, ' ');
    expect(streetAddress).toHaveValue(' ');
    expect(await screen.findByText(/Street address is required/i)).toBeInTheDocument();
    await user.clear(streetAddress);
    await user.type(streetAddress, '713 S Main St');
    await user.tab();
    expect(streetAddress).toHaveValue('713 S Main St');

    await user.type(city, ' ');
    expect(city).toHaveValue(' ');
    expect(await screen.findByText(/City is required/i)).toBeInTheDocument();
    await user.clear(city);
    await user.type(city, 'Joplin');
    await user.tab();
    expect(city).toHaveValue('Joplin');

    await user.type(zipCode, ' ');
    expect(zipCode).toHaveValue(' ');
    expect(await screen.findByText(/ZIP code is required/i)).toBeInTheDocument();
    await user.clear(zipCode);
    await user.type(zipCode, '64801');
    await user.tab();
    expect(zipCode).toHaveValue('64801');

    await user.click(countrySelector);

    const countryOption = await screen.findByRole('option', {
      name: /united states/i,
    });

    await user.click(countryOption);

    expect(
      await screen.findByRole('button', {
        name: /united states/i,
      }),
    ).toBeInTheDocument();

    await user.click(stateSelector);

    const stateOption = await screen.findByRole('option', {
      name: /mo/i,
    });

    await user.click(stateOption);

    expect(
      await screen.findByRole('button', {
        name: /^mo$/i,
      }),
    ).toBeInTheDocument();

    expect(button).not.toBeDisabled();
    await user.click(button);

    expect(setPage).toHaveBeenCalledTimes(1);
  });
});
