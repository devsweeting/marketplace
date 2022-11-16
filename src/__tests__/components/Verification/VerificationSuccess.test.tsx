import { VerificationSuccess } from '@/components/Verification/Success';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestRouter } from '@/__tests__/utils/TestRouter';

const back = jest.fn();
const redirect = jest.fn(() => back());

const MockVerificationSuccess = () => {
  return (
    <TestRouter router={{ back, asPath: '/verify' }}>
      <ThemeProvider theme={themeJump}>
        <VerificationSuccess redirect={redirect} />
      </ThemeProvider>
    </TestRouter>
  );
};

describe('VerificationSuccess', () => {
  it('should redirect back the previous page', async () => {
    render(<MockVerificationSuccess />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(back).toHaveBeenCalled();
  });
});
