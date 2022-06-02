import React from 'react';
import { render, screen, fireEvent, waitFor, getByText, findByText } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { Login } from '../../../../components/Login/components';
import theme from '@/styles/themeJump';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
const mockChildren = 'mockedChildren';

const MockLogin = () => {
    return (
        <ThemeProvider theme={theme}>
        <Login />
        </ThemeProvider>
    );
}

describe('Login', () => {
     it('should render login modal form', async () => {
        render(<MockLogin />);
      expect(screen.getByText('Login')).toBeInTheDocument();
      
        fireEvent.click(screen.getByText('Login'));
        const modal = await waitFor(() => screen.getByRole("presentation"));
        const button = modal.querySelector("#submit");
        fireEvent.click(button!);

});
});