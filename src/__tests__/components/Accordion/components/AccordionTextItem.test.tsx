import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { AccordionTextItem } from '@/components/Accordion/components/AccordionTextItem';
import type { AccordionTextItemProps } from '@/components/Accordion/components/AccordionTextItem/AccordionTextItem';
import { themeJump } from '@/styles/themeJump';

const mockTitle = 'mockedTitle';
const mockIsExpanded = true;
const mockChildren = 'mocked children props';
const MockAccordionTextItem: React.FC<AccordionTextItemProps> = ({
  title,
  isExpanded,
  children,
}) => {
  return (
    <ThemeProvider theme={themeJump}>
      <AccordionTextItem title={title} isExpanded={isExpanded}>
        {children}
      </AccordionTextItem>
    </ThemeProvider>
  );
};

describe('AccordionTextItem', () => {
  it('should render OPEN AccordionTextItem and the rest of the props', () => {
    render(
      <MockAccordionTextItem title={mockTitle} isExpanded={mockIsExpanded}>
        {mockChildren}
      </MockAccordionTextItem>,
    );

    expect(screen.getByText(mockTitle)).toBeVisible();
    expect(screen.queryByText(mockChildren)).toBeVisible();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('aria-expanded', 'true');
  });

  it('should render CLOSED AccordionTextItem and the rest of the props', () => {
    const mockIsExpanded = false;
    render(
      <MockAccordionTextItem title={mockTitle} isExpanded={mockIsExpanded}>
        {mockChildren}
      </MockAccordionTextItem>,
    );

    expect(screen.getByText(mockTitle)).toBeVisible();
    expect(screen.queryByText(mockChildren)).not.toBeVisible();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('aria-expanded', 'false');
  });
});
