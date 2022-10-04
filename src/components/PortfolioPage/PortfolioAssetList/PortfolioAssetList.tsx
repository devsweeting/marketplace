import { Box, Grid, Skeleton, useTheme } from '@mui/material';
import type { IPorfolioAsset } from '@/pages/account';
import React from 'react';
import { PortfolioAssetCard } from '../PortfolioAssetCard';
import type { IAsset } from '@/types/assetTypes';

export const PortfolioAssetList = ({
  portfolioAssetsList,
  handleDrawer,
}: {
  portfolioAssetsList: (IPorfolioAsset | undefined)[];
  handleDrawer: (asset: IAsset) => void;
}) => {
  const theme = useTheme();
  return (
    <Grid container direction="row" justifyContent="flex-end" alignItems="stretch">
      <Box
        sx={{
          display: 'block',
          width: '100%',
          [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            margin: '0 auto',
          },
          [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '600px',
          },
        }}
      >
        {portfolioAssetsList.length > 0 ? (
          portfolioAssetsList.map((asset) => {
            if (asset) {
              asset.isOnUserPortfolio = true;
              if (!asset.fractionPriceCents || !asset.fractionQty) {
                asset.isOnWatchlist = true;
              }
              return (
                <PortfolioAssetCard
                  key={asset?.id}
                  assetData={asset}
                  onClick={() => {
                    handleDrawer(asset);
                  }}
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
      </Box>
    </Grid>
  );
};
