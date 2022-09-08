import { render } from '@testing-library/react';
import HomePage from '../pages';
import { withTestRouter } from './utils/TestRouter';
import { themeJump } from '@/styles/themeJump';
import { ThemeProvider } from '@mui/material';
const push = jest.fn();
const MockHomePage = () => {
  return withTestRouter(
    <ThemeProvider theme={themeJump}>
      <HomePage />
    </ThemeProvider>,
    { push, asPath: '/' },
  );
};
describe('HomePage', () => {
  it('renders page', () => {
    render(<MockHomePage />);
    //TODO - add more test to home page
  });
});
