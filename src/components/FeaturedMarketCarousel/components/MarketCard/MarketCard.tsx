import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import Image from 'next/image';
import { useMarketCardStyles } from './MarketCard.styles';
import type { IAsset } from '@/types/assetTypes';
import { parseAssetAttributes } from '@/helpers/parseAssetAttributes';
import { getMainSellOrder } from '@/helpers/getMainSellOrder';

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
  const sellOrderData = getMainSellOrder(asset);
  const details = parseAssetAttributes(asset.attributes);

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
            <Typography variant="h2" component="h4" className={classes.cardTitle} id="cardTitle">
              {asset.name}
            </Typography>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" className={classes.cardSubTitle}>
              {sellOrderData ? `FP $${sellOrderData.fractionPriceCents / 100}` : 'Not Available'}
            </Typography>

            {details.year && (
              <Typography variant="subtitle2" className={classes.cardSubTitle}>
                Year: {details.year}
              </Typography>
            )}
            {details.grading && (
              <Typography variant="subtitle2" className={classes.cardSubTitle}>
                Grade: {details.grading}
              </Typography>
            )}
            {details.grading_service && (
              <Typography variant="subtitle2" className={classes.cardSubTitle}>
                Grading: {details.grading_service}
              </Typography>
            )}
            {details.set && (
              <Typography variant="subtitle2" className={classes.cardSubTitle}>
                Set: {details.set}
              </Typography>
            )}
          </div>
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
