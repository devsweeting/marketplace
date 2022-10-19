import { AssetCard } from '@/components/AssetCard';
import type { IAssetListView } from './IAssetListView';
import { Container } from './AssetListView.styles';

export const AssetListView = ({ assets, handleDrawer, activeCardId }: IAssetListView) => {
  return (
    <Container>
      {assets &&
        assets.map((asset) => (
          <AssetCard
            key={asset.id}
            assetData={asset}
            activeCardId={activeCardId}
            onClick={() => {
              handleDrawer(asset);
            }}
          />
        ))}
    </Container>
  );
};
