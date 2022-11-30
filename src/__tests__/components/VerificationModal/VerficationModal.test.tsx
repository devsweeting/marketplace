import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { ModalContext } from '@/helpers/auth/ModalContext';
import { VerificationModal } from '@/components/Modals/Verification';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestRouter } from '@/__tests__/utils/TestRouter';

const push = jest.fn();

const MockVerificationModal = () => {
  return (
    <TestRouter router={{ push }}>
      <ThemeProvider theme={themeJump}>
        <ModalContext.Provider
          value={{ state: { login: false, verification: true }, dispatch: () => true }}
        >
          <VerificationModal />
        </ModalContext.Provider>
      </ThemeProvider>
    </TestRouter>
  );
};

describe('VerificationModal', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should contain a redirect button', () => {
    render(<MockVerificationModal />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('should redirect to /verify', async () => {
    render(<MockVerificationModal />);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(push).toHaveBeenCalledWith('/verify');
  });
});
