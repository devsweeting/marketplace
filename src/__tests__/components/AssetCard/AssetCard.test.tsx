import { AssetCard } from '@/components/AssetCard';
import { themeJump } from '@/styles/themeJump';
import { ThemeProvider } from '@mui/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import user from '@testing-library/user-event';
import { mockAssetResponse } from '@/__mocks__/mockAssetResponse';
import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';

const handleClick = jest.fn();
const data = mockAssetResponse.items[0];
const details = parseAssetAttributes(data.attributes);
const MockAssetCard = () => {
  return (
    <ThemeProvider theme={themeJump}>
      <AssetCard onClick={handleClick} assetData={data} />
    </ThemeProvider>
  );
};

describe('Asset Card', () => {
  test('should display card data', () => {
    render(<MockAssetCard />);
    const title = screen.getByText(data.name);
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
    render(<MockAssetCard />);
    await user.click(screen.getByText(data.name));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should be tab-able', async () => {
    render(<MockAssetCard />);
    await user.tab();
    await user.keyboard('{enter}');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
