import { LoginModal } from '@/components/LoginModal';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import user from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
const MockLoginModal = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <LoginModal open={true} />
    </ThemeProvider>
  );
};

describe('Login modal flow', () => {
  test('Modal should be contain a valid form, input, and button', async () => {
    render(<MockLoginModal />);
    const modal = screen.getByRole('presentation');
    const input = screen.getByRole('textbox', { name: /email/i });
    const inputLabel = within(modal).getByText(/email/i);
    const button = screen.getByRole('button', { name: /login/i });
    const form = within(modal).getByRole('form');
    const formViolations = await axe(form ?? '');
    const alert = screen.getByRole('alert');
    expect(form).toBeTruthy();
    expect(input).toBeInTheDocument();
    expect(input).toBeTruthy();
    expect(input).toHaveAttribute('type', 'email');
    expect(inputLabel).toHaveAttribute('for', 'email');
    expect(inputLabel).toBeTruthy();
    expect(button).toBeInTheDocument();
    expect(button).toBeTruthy();
    expect(formViolations).toHaveNoViolations();
    expect(alert).toBeTruthy();
  });

  test('Input should be able to be filled', async () => {
    render(<MockLoginModal />);
    const input = screen.getByRole('textbox', { name: /email/i });
    await user.type(input, 'test@test.com');
    expect(input).toHaveValue('test@test.com');
  });

  test('Input should not allow invalid fields', async () => {
    render(<MockLoginModal />);
    const input = screen.getByRole('textbox', { name: /email/i });
    const button = screen.getByRole('button', { name: /login/i });
    const alert = screen.getByRole('alert');
    await user.type(input, 'test@test');
    await user.click(button);
    expect(input).toHaveValue('test@test');
    expect(alert).toHaveTextContent(/please enter a valid email/i);
  });

  test('User should be able to submit a valid email', async () => {
    render(<MockLoginModal />);
    const originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
      }),
    ) as jest.Mock;
    const input = screen.getByRole('textbox', { name: /email/i });
    const button = screen.getByRole('button', { name: /login/i });
    const alert = screen.getByRole('alert');
    await user.type(input, 'test@test.com');
    await user.click(button);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(alert).toHaveTextContent(/Check your email for a link to sign in/i);
    expect(button).toBeDisabled();
    global.fetch = originalFetch;
  });

  test('User should get too many requests error.', async () => {
    render(<MockLoginModal />);
    const originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 429,
      }),
    ) as jest.Mock;
    const input = screen.getByRole('textbox', { name: /email/i });
    const button = screen.getByRole('button', { name: /login/i });
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('');
    await user.type(input, 'test@test.com');
    await user.click(button);
    expect(alert).toHaveTextContent(/too many requests/i);
    global.fetch = originalFetch;
  });
});
