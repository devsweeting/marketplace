import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { Navbar } from '@/components/Navbar';
import type { NavLinksProps } from '@/components/Navbar/Navbar';
import { themeJump } from '@/styles/themeJump';
import { mockNavLinks } from '@/__mocks__/mockApiData';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
    };
  },
}));

const MockNavbar: React.FC<{ navLinks: NavLinksProps }> = ({ navLinks }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <Navbar navLinks={navLinks} />
    </ThemeProvider>
  );
};

describe('Navbar', () => {
  it('it should render links with correct hrefs ', () => {
    render(<MockNavbar navLinks={mockNavLinks} />);

    expect(screen.getByText(mockNavLinks[0].title)).toBeTruthy();
    expect(screen.getByText(mockNavLinks[1].title)).toBeTruthy();
  });
});
