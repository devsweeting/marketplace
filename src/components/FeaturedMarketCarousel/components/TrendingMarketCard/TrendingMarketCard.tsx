import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import Image from 'next/image';
import { useTrendingMarketCardStyles } from './TrendingMarketCard.styles';
import type { IAsset } from '@/types/assetTypes';

export const TrendingMarketCard = ({
  asset,
  handleDrawer,
  tabIndex,
}: {
  asset: IAsset;
  handleDrawer?: (asset: IAsset) => void;
  tabIndex?: number;
}) => {
  const classes = useTrendingMarketCardStyles();

  if (!handleDrawer) {
    return null;
  }
  return (
    <Box
      className={classes.marketCardContainer}
      id={'marketCard'}
      onClick={() => {
        handleDrawer(asset);
      }}
      tabIndex={tabIndex}
    >
      <Card variant="outlined" className={classes.card}>
        <Box className={classes.assetImageInnerContainer}>
          {asset?.media && asset?.media.length > 0 && (
            <Image src={asset.media[0].absoluteUrl} alt={asset.media[0].title} layout="fill" />
          )}
        </Box>

        <Box className={classes.assetTextContainer}>
          {asset.name && (
            <Typography variant="h2" component="h4" className={classes.cardTitle} id="cardTitle">
              {asset.name}
            </Typography>
          )}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            {asset.sellOrders[0] && (
              <Typography variant="h2" component="h4" className={classes.cardSubTitle}>
                Valuation $XXXXXX
              </Typography>
            )}
          </div>
        </Box>
      </Card>
    </Box>
  );
};
