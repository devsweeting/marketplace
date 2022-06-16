import React from 'react';
import { render, screen, waitFor, queries } from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@mui/material';
import { Logout } from '@/components/Navbar/components/Logout';
import { themeJump } from '@/styles/themeJump';
import { withTestRouter } from '../../../helpers/TestRouter';
const push = jest.fn();
const MockLogout = () => {
  return withTestRouter(
    <ThemeProvider theme={themeJump}>
      <Logout />
    </ThemeProvider>,
    { push, asPath: '/' },
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
