// eslint-disable-next-line import/default
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { ProductCard } from '@/components/ProductCard';
import type { ProductDataProps } from '@/components/ProductCard/ProductCard';
// eslint-disable-next-line import/no-unresolved
import { themeJump } from '@/styles/themeJump';
// eslint-disable-next-line import/no-unresolved
import { mockProductData } from '@/__mocks__/mockApiData';
import '@testing-library/jest-dom/extend-expect';
import { withTestRouter } from '../helpers/TestRouter';

const MockProductCard: React.FC<{ cardData: ProductDataProps }> = ({ cardData }) => {
  return withTestRouter(
    <ThemeProvider theme={themeJump}>
      <ProductCard cardData={cardData} />
    </ThemeProvider>,
    { asPath: '/item/sint-et-culpa-fugiat' },
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
