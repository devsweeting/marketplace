/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/default
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import DetailPage from '@/pages/item/[...param]';
import { themeJump } from '@/styles/themeJump';
import { mockedApiData } from '@/__mocks__/mockApiData';
import '@testing-library/jest-dom/extend-expect';

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
    <ThemeProvider theme={themeJump}>
      <DetailPage nftData={nftData} />
    </ThemeProvider>
  );
};

describe('DetailPage', () => {
  it('should render with the fetched content ', async () => {
    render(<MockDetailPage nftData={mockedApiData} />);
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
