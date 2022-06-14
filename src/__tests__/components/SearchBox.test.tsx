import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
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
  it('should render searchBox component and perform search', async () => {
    // Arrange
    const { container } = render(<MockSearchBox />);
    const button = screen.getByRole('button');
    const form = container.querySelector('form');
    const onSubmit = jest.fn((e) => {
      e.preventDefault();
    });
    form && form.addEventListener('submit', onSubmit);

    // Act
    await user.type(screen.getByPlaceholderText('Search'), 'test');
    await user.click(button);

    // Assertions
    expect(onSubmit).toHaveBeenCalled();
    expect(screen.getAllByPlaceholderText('Search')[0]).toHaveValue('test');
    expect(container).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'search' })).toHaveAttribute('aria-label', 'search');
  });
});
