import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { ProductCard } from '@/components/ProductCard';
import type { ProductDataProps } from '@/components/ProductCard/ProductCard';
import { themeJump } from '@/styles/themeJump';
import { mockProductData } from '@/__mocks__/mockApiData';
import '@testing-library/jest-dom/extend-expect';

const MockProductCard: React.FC<{ cardData: ProductDataProps }> = ({ cardData }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <ProductCard cardData={cardData} />
    </ThemeProvider>
  );
};

describe('ProductCard', () => {
  it('should render component from props', () => {
    render(<MockProductCard cardData={mockProductData} />);

    expect(screen.getByText(mockProductData.title)).toBeVisible();

    const watchNumberElement = screen.getByTestId('watchNumberId').textContent;
    expect(watchNumberElement).toMatch(/2 watching/i);

    expect(screen.getByRole('img', { name: 'etherum icon' })).toBeVisible();

    expect(screen.getByText(mockProductData.price.cryptoValue)).toBeVisible();
    const dollarValueElement = screen.getByTestId('dollarValueId').textContent;
    expect(dollarValueElement).toMatch(/6234.33/i);

    expect(screen.getByRole('img', { name: 'brand brand_a' })).toBeVisible();
    expect(screen.getByRole('img', { name: 'verified icon' })).toBeVisible();

    expect(screen.getByText(mockProductData.brand.name)).toBeVisible();
  });
});
