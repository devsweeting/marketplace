import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { mockPortfolioData } from '@/__mocks__/mockApiData';
import { themeJump } from '@/styles/themeJump';
import type { IPortfolioData } from '@/pages/account';
// eslint-disable-next-line import/no-unresolved
import { PortfolioStats } from '@/components/PortfolioPage/PortfolioStats/PortFolioStats';

const MockPortfolioStats: React.FC<{
  portfolio: IPortfolioData;
}> = ({ portfolio }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <PortfolioStats portfolio={portfolio} />
    </ThemeProvider>
  );
};

describe('Portfolio Stats', () => {
  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should render and contain all of the content', async () => {
    render(<MockPortfolioStats portfolio={mockPortfolioData} />);
    expect(await screen.findByText(/Portfolio Value/i)).toBeInTheDocument();
    expect(await screen.findByText(/Cash Balance/i)).toBeInTheDocument();
    expect(await screen.findByText(/Total Units/i)).toBeInTheDocument();
    expect(await screen.findByText('$13,338,165')).toBeInTheDocument();
    expect(await screen.findByText('$XXXX')).toBeInTheDocument();
    expect(await screen.findByText('184111')).toBeInTheDocument();
  });
});
