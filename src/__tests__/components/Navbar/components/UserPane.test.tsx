import { UserPane } from '@/components/Navbar/components/UserPane';
import { userPanelLinks } from '@/domain/userPaneLink';
import { themeJump } from '@/styles/themeJump';
import { withTestRouter } from '@/__tests__/utils/TestRouter';
import { ThemeProvider } from '@mui/styles';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import React from 'react';

const mockLinks = userPanelLinks;
const mockUser = {
  id: '123321123',
  email: 'email@email.com',
};
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
    };
  },
}));
const push = jest.fn();

const MockUserPane = () => {
  return withTestRouter(
    <ThemeProvider theme={themeJump}>
      <UserPane user={mockUser} />
    </ThemeProvider>,
    { push, asPath: '/' },
  );
};
describe('UserPane', () => {
  test('should be clickable', async () => {
    render(<MockUserPane />);
    const userPanelBtn = screen.getByRole('button');
    await user.click(userPanelBtn);
    expect(screen.getByText(/logout/i)).toBeInTheDocument;
  });

  test('should have all the links associated with user panel', async () => {
    render(<MockUserPane />);
    const userPanelBtn = screen.getByRole('button');
    await user.click(userPanelBtn);
    mockLinks.map((link) => {
      expect(screen.getByRole('link', { name: link.title })).toHaveAttribute('href', link.path);
    });
  });

  test('should route to specific link', async () => {
    render(<MockUserPane />);
    const userPanelBtn = screen.getByRole('button');
    await user.click(userPanelBtn);
    mockLinks.map(async (link) => {
      const linkBtn = screen.getByRole('link', { name: link.title });
      await user.click(linkBtn);
      expect(push).toHaveBeenCalledWith(link.path, link.path, expect.anything());
    });
  });
});
