import React from 'react';
import { render, screen, waitFor, queries } from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect'
import { axe } from 'jest-axe'
import { ThemeProvider } from '@mui/material';
import { Login } from '@/components/Login/components';
import theme from '@/styles/themeJump';

const MockLogin = () => {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

async function openModal() {
  render(<MockLogin />);
  await user.click(screen.getByText('Login'));
  return await waitFor(() => screen.findByRole("presentation"));
}

test('Login button exists', () => {
  render(<MockLogin />);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('Login button opens modal on click', async () => {
  const modal = await openModal();
  expect(modal).toBeTruthy();
})

test('Modal should be a valid form', async () => {
  const modal = await openModal();
  const button = screen.getByRole('button', { name: /login/i });
  expect(button).toBeInTheDocument();
  const input = screen.getByRole('textbox', { name: /email/i })
  expect(input).toBeInTheDocument();
  const inputLabel = queries.getByText(modal, /email/i)
  expect(inputLabel).toHaveAttribute('for', 'email');
  expect(inputLabel).toBeTruthy();
  expect(input).toHaveAttribute('type', 'email')
  expect(input).toHaveValue('')
  await user.type(input, 'test@test.com')
  expect(input).toHaveValue('test@test.com');
  // await user.click(button)
  // expect(button).toBeDisabled();
  const form = modal.querySelector('#modal');
  const formViolations = await axe(form ?? '')
  expect(formViolations).toHaveNoViolations();
  expect(button).toBeTruthy()

})