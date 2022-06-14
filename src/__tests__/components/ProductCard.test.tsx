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
import { withTestRouter } from '../utils/TestRouter';
import user from '@testing-library/user-event';

const MockProductCard = ({ name }: { name: ProductDataProps }) => {
  return withTestRouter(
    <ThemeProvider theme={themeJump}>
      <ProductCard name={name} />
    </ThemeProvider>,
    { asPath: '/item/' },
  );
};
const { name } = mockProductData;

describe('ProductCard', () => {
  test('Product card should render', () => {
    render(<MockProductCard name={name} />);
    const headElement = screen.getByRole('heading', { name: mockProductData.name });
    const shareButton = screen.getByTestId('ShareIcon');
    const addToWatchButton = screen.getByRole('button', { name: /add to watchlist/i });

    expect(headElement).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    expect(addToWatchButton).toBeInTheDocument();
  });

  test('ShareIcon should display social media cards', async () => {
    render(<MockProductCard name={name} />);
    const shareButton = screen.getByTestId('ShareIcon');
    await user.click(shareButton);
    const facebook = screen.getByRole('button', { name: /facebook/i });
    const twitter = screen.getByRole('button', { name: /twitter/i });
    const linkedin = screen.getByRole('button', { name: /linkedin/i });
    const whatsapp = screen.getByRole('button', { name: /whatsapp/i });
    expect(facebook).toBeInTheDocument();
    expect(twitter).toBeInTheDocument();
    expect(linkedin).toBeInTheDocument();
    expect(whatsapp).toBeInTheDocument();
  });

  test('Add to watchlist button should be able to be clicked', async () => {
    render(<MockProductCard name={name} />);
    const addToWatchButton = screen.getByRole('button', { name: /add to watchlist/i });
    await user.click(addToWatchButton);
    //TODO add tests for add to watchlist button
  });
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
