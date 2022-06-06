import React from 'react';
import { render, screen, fireEvent, waitFor, getByText, findByText, queries } from '@testing-library/react';
// import user from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { ThemeProvider } from '@mui/material';
import { Login } from '../../../../components/Login/components';
import theme from '@/styles/themeJump';
import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect'
import userEvent from '@testing-library/user-event';

const mockChildren = 'mockedChildren';

const MockLogin = () => {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

async function openModal() {
  render(<MockLogin />);
  userEvent.click(screen.getByText('Login'));
  const modal = await waitFor(() => screen.findByRole("presentation"));
  return modal;
}

test('Login button exists', () => {
  render(<MockLogin />);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test('Login button opens modal on click', async () => {
  const modal = await openModal()
  expect(modal).toBeTruthy()
})

test('Modal should be a valid form', async () => {
  const user = userEvent.setup()
  // const modal = await openModal()
  const { debug } = render(<MockLogin />);
  userEvent.click(screen.getByText('Login'));
  const modal = await waitFor(() => screen.findByRole("presentation"));
  const button = screen.getByRole('button', { name: /login/i });
  expect(button).toBeInTheDocument();
  const input = screen.getByRole('textbox', { name: /email/i })
  expect(input).toBeInTheDocument();
  const inputLabel = queries.getByText(modal, /email/i)
  expect(inputLabel).toHaveAttribute('for', 'email');
  expect(inputLabel).toBeTruthy();
  expect(input).toHaveAttribute('type', 'email')
  expect(input).toHaveValue('')
  user.type(input, 'test@test.com')
  fireEvent.change(input, { target: { value: 'test@test.com' } });
  expect(input).toHaveValue('test@test.com');
  user.click(button)
  // expect(button).toBeDisabled();
  const form = modal.querySelector('#modal');
  const formViolations = await axe(form ?? '')
  expect(formViolations).toHaveNoViolations();
  expect(button).toBeTruthy()

})