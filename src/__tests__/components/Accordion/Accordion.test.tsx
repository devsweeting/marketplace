import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { Accordion } from '@/components/Accordion';
import { themeJump } from '@/styles/themeJump';
import '@testing-library/jest-dom/extend-expect';

const MockAccordionChildren = () => {
  return <p>children component</p>;
};

const MockAccordion = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <Accordion>
        <MockAccordionChildren />
      </Accordion>
    </ThemeProvider>
  );
};

describe('Accordion', () => {
  it('it should render children from props', () => {
    render(<MockAccordion />);
    expect(screen.getByText(/children component/i)).toBeTruthy();
  });
});
