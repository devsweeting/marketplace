import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import PaymentsAccount from '@/pages/payments/account/index';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const MockVerificationForm = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <PaymentsAccount />
    </ThemeProvider>
  );
};

describe('VerificationForm', () => {
  it('should contain all neccessary inputs', () => {
    const { getByLabelText } = render(<PaymentsAccount />);

    expect(getByLabelText(/First name/i)).toBeInTheDocument();
    expect(getByLabelText(/Last name/i)).toBeInTheDocument();
    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(getByLabelText(/Day/i)).toBeInTheDocument();
    expect(getByLabelText(/Month/i)).toBeInTheDocument();
    expect(getByLabelText(/Year/i)).toBeInTheDocument();
    expect(getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(
      getByLabelText(/I agree to Jump's Terms of Service and Privacy Policy/),
    ).toBeInTheDocument();
  });

  it('should contain submit button', () => {
    render(<MockVerificationForm />);

    const submit = screen.getByRole('button', { name: /Submit/i });

    expect(submit).toBeInTheDocument();
  });

  jest.setTimeout(15000);
  it('can submit values', async () => {
    render(<PaymentsAccount />);
    const user = userEvent.setup();

    const button = screen.getByRole('button', { name: /Submit/i });

    await user.type(screen.getByLabelText(/First name/i), 'Shaquille');
    await user.type(screen.getByLabelText(/Last name/i), 'Oatmeal');
    await user.type(screen.getByLabelText(/Email/i), 'shaquille@gmail.com');
    await user.type(screen.getByLabelText(/Phone/i), '123.456.7890');
    await user.type(screen.getByLabelText(/Day/i), '31');
    await user.type(screen.getByLabelText(/Month/i), '10');
    await user.type(screen.getByLabelText(/Year/i), '2022');
    await user.click(screen.getByLabelText(/Gender/i));
    await user.click(within(screen.getByRole('listbox')).getByText('Male'));
    await user.click(
      screen.getByLabelText(/I agree to Jump's Terms of Service and Privacy Policy/),
    );

    await user.click(button);
  });
});
