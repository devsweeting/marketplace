import { Box, Grid, Skeleton, useTheme } from '@mui/material';
import type { IPorfolioAsset } from '@/pages/account';
import React from 'react';
import { PortfolioAssetCard } from '../PortfolioAssetCard';

export const PortfolioAssetList = ({
  portfolioAssetsList,
}: {
  portfolioAssetsList: (IPorfolioAsset | undefined)[];
}) => {
  const theme = useTheme();
  return (
    <Grid container direction="row" justifyContent="center" alignItems="stretch">
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
          portfolioAssetsList.map((asset) => (
            <PortfolioAssetCard key={asset?.id} assetData={asset} onClick={undefined} />
          ))
        ) : (
          <>
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ marginBottom: '10px', width: '100%' }}
              height={110}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ marginBottom: '10px', width: '100%' }}
              height={110}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ marginBottom: '10px', width: '100%' }}
              height={110}
            />
          </>
        )}
      </Box>
    </Grid>
  );
};
