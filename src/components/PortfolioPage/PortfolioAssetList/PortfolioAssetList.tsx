import { Grid, Skeleton } from '@mui/material';
import type { IPortfolioAsset } from '@/pages/account';
import React from 'react';
import { PortfolioAssetCard } from '../PortfolioAssetCard';
import type { IAsset } from '@/types/assetTypes';
import { Container } from './PortfolioAssetList.styles';

export const PortfolioAssetList = ({
  portfolioAssetsList,
  handleDrawer,
  closeDrawer,
}: {
  portfolioAssetsList: (IPortfolioAsset | undefined)[];
  handleDrawer: (asset: IAsset) => void;
  closeDrawer: () => void;
}) => {
  return (
    <Grid container direction="row" justifyContent="flex-end" alignItems="stretch">
      <Container>
        {portfolioAssetsList.length > 0 ? (
          portfolioAssetsList.map((asset) => {
            if (asset) {
              asset.isOnUserPortfolio = true;
              return (
                <PortfolioAssetCard
                  key={asset?.id}
                  assetData={asset}
                  onClick={() => {
                    handleDrawer(asset as IAsset);
                  }}
                  closeDrawer={closeDrawer}
                />
              );
            }
          })
        ) : (
          <>
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ marginBottom: '10px', width: '100%', zIndex: '1' }}
              height={110}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ marginBottom: '10px', width: '100%', zIndex: '1' }}
              height={110}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ marginBottom: '10px', width: '100%', zIndex: '1' }}
              height={110}
            />
          </>
        )}
      </Container>
    </Grid>
  );
};
