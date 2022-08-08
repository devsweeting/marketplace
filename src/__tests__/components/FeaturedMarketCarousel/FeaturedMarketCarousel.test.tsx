import { render, screen } from '@testing-library/react';
import { FeaturedMarketCarousel } from '@/components/FeaturedMarketCarousel';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';

const handleDrawer = jest.fn();

const MockFeaturedMarketCarousel = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <FeaturedMarketCarousel handleDrawer={handleDrawer} assets={[]} title={''} />
    </ThemeProvider>
  );
};

test('Carousel slide buttons should be displayed', async () => {
  render(<MockFeaturedMarketCarousel />);
  const nextBtn = screen.getByLabelText('next');
  const prevBtn = screen.getByLabelText('previous');
  expect(nextBtn).toBeInTheDocument();
  expect(prevBtn).toBeInTheDocument();
});
