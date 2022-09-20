import { Box, Grid, useTheme } from '@mui/material';
import type { IAsset } from '@/types/assetTypes';
import React from 'react';
import { PortfolioAssetCard } from '../PortfolioAssetCard';

export const PortfolioAssetList = ({
  portfolioAssetsList,
}: {
  portfolioAssetsList: (IAsset | undefined)[];
  fractionQty: number;
  fractionPriceCents: number;
}) => {
  const theme = useTheme();
  return (
    <Grid container direction="row" justifyContent="center" alignItems="stretch">
      <Box
        style={{
          display: 'block',
          width: '100%',
          [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: 'auto',
          },
          [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '600px',
          },
        }}
      >
        {portfolioAssetsList.length > 0 &&
          portfolioAssetsList.map((asset) => (
            <PortfolioAssetCard key={asset?.id} assetData={asset} onClick={undefined} />
          ))}
      </Box>
    </Grid>
  );
};
