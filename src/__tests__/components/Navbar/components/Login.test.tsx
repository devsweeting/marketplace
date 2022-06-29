import { render, screen } from '@testing-library/react';
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

describe('Login', () => {
  test('Login button exists', () => {
    render(<MockLogin />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
