import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { SearchBox } from '@/components/SearchBox';
import { themeJump } from '@/styles/themeJump';
import { axe } from 'jest-axe';
const MockSearchBox = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <SearchBox />
    </ThemeProvider>
  );
};

describe('SearchBox', () => {
  it('should render searchBox component and perform search', async () => {
    // Arrange
    render(<MockSearchBox />);
    const button = screen.getByRole('button');
    const searchBar = screen.getByRole('search');
    const formViolations = await axe(searchBar ?? '');
    const onSubmit = jest.fn((e) => {
      e.preventDefault();
    });
    searchBar && searchBar.addEventListener('submit', onSubmit);

    // Act
    await user.type(screen.getByPlaceholderText('Search'), 'test');
    await user.click(button);

    // Assertions
    expect(onSubmit).toHaveBeenCalled();
    expect(screen.getAllByPlaceholderText('Search')[0]).toHaveValue('test');
    expect(searchBar).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'search' })).toHaveAttribute('aria-label', 'search');
    expect(formViolations).toHaveNoViolations();
  });
});
