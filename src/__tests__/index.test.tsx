import { render } from '@testing-library/react';
import HomePage from '../pages';
import { withTestRouter } from './helpers/TestRouter';
const push = jest.fn();
const MockHomePage = () => {
  return withTestRouter(<HomePage />, { push, asPath: '/' });
};
describe('HomePage', () => {
  it('renders page', () => {
    render(<MockHomePage />);
    //TODO - add more test to home page
  });
});
