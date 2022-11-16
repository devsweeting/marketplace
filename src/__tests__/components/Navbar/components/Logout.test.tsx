import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { Logout } from '@/components/Navbar/components/Logout';
import { themeJump } from '@/styles/themeJump';
import { TestRouter } from '../../../utils/TestRouter';
const push = jest.fn();
const MockLogout = () => {
  return (
    <TestRouter router={{ push, asPath: '/' }}>
      <ThemeProvider theme={themeJump}>
        <Logout>Logout </Logout>
      </ThemeProvider>
    </TestRouter>
  );
};

describe('Logout', () => {
  test('Logout button exists', () => {
    render(<MockLogout />);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('Logout redirects to logout route', async () => {
    render(<MockLogout />);
    const logoutButton = screen.getByText(/logout/i);
    await user.click(logoutButton);
    expect(push).toHaveBeenCalledWith('/logout');
  });
});
