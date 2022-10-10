import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import Image from 'next/image';
import { useMarketCardStyles } from './MarketCard.styles';
import type { IAsset } from '@/types/assetTypes';
import { Attributes } from '@/components/Attributes';

export const MarketCard = ({
  asset,
  handleDrawer,
  tabIndex,
}: {
  asset: IAsset;
  handleDrawer?: (asset: IAsset) => void;
  tabIndex?: number;
}) => {
  const classes = useMarketCardStyles();

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
        <Box className={classes.assetImageOutterContainer}>
          <Box className={classes.assetImageInnerContainer}>
            {asset?.media && asset?.media.length > 0 && (
              <Image
                placeholder="blur"
                blurDataURL={`/_next/image?url=${asset.media[0].absoluteUrl}&w=16&q=1`}
                src={asset.media[0].absoluteUrl}
                alt={asset.media[0].title}
                style={{ borderRadius: '5px' }}
                layout="fill"
              />
            )}
          </Box>
        </Box>
        <Box className={classes.assetTextContainer}>
          {asset.name && (
            <Typography variant="xl5" component="h4" className={classes.cardTitle} id="cardTitle">
              {asset.name}
            </Typography>
          )}

          <Attributes attributes={asset.attributes} />
          <div style={{ display: 'flex' }}></div>
          {asset.description && (
            <Typography variant="body1" className={classes.cardDescription}>
              {asset.description}
            </Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
};
