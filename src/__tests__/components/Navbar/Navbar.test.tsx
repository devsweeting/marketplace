import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { Navbar } from '@/components/Navbar';
import type { NavLinksProps } from '@/components/Navbar/Navbar';
import { themeJump } from '@/styles/themeJump';
import { mockNavLinks } from '@/__mocks__/mockApiData';
import '@testing-library/jest-dom/extend-expect';
import { withTestRouter } from '../../utils/TestRouter';
import user from '@testing-library/user-event';
//TODO - account for when the user is logged in and when they are not logged in
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
    };
  },
}));

const push = jest.fn();
const MockNavbar: React.FC<{ navLinks: NavLinksProps }> = ({ navLinks }) => {
  return withTestRouter(
    <ThemeProvider theme={themeJump}>
      <Navbar navLinks={navLinks} />
    </ThemeProvider>,
    { push, asPath: '/' },
  );
};

describe('Navbar', () => {
  it('it should render links with correct hrefs ', () => {
    render(<MockNavbar navLinks={mockNavLinks} />);
    const navLinks = screen.getAllByRole('link');
    const login = screen.getByText(/login/i);

    expect(navLinks[0]).toHaveAttribute('href', mockNavLinks[0].path);
    expect(navLinks[1]).toHaveAttribute('href', mockNavLinks[1].path);
    expect(login).toBeInTheDocument();
    expect(navLinks[0]).toBeTruthy();
    expect(navLinks[1]).toBeTruthy();
  });

  test('links should be clickable', async () => {
    render(<MockNavbar navLinks={mockNavLinks} />);
    const navLinks = screen.getAllByRole('link');

    await user.click(navLinks[0]);
    expect(push).toHaveBeenCalledWith(
      mockNavLinks[0].path,
      mockNavLinks[0].path,
      expect.anything(),
    );
    await user.click(navLinks[1]);
    expect(push).toHaveBeenCalledWith(
      mockNavLinks[1].path,
      mockNavLinks[1].path,
      expect.anything(),
    );
  });

  test('Navbar should render with searchbar', async () => {
    render(<MockNavbar navLinks={mockNavLinks} />);
    const searchbar = screen.getByTestId('SearchIcon');

    expect(searchbar).toBeInTheDocument();
  });
});
