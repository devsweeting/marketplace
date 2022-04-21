import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Gallery } from '../../components/Gallery';
import { ThemeProvider } from '@mui/material';
import theme from '../../../styles/theme';
import { mockProducImages } from '../../__mocks__/mockApiData';

const MockGallery = ({ images }: { images: string[] }) => {
  return (
    <ThemeProvider theme={theme}>
      <Gallery images={images} />
    </ThemeProvider>
  );
};

describe('MockGallery', () => {
  it('should render images from props and change main image on click', async () => {
    render(<MockGallery images={mockProducImages} />);

    const mainImageElement = screen.queryByRole('img', { name: 'Picture of the product' });
    expect(mainImageElement).toBeVisible();
    expect(mainImageElement).toHaveAttribute('src', mockProducImages[0]);

    expect(screen.queryAllByRole('img', { name: 'product thumbnail' })).toHaveLength(3);

    const secondThumbnailElement = screen.queryAllByRole('img', { name: 'product thumbnail' })[1];

    fireEvent.click(secondThumbnailElement);
    waitFor(() => expect(mainImageElement).toHaveAttribute('src', mockProducImages[1]));
  });
});
