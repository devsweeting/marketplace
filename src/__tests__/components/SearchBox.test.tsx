import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { SearchBox } from '@/components/SearchBox';
import { themeJump } from '@/styles/themeJump';
import '@testing-library/jest-dom/extend-expect';

const MockSearchBox = () => {
  return (
    <ThemeProvider theme={themeJump}>
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
