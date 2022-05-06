import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DetailPage from '../../pages/item/[...param]';
import { ThemeProvider } from '@mui/material';
import theme from '../../../styles/themeJump';
import { mockedApiData } from '../../__mocks__/mockApiData';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: 'token-detail',
      query: ['0x54aE5302774dB6F54A52E7B6De1b0a9B3bd94185', '920d16d7-208f-4955-98c2-f41bee527f08'],
      asPath: '',
    };
  },
}));

const MockDetailPage = ({ nftData }: { nftData: any }) => {
  return (
    <ThemeProvider theme={theme}>
      <DetailPage nftData={nftData} />
    </ThemeProvider>
  );
};

describe('DetailPage', () => {
  it('it should render with the fetched content ', async () => {
    render(<MockDetailPage nftData={mockedApiData} />);

    // waitFor(() => expect(screen.getByText(mockedApiData.name)).toBeInTheDocument());
    waitFor(() => expect(screen.getByText(mockedApiData.description)).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('Contact ID')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('Token ID')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('Token Type')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('Token Type')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('Supply')).toBeInTheDocument());
    waitFor(() => expect(screen.getByText('Blockchain')).toBeInTheDocument());

    // mockedApiData.traits.map((trait: Record<string, string>) =>
    //   expect(screen.getByText(trait.value)).toBeInTheDocument(),
    // );
  });
});
