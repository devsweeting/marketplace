import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Accordion } from '../../../components/Accordion';
import { ThemeProvider } from '@mui/material';
import theme from '../../../../styles/themeJump';

const MockAccordionChildren = () => {
  return <p>children component</p>;
};

const MockAccordion = () => {
  return (
    <ThemeProvider theme={theme}>
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
