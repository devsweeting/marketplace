import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { UserForm } from '@/components/Payments/Account';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/* eslint-disable @typescript-eslint/no-empty-function */

const submit = jest.fn();

const MockVerificationForm = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <UserForm submit={submit} />
    </ThemeProvider>
  );
};

describe('VerificationForm', () => {
  it('should contain all neccessary inputs', () => {
    const { getByLabelText } = render(<MockVerificationForm />);

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
    render(<MockVerificationForm />);
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

    await waitFor(() =>
      expect(submit).toHaveBeenCalledWith(
        {
          first_name: 'Shaquille',
          last_name: 'Oatmeal',
          email: 'shaquille@gmail.com',
          phone_numbers: '123.456.7890',
          date_of_birth: {
            day: '31',
            month: '10',
            year: '2022',
          },
          gender: 'M',
          agreement: true,
        },
        expect.objectContaining({
          setErrors: expect.any(Function),
          setStatus: expect.any(Function),
        }),
      ),
    );
  });
});
