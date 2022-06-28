import { UserPane } from '@/components/Navbar/components/UserPane';
import { themeJump } from '@/styles/themeJump';
import { ThemeProvider } from '@mui/styles';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

// import preview from 'jest-preview';
import React from 'react';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
    };
  },
}));

const MockUserPane = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <UserPane />
    </ThemeProvider>
  );
};
describe('UserPane', () => {
  test('should be clickable', async () => {
    render(<MockUserPane />);
    const userPanelBtn = screen.getByRole('button');
    await user.click(userPanelBtn);
    // preview.debug();
  });
});
