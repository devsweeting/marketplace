import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Navbar } from '../../../components/Navbar';
import { NavLinksProps } from '../../../components/Navbar/Navbar';
import { ThemeProvider } from '@mui/material';
import theme from '../../../../styles/theme';
import { mockNavLinks } from '../../../__mocks__/mockApiData';

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
    <ThemeProvider theme={theme}>
      <Navbar navLinks={navLinks} />
    </ThemeProvider>
  );
};

describe('Navbar', () => {
  it('it should render links with correct hrefs ', () => {
    render(<MockNavbar navLinks={mockNavLinks} />);

    expect(screen.queryAllByRole('link')).toHaveLength(2);
    expect(screen.queryByRole('link', { name: mockNavLinks[0].title })).toHaveAttribute(
      'href',
      mockNavLinks[0].path,
    );
    expect(screen.queryByRole('link', { name: mockNavLinks[1].title })).toHaveAttribute(
      'href',
      mockNavLinks[1].path,
    );
  });
});
