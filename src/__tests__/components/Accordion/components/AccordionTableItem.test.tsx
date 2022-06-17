import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { AccordionTableItem } from '@/components/Accordion/components/AccordionTableItem';
import type { BlockChainInfoProps } from '@/components/Accordion/components/AccordionTableItem/AccordionTableItem';
import { themeJump } from '@/styles/themeJump';
import { mockTraits } from '@/__mocks__/mockApiData';

interface AccordionTableItemProps {
  title: string;
  tableData: BlockChainInfoProps;
  isExpanded: boolean;
}

const MockAccordionTableItem: React.FC<AccordionTableItemProps> = ({
  title,
  tableData,
  isExpanded,
}) => {
  return (
    <ThemeProvider theme={themeJump}>
      <AccordionTableItem title={title} tableData={tableData} isExpanded={isExpanded} />
    </ThemeProvider>
  );
};

describe('AccordionTableItem', () => {
  const mockTitle = 'mocked title';
  const mockIsExpanded = true;
  it('should render component according to props', () => {
    render(
      <MockAccordionTableItem
        title={mockTitle}
        isExpanded={mockIsExpanded}
        tableData={mockTraits}
      />,
    );

    expect(screen.getByRole('table')).toBeTruthy();
    expect(screen.getByRole('rowheader', { name: 'Contact ID' })).toBeVisible();
    expect(screen.getByRole('rowheader', { name: 'Token ID' })).toBeVisible();
    expect(screen.getByRole('rowheader', { name: 'Token Type' })).toBeVisible();
    expect(screen.getByRole('rowheader', { name: 'Supply' })).toBeVisible();
    expect(screen.getByRole('rowheader', { name: 'Blockchain' })).toBeVisible();

    expect(screen.getByText(mockTitle)).toBeVisible();

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('aria-expanded', 'true');
  });
});
