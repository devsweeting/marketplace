import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { NavLink } from '@/components/Navbar/components/NavLink';
import theme from '@/styles/themeJump';
import '@testing-library/jest-dom/extend-expect';

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
    <ThemeProvider theme={theme}>
      <NavLink href={mockHref}>{mockChildren}</NavLink>
    </ThemeProvider>
  );
};

describe('NavLink', () => {
  it('should render link with properties from props', () => {
    render(<MockNavLink />);
    expect(screen.getByRole('link', { name: mockChildren })).toHaveAttribute(
      'href',
      `/${mockHref}`,
    );
  });
});
