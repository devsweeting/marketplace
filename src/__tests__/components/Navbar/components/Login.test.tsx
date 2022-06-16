import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@mui/material';
import { Login } from '@/components/Navbar/components/Login';
import { themeJump } from '@/styles/themeJump';
//TODO - add tests for when user is logged in
const MockLogin = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <Login />
    </ThemeProvider>
  );
};

async function openModal() {
  render(<MockLogin />);
  await user.click(screen.getByText('Login'));
  return await waitFor(() => screen.findByRole('presentation'));
}
describe('Login', () => {
  test('Login button exists', () => {
    render(<MockLogin />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('Login button opens modal on click', async () => {
    const modal = await openModal();
    expect(modal).toBeTruthy();
  });

  test('Modal should be contain a valid form, input, and button', async () => {
    const modal = await openModal();
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
    await openModal();
    const input = screen.getByRole('textbox', { name: /email/i });
    await user.type(input, 'test@test.com');
    expect(input).toHaveValue('test@test.com');
  });

  test('Input should not allow invalid fields', async () => {
    await openModal();
    const input = screen.getByRole('textbox', { name: /email/i });
    const button = screen.getByRole('button', { name: /login/i });
    const alert = screen.getByRole('alert');
    await user.type(input, 'test@test');
    await user.click(button);
    expect(input).toHaveValue('test@test');
    expect(alert).toHaveTextContent(/please enter a valid email/i);
  });

  test('User should be able to submit a valid email', async () => {
    await openModal();
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
    await openModal();
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
