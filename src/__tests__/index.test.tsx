import { render, screen } from '@testing-library/react';
import HomePage from '../pages';
import user from '@testing-library/user-event';
import { Routes } from '@/domain/Routes';
import { withTestRouter } from './helpers/TestRouter';
const push = jest.fn();
const MockHomePage = () => {
  return withTestRouter(<HomePage />, { push, asPath: '/' });
};
describe('HomePage', () => {
  it('renders page', () => {
    render(<HomePage />);
    expect(screen.getByText(/nft detail view/i)).toBeInTheDocument();
    expect(screen.getByText(/list view/i)).toBeInTheDocument();
  });

  test('Should correctly switch pages on click', async () => {
    //TODO test for detailed view link with texts not from the array
    render(<MockHomePage />);
    const explore = expect.stringMatching(/explore/i);
    const detailed = Routes[1].path;
    const listViewLink = screen.getByText(/list view/i);
    const detailViewLink = screen.getByText(/nft detail view/i);
    expect(listViewLink).toHaveAttribute('href', explore);
    expect(detailViewLink).toHaveAttribute('href', detailed);
    await user.click(listViewLink);
    expect(push).toHaveBeenCalledWith(explore, explore, expect.anything());
    await user.click(detailViewLink);
    expect(push).toHaveBeenCalledWith(detailed, detailed, expect.anything());
  });
});
