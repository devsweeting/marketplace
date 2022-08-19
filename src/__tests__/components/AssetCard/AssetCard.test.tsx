import { AssetCard } from '@/components/AssetCard';
import { themeJump } from '@/styles/themeJump';
import { ThemeProvider } from '@mui/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import { mockAssetResponse, mockAssetSoldOut } from '@/__mocks__/mockAssetResponse';
import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';
import type { IAsset } from '@/types/assetTypes';

const handleClick = jest.fn();
const mockData = mockAssetResponse.items[0];
const details = parseAssetAttributes(mockData.attributes);
const MockAssetCard = ({ asset }: { asset: IAsset }) => {
  return (
    <ThemeProvider theme={themeJump}>
      <AssetCard onClick={handleClick} assetData={asset} />
    </ThemeProvider>
  );
};

describe('Asset Card', () => {
  test('should display card data', () => {
    render(<MockAssetCard asset={mockData} />);
    const title = screen.getByText(mockData.name);
    const year = screen.getByText(`${details.year}`, { exact: false });
    const price = screen.getByText(/price/i, { exact: false });
    const valuation = screen.getByText(/valuation/i, { exact: false });
    const image = screen.getByRole('img');

    expect(title).toBeInTheDocument();
    expect(year).toBeInTheDocument();
    expect(valuation).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test('should be clickable', async () => {
    render(<MockAssetCard asset={mockData} />);
    await user.click(screen.getByText(mockData.name));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should be tab-able', async () => {
    render(<MockAssetCard asset={mockData} />);
    await user.tab();
    await user.keyboard('{enter}');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test('should display sold out when no sellOrders available', () => {
    const { rerender } = render(<MockAssetCard asset={mockData} />);
    const notSoldOut = screen.queryByText(/sold out/i);
    expect(notSoldOut).toBeNull();
    rerender(<MockAssetCard asset={mockAssetSoldOut} />);
    const soldOut = screen.getByText(/sold out/i);
    expect(soldOut).toBeInTheDocument();
  });
});
