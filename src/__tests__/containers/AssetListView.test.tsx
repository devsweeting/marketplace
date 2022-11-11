import { AssetListView } from '@/containers/AssetListView';
import type { IAssetListView } from '@/containers/AssetListView/IAssetListView';
import { ModalContextProvider } from '@/helpers/auth/ModalContext';
import { themeJump } from '@/styles/themeJump';
import { mockAssetResponse } from '@/__mocks__/mockAssetResponse';
import { ThemeProvider } from '@mui/styles';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

const mockHandleDrawer = jest.fn();
const mockAssets = mockAssetResponse.items;

const MockAssetListView = ({ assets, handleDrawer, activeCardId }: IAssetListView) => {
  return (
    <ThemeProvider theme={themeJump}>
      <ModalContextProvider>
        <AssetListView
          assets={assets}
          handleDrawer={handleDrawer}
          activeCardId={activeCardId}
        ></AssetListView>
      </ModalContextProvider>
    </ThemeProvider>
  );
};

describe('AssetListView', () => {
  test('should render multiple cards ', () => {
    render(
      <MockAssetListView
        assets={mockAssets}
        handleDrawer={mockHandleDrawer}
        activeCardId={mockAssets[0].id}
      ></MockAssetListView>,
    );
    const card = screen.getByText(mockAssets[0].name);
    const card2 = screen.getByText(mockAssets[1].name);
    const card3 = screen.getByText(mockAssets[1].name);
    expect(card).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
    expect(card3).toBeInTheDocument();
  });

  test('should allow clicking cards ', async () => {
    render(
      <MockAssetListView
        assets={mockAssets}
        handleDrawer={mockHandleDrawer}
        activeCardId={mockAssets[0].id}
      ></MockAssetListView>,
    );
    const card = screen.getByText(mockAssets[0].name);
    expect(card).toBeInTheDocument();
    await user.click(card);
    expect(mockHandleDrawer).toBeCalled();
  });
});
