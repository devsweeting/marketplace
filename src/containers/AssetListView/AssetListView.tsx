import { AssetCard } from '@/components/AssetCard';
import type { IAssetListView } from './IAssetListView';
import { Box } from '@mui/material';
import { useAssetListViewStyles } from './AssetListView.styles';

export const AssetListView = ({ assets, handleDrawer, activeCardId }: IAssetListView) => {
  const classes = useAssetListViewStyles();
  return (
    <Box className={classes.listWrapper}>
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
    </Box>
  );
};
