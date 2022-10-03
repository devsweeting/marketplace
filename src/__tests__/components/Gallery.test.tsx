import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { Gallery } from '@/components/Gallery';
import { themeJump } from '@/styles/themeJump';
import { mockGalleryImages } from '@/__mocks__/mockApiData';
import { withTestRouter } from '../utils/TestRouter';
import user from '@testing-library/user-event';
import type { IGalleryProps } from '@/components/Gallery/Gallery';
import type { IMedia } from '@/types/assetTypes';

const mockMedia = mockGalleryImages.map(
  (image, index): IMedia => ({
    id: index.toString(),
    description: `description ${index}`,
    file: `filename${index}`,
    ...image,
  }),
);

const MockGallery = ({ images }: IGalleryProps) => {
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
    render(<MockGallery images={mockMedia} />);
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
    render(<MockGallery images={mockMedia} />);
    const images = screen.getAllByRole('img') as HTMLImageElement[];

    await Promise.all([
      images.map(async (image) => {
        await user.click(image);
        const mainImage = screen.getByRole('img', {
          name: 'main-gallery-image',
        }) as HTMLImageElement;
        expect(mainImage).toBeVisible();
        expect(mainImage.src).toBe(image.src);
      }),
    ]);
  });
});
