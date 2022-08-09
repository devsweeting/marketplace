/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/default
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import DetailPage from '@/pages/item/[...param]';
import { themeJump } from '@/styles/themeJump';
import '@testing-library/jest-dom/extend-expect';
import { mockAssetResponse } from '@/__mocks__/mockAssetResponse';
import type { IAsset } from '@/types/assetTypes';

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

const MockDetailPage = ({ nftData }: { nftData: IAsset }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <DetailPage nftData={nftData} />
    </ThemeProvider>
  );
};

describe('DetailPage', () => {
  it('should render with the fetched content ', async () => {
    render(<MockDetailPage nftData={mockAssetResponse.items[0]} />);
    test.todo;
  });
});
