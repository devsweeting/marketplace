import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { Gallery } from '@/components/Gallery';
import { themeJump } from '@/styles/themeJump';
import { mockProductImages } from '@/__mocks__/mockApiData';
import '@testing-library/jest-dom/extend-expect';
import { withTestRouter } from '../helpers/TestRouter';

const MockGallery = ({ images }: { images: string[] }) => {
  return withTestRouter(
    <ThemeProvider theme={themeJump}>
      <Gallery images={images} />
    </ThemeProvider>,
    {
      asPath: '/item/',
    },
  );
};

describe('MockGallery', () => {
  it('should render images from props and change main image on click', async () => {
    render(<MockGallery images={mockProductImages} />);

    const mainImageElement = screen.getByRole('img', { name: 'main asset image' });

    expect(mainImageElement).toBeVisible();

    expect(screen.queryAllByRole('img' as any)).toHaveLength(4);

    const secondThumbnailElement = screen.queryAllByRole('img', { name: 'product thumbnail' })[1];

    fireEvent.click(secondThumbnailElement);
    waitFor(() => expect(mainImageElement).toHaveAttribute('src', mockProductImages[1]));
  });
});
