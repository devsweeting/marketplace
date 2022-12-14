import { LoginModal } from '@/components/LoginModal';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import user from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { loginRequest } from '@/api/endpoints/loginRequest';
import { StatusCodes } from 'http-status-codes';
import { ModalContext } from '@/helpers/auth/ModalContext';
import { TestRouter } from '@/__tests__/utils/TestRouter';

jest.mock('@/api/endpoints/loginRequest');

const mockLoginRequest = loginRequest as unknown as jest.MockedFn<typeof loginRequest>;
const push = jest.fn();
const MockLoginModal = () => {
  return (
    <TestRouter router={{ push, asPath: '/' }}>
      <ThemeProvider theme={themeJump}>
        <ModalContext.Provider
          value={{ state: { login: true, verification: false }, dispatch: () => true }}
        >
          <LoginModal noDismiss={false} />
        </ModalContext.Provider>
      </ThemeProvider>
    </TestRouter>
  );
};

describe('Login modal flow', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Modal should be contain a valid form, input, and button', async () => {
    render(<MockLoginModal />);
    const title = await screen.findByRole('heading', {
      name: /login\/signup/i,
    });
    const input = await screen.findByRole('textbox', { name: /email/i });
    const inputLabel = await screen.findByLabelText(/email/i);
    const button = await screen.findByRole('button', { name: /submit/i });
    const form = await screen.findByRole('form');
    const formViolations = await axe(form ?? '');
    const alert = await screen.findByRole('alert');
    expect(form).toBeTruthy();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Login\/Signup/i);
    expect(input).toBeInTheDocument();
    expect(input).toBeTruthy();
    expect(input).toHaveAttribute('type', 'email');
    expect(inputLabel).toBeTruthy();
    expect(button).toBeInTheDocument();
    expect(button).toBeTruthy();
    expect(formViolations).toHaveNoViolations();
    expect(alert).toBeTruthy();
  });

  test('Input should be able to be filled', async () => {
    render(<MockLoginModal />);
    const input = await screen.findByRole('textbox', { name: /email/i });
    await user.type(input, 'test@test.com');
    expect(input).toHaveValue('test@test.com');
  });

  test('Input should not allow invalid fields', async () => {
    render(<MockLoginModal />);
    const input = await screen.findByRole('textbox', { name: /email/i });
    const button = await screen.findByRole('button', {
      name: /submit/i,
    });
    await user.type(input, 'test@test');
    await user.click(button);
    expect(input).toHaveValue('test@test');
    await user.click(button);
    //TODO: update tests for login modal
  });

  test('User should be able to submit a valid email', async () => {
    mockLoginRequest.mockImplementation(async () => StatusCodes.OK);
    render(<MockLoginModal />);
    const input = await screen.findByRole('textbox', { name: /email/i });
    const button = await screen.findByRole('button', {
      name: /submit/i,
    });
    await user.type(input, 'test@test.com');
    await user.click(button);
    expect(mockLoginRequest).toHaveBeenCalledTimes(1);
  });
});
