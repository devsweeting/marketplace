import { render } from '@testing-library/react';
import HomePage from '../pages';
import { TestRouter } from './utils/TestRouter';
import { themeJump } from '@/styles/themeJump';
import { ThemeProvider } from '@mui/material';
import { ModalContextProvider } from '@/helpers/auth/ModalContext';
const push = jest.fn();
const MockHomePage = () => {
  return (
    <TestRouter router={{ push, asPath: '/' }}>
      <ThemeProvider theme={themeJump}>
        <ModalContextProvider>
          <HomePage />
        </ModalContextProvider>
      </ThemeProvider>
    </TestRouter>
  );
};
describe('HomePage', () => {
  it('renders page', () => {
    render(<MockHomePage />);
    //TODO - add more test to home page
  });
});
