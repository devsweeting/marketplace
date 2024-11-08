import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { Hero } from '@/components/Hero';
import type { HeroProps } from '@/components/Hero/Hero';
import { themeJump } from '@/styles/themeJump';

const MockHero: React.FC<HeroProps> = ({ imgSrc, imgFit, imgHeight, imgAlt }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <Hero imgSrc={imgSrc} imgFit={imgFit} imgHeight={imgHeight} imgAlt={imgAlt} />
    </ThemeProvider>
  );
};

describe('Hero', () => {
  const mockImageAlt = 'alt text';
  const mockImageFit = 'cover';
  const mockImageSrc = '/public/images/detail_page.png';

  it('should render with provided image and props', () => {
    render(
      <MockHero
        imgSrc={mockImageSrc}
        imgFit={mockImageFit}
        imgHeight={163}
        imgAlt={mockImageAlt}
      />,
    );

    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeTruthy();
    expect(imageElement).toHaveAttribute('alt', mockImageAlt);
    expect(imageElement).toHaveStyle(`object-fit: ${mockImageFit}`);
  });

  it('should render without image element when no image source provided', () => {
    render(
      <MockHero imgSrc={undefined} imgFit={mockImageFit} imgHeight={163} imgAlt={mockImageAlt} />,
    );
    expect(screen.queryByRole('img')).toBeNull();
  });
});
