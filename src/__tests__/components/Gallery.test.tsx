import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { Gallery } from '@/components/Gallery';
import { themeJump } from '@/styles/themeJump';
import { mockGalleryImages } from '@/__mocks__/mockApiData';
import '@testing-library/jest-dom/extend-expect';
import { withTestRouter } from '../helpers/TestRouter';
import user from '@testing-library/user-event';

type Image = {
  title: string;
  description?: string;
  url: string;
  sortOrder: number;
  assetId: string;
  fileId: string;
  file: string;
};

const MockGallery = ({ images }: { images: Image[] }) => {
  return withTestRouter(
    <ThemeProvider theme={themeJump}>
      <Gallery images={images} />
    </ThemeProvider>,
    {
      asPath: '/item/rerum-qui-doloremque-sit',
    },
  );
};
describe('Gallery', () => {
  test('Gallery should have images with src and alt', async () => {
    render(<MockGallery images={mockGalleryImages} />);
    const images = screen.getAllByRole('img');
    images.map((image) => {
      expect(image).toBeTruthy();
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src');
      expect(image).toHaveAttribute('alt');
    });
    expect(screen.queryAllByRole('img' as any)).toHaveLength(4);
  });

  test('Gallery image switches on click', async () => {
    render(<MockGallery images={mockGalleryImages} />);
    const images = screen.getAllByRole('img') as HTMLImageElement[];
    const firstImage = images[0];
    expect(firstImage).toHaveAttribute('srcs');

    // await images.map(async (image) => {
    //   await user.click(image);
    //   const mainImage = screen.getByRole('img') as HTMLImageElement;
    //   expect(mainImage).toBeVisible();
    //   expect(mainImage.src).toBe(image.src);
    // });
  });
});
