import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { FeaturedMarketCarousel } from '@/components/FeaturedMarketCarousel';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';

const handleDrawer = jest.fn();

const MockFeaturedMarketCarousel = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <FeaturedMarketCarousel handleDrawer={handleDrawer} />
    </ThemeProvider>
  );
};

test('Carousel slide buttons should be displayed and change on click', async () => {
  render(<MockFeaturedMarketCarousel />);
  let slideButton = screen.queryAllByRole('button');
  expect(slideButton[0]).toBeInTheDocument();
  expect(slideButton[0]).toHaveClass('next');
  await user.click(slideButton[0]);
  slideButton = screen.queryAllByRole('button');
  expect(slideButton[0]).toBeInTheDocument();
  expect(slideButton[0]).toHaveClass('prev');
});
