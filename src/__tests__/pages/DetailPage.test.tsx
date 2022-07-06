/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/default
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import DetailPage from '@/pages/item/[...param]';
import { themeJump } from '@/styles/themeJump';
import { mockedApiData } from '@/__mocks__/mockApiData';
import '@testing-library/jest-dom/extend-expect';

const user = {
  id: '3r3dd3r34r-t5t5fgf5t-43tf345rr345-werwer445',
};

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

const MockDetailPage = ({ nftData, user }: { nftData: any; user: any }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <DetailPage nftData={nftData} user={user} />
    </ThemeProvider>
  );
};

describe('DetailPage', () => {
  it('should render with the fetched content ', async () => {
    render(<MockDetailPage nftData={mockedApiData} user={user} />);
    // waitFor(() => expect(screen.getByText(mockedApiData.name)).toBeInTheDocument());
    expect(await screen.findByText(mockedApiData.description)).toBeInTheDocument();
    // await waitFor(() => expect(screen.findByText('Contact ID')).toBeInTheDocument());
    // await waitFor(() => expect(screen.findByText('Token ID')).toBeInTheDocument());
    // await waitFor(() => expect(screen.findByText('Token Type')).toBeInTheDocument());
    // await waitFor(() => expect(screen.findByText('Supply')).toBeInTheDocument());
    // await waitFor(() => expect(screen.findByText('Blockchain')).toBeInTheDocument());

    // mockedApiData.traits.map((trait: Record<string, string>) =>
    //   expect(screen.getByText(trait.value)).toBeInTheDocument(),
    // );
  });
});
