import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchBox } from '../../components/SearchBox';
import { ThemeProvider } from '@mui/material';
import theme from '../../../styles/theme';

const MockSearchBox = () => {
  return (
    <ThemeProvider theme={theme}>
      <SearchBox />
    </ThemeProvider>
  );
};

describe('SearchBox', () => {
  it('should render component', () => {
    render(<MockSearchBox />);
    expect(screen.getByRole('textbox', { name: 'search' })).toHaveAttribute(
      'placeholder',
      'Search…',
    );
  });
});
