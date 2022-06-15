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

const MockProductCard = ({ name }: { name: ProductDataProps }) => {
  return withTestRouter(
    <ThemeProvider theme={themeJump}>
      <ProductCard name={name} />
    </ThemeProvider>,
    { asPath: '/item/' },
  );
};
const { name } = mockProductData;
test('Product card should render', () => {
  render(<MockProductCard name={name} />);
  const headElement = screen.getByRole('heading', { name: mockProductData.name });
  const shareButton = screen.getByTestId('ShareIcon');
  const addToWatchButton = screen.getByRole('button', { name: /add to watchlist/i });

  expect(headElement).toBeInTheDocument();
  expect(shareButton).toBeInTheDocument();
  expect(addToWatchButton).toBeInTheDocument();
});

// describe('ProductCard', () => {
//   it('should render component from props', () => {
//     render(<MockProductCard cardData={mockGalleryData} />);

//     expect(screen.getByText(mockGalleryData.title)).toBeVisible();

//     const watchNumberElement = screen.getByTestId('watchNumberId').textContent;
//     expect(watchNumberElement).toMatch(/2 watching/i);

//     expect(screen.getByRole('img', { name: 'etherum icon' })).toBeVisible();

//     expect(screen.getByText(mockGalleryData.price.cryptoValue)).toBeVisible();
//     const dollarValueElement = screen.getByTestId('dollarValueId').textContent;
//     expect(dollarValueElement).toMatch(/6234.33/i);

//     expect(screen.getByRole('img', { name: 'brand brand_a' })).toBeVisible();
//     expect(screen.getByRole('img', { name: 'verified icon' })).toBeVisible();

//     expect(screen.getByText(mockGalleryData.brand.name)).toBeVisible();
//   });
// });
