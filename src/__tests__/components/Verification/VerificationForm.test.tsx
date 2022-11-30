import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { VerificationForm } from '@/components/Verification/Form';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/* eslint-disable @typescript-eslint/no-empty-function */

const submit = jest.fn();

const MockVerificationForm = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <VerificationForm submit={submit} />
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
    expect(getByLabelText(/Street/i)).toBeInTheDocument();
    expect(getByLabelText(/City/i)).toBeInTheDocument();
    expect(getByLabelText(/Subdivision/i)).toBeInTheDocument();
    expect(getByLabelText(/Postal Code/i)).toBeInTheDocument();
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
    await user.type(screen.getByLabelText(/Street/i), '1 Market St.');
    await user.type(screen.getByLabelText(/City/i), 'Santa Fe');
    await user.click(screen.getByLabelText(/Subdivision/i));
    await user.click(within(screen.getByRole('listbox')).getByText('California'));
    await user.type(screen.getByLabelText(/Postal Code/i), '94105');

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
          mailing_address: {
            address_street: '1 Market St.',
            address_city: 'Santa Fe',
            address_subdivision: 'CA',
            address_postal_code: '94105',
            address_country_code: 'US',
          },
        },
        expect.objectContaining({
          setErrors: expect.any(Function),
          setStatus: expect.any(Function),
        }),
      ),
    );
  });
});
