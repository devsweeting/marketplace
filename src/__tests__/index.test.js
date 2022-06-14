import { render, screen } from '@testing-library/react';
import HomePage from '../pages';

describe('HomePage', () => {
  it('renders page', () => {
    render(<HomePage />);
    expect(screen.getByText(/nft detail view/i)).toBeInTheDocument();
    expect(screen.getByText(/list view/i)).toBeInTheDocument();
  });
});
