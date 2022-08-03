import { render, screen } from '@testing-library/react';
import { mockAssetResponse } from '@/__mocks__/mockAssetResponse';
import { MarketCard } from '@/components/FeaturedMarketCarousel/components/MarketCard/';
import { ThemeProvider } from '@mui/material';
import { themeJump } from '@/styles/themeJump';
import type { IAsset } from '@/types/assetTypes';
const assetData: [IAsset] = mockAssetResponse.items as unknown as [IAsset];

const MockMarketCard = () => {
  return (
    <ThemeProvider theme={themeJump}>
      {assetData.map((asset, index) => (
        <MarketCard asset={asset} key={index} />
      ))}
    </ThemeProvider>
  );
};

test('should accept imageAlt props', () => {
  render(<MockMarketCard />);

  const altText = screen.queryAllByAltText('front');
  expect(altText).toBeInTheDocument;
});
