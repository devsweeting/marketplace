import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AccordionTextItem } from '../../../../components/Accordion/components/AccordionTextItem';
import { AccordionTextItemProps } from '../../../../components/Accordion/components/AccordionTextItem/AccordionTextItem';
import { ThemeProvider } from '@mui/material';
import theme from '../../../../../styles/theme';

const MockAccordionTextItem: React.FC<AccordionTextItemProps> = ({
  title,
  isExpanded,
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <AccordionTextItem title={title} isExpanded={isExpanded}>
        {children}
      </AccordionTextItem>
    </ThemeProvider>
  );
};

describe('AccordionTextItem', () => {
  const mockTitle = 'mockedTitle';
  const mockIsExpanded = true;
  const mockChildren = 'mocked children props';

  it('should render OPEN AccordionTextItem and the rest of the props', () => {
    render(
      <MockAccordionTextItem
        title={mockTitle}
        children={mockChildren}
        isExpanded={mockIsExpanded}
      />,
    );

    expect(screen.getByText(mockTitle)).toBeVisible();
    expect(screen.queryByText(mockChildren)).toBeVisible();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('aria-expanded', 'true');
  });

  it('should render CLOSED AccordionTextItem and the rest of the props', () => {
    const mockIsExpanded = false;
    render(
      <MockAccordionTextItem
        title={mockTitle}
        children={mockChildren}
        isExpanded={mockIsExpanded}
      />,
    );

    expect(screen.getByText(mockTitle)).toBeVisible();
    expect(screen.queryByText(mockChildren)).not.toBeVisible();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('aria-expanded', 'false');
  });
});
