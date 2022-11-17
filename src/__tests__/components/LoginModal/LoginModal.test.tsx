import { LoginModal } from '@/components/LoginModal';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import user from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { loginRequest } from '@/api/endpoints/loginRequest';
import { StatusCodes } from 'http-status-codes';

jest.mock('@/api/endpoints/loginRequest');

const mockLoginRequest = loginRequest as unknown as jest.MockedFn<typeof loginRequest>;

const MockLoginModal = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <LoginModal open={true} noDismiss={false} />
    </ThemeProvider>
  );
};

describe('Login modal flow', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Modal should be contain a valid form, input, and button', async () => {
    render(<MockLoginModal />);
    const modal = screen.getByRole('presentation');
    const input = screen.getByRole('textbox', { name: /email/i });
    const inputLabel = within(modal).getByText(/email/i);
    const button = screen.getByRole('button', { name: /submit/i });
    const form = screen.getByTestId('form');
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
    const button = screen.getByRole('button', { name: /submit/i });
    const alert = screen.getByRole('alert');
    await user.type(input, 'test@test');
    await user.click(button);
    expect(input).toHaveValue('test@test');
  });

  test('User should be able to submit a valid email', async () => {
    mockLoginRequest.mockImplementation(async () => StatusCodes.OK);
    render(<MockLoginModal />);
    const input = screen.getByRole('textbox', { name: /email/i });
    const button = screen.getByRole('button', { name: /submit/i });
    const alert = screen.getByRole('alert');
    await user.type(input, 'test@test.com');
    await user.click(button);
    expect(mockLoginRequest).toHaveBeenCalledTimes(1);

    expect(button).toBeDisabled();
  });

  // test('User should get too many requests error.', async () => {
  //   mockLoginRequest.mockImplementation(async () => StatusCodes.TOO_MANY_REQUESTS);
  //   render(<MockLoginModal />);
  //   const input = screen.getByRole('textbox', { name: /email/i });
  //   const button = screen.getByRole('button', { name: /submit/i });
  //   const alert = screen.getByRole('alert');
  //   expect(alert).toHaveTextContent('');
  //   await user.type(input, 'test@test.com');
  //   await user.click(button);
  //   expect(mockLoginRequest).toHaveBeenCalledTimes(5);
  //   expect(alert).toHaveTextContent(/too many requests/i);
  // });
});
