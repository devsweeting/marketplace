import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { ProductCard } from '@/components/ProductCard';
import type { ProductDataProps } from '@/components/ProductCard/ProductCard';
import { themeJump } from '@/styles/themeJump';
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
