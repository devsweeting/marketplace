import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { Button } from '@/components/Button/index';
import { themeJump } from '@/styles/themeJump';
import '@testing-library/jest-dom/extend-expect';
import user from '@testing-library/user-event';

const handleClick = jest.fn();
const mockVariant = 'outlined';
const MockButton = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <Button variant={mockVariant} onClick={handleClick}>
        Click me!
      </Button>
    </ThemeProvider>
  );
};

describe('Button', () => {
  it('it should render "outlined" button with children and call handleClick on click', async () => {
    render(<MockButton />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('MuiButtonBase-root');
    expect(screen.getByText('Click me!')).toBeTruthy();

    await user.click(buttonElement);
    await waitFor(async () => await expect(handleClick).toHaveBeenCalledTimes(1));
  });
});
