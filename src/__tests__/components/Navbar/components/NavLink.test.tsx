import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { NavLink } from '@/components/Navbar/components/NavLink';
import { themeJump } from '@/styles/themeJump';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
    };
  },
}));

const mockHref = 'mockedHref';
const mockChildren = 'mockedChildren';

const MockNavLink = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <NavLink href={mockHref}>{mockChildren}</NavLink>
    </ThemeProvider>
  );
};

describe('NavLink', () => {
  it('should render link with properties from props', () => {
    render(<MockNavLink />);
    expect(screen.getByRole('link', { name: mockChildren })).toHaveAttribute('href', `${mockHref}`);
  });
});
