import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { PortfolioHeaderTabs } from '@/components/PortfolioPage/PortfolioHeaderTabs/PortfolioHeaderTabs';
import { themeJump } from '@/styles/themeJump';
import { withTestRouter } from '../../utils/TestRouter';
import user from '@testing-library/user-event';

const tabs = ['Overview', 'Watchlist', 'Transactions'];
const PortfolioCategories = tabs.map((tab) => tab.toLowerCase());
const push = jest.fn();
const mockHandleClose = jest.fn();

const MockPortfolioHeaderTabs: React.FC<{
  activePortfolioCategory: string;
}> = ({ activePortfolioCategory }) => {
  return withTestRouter(
    <ThemeProvider theme={themeJump}>
      <PortfolioHeaderTabs
        tabs={tabs}
        activePortfolioCategory={activePortfolioCategory}
        OnClick={mockHandleClose}
      />
    </ThemeProvider>,
    { push, asPath: '/account' },
  );
};

describe('Portfolio Header Tabs', () => {
  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should contain all of the content', async () => {
    render(<MockPortfolioHeaderTabs activePortfolioCategory={PortfolioCategories[0]} />);
    const title = await screen.findByText(/portfolio/i);
    const overviewTabText = await screen.findByText(/overview/i);
    const watchlistTabText = await screen.findByText(/watchlist/i);
    const transactionsTabText = await screen.findByText(/transactions/i);
    const tabLinks = await screen.findAllByRole('link');

    expect(title).toBeInTheDocument();
    expect(overviewTabText).toBeInTheDocument();
    expect(watchlistTabText).toBeInTheDocument();
    expect(transactionsTabText).toBeInTheDocument();
    expect(tabLinks[0]).toBeInTheDocument();
    expect(tabLinks[0]).toHaveAttribute('href', '/account?tab=overview');
    expect(tabLinks[1]).toBeInTheDocument();
    expect(tabLinks[1]).toHaveAttribute('href', '/account?tab=watchlist');
    expect(tabLinks[2]).toBeInTheDocument();
    expect(tabLinks[2]).toHaveAttribute('href', '/account?tab=transactions');

    expect(overviewTabText).toHaveStyle('color: black;');
    expect(watchlistTabText && transactionsTabText).toHaveStyle('color: rgb(107, 114, 128);');
    expect(tabLinks[0]).toHaveStyle('text-decoration: none; border-bottom: 2px solid black;');
    expect(tabLinks[1] && tabLinks[1]).toHaveStyle(
      'text-decoration: none; border-bottom: 2px solid transparent;',
    );
  });

  test('links should be clickable', async () => {
    render(<MockPortfolioHeaderTabs activePortfolioCategory={PortfolioCategories[0]} />);
    const tabLinks = await screen.findAllByRole('link');
    await user.click(tabLinks[0]);
    expect(push).toHaveBeenCalledWith('/account?tab=overview', '/account?tab=overview', {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
    await user.click(tabLinks[1]);
    expect(push).toHaveBeenCalledWith('/account?tab=watchlist', '/account?tab=watchlist', {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
    await user.click(tabLinks[2]);
    expect(push).toHaveBeenCalledWith('/account?tab=transactions', '/account?tab=transactions', {
      locale: undefined,
      scroll: undefined,
      shallow: undefined,
    });
  });
});
