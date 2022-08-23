import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import Image from 'next/image';
import { useTrendingMarketCardStyles } from './TrendingMarketCard.styles';
import type { IMarket } from '@/types/assetTypes';
import { formatNumber } from '@/helpers/formatNumber';

export const TrendingMarketCard = ({
  brand,
  handleDrawer,
  tabIndex,
}: {
  brand: IMarket;
  handleDrawer?: (asset: IMarket) => void;
  tabIndex?: number;
}) => {
  const classes = useTrendingMarketCardStyles();

  if (!handleDrawer) {
    return null;
  }
  return (
    <Box className={classes.marketCardContainer} id={'marketCard'} tabIndex={tabIndex}>
      <Card variant="outlined" className={classes.card}>
        <Box className={classes.assetImageInnerContainer}>
          {/* TODO: Update this when data is available */}
          <Image
            src={'/images/No_image_available_500_x_500.svg'}
            alt={'No Image Available'}
            layout="fill"
          />
        </Box>

        <Box className={classes.assetTextContainer}>
          {brand.brand && (
            <Typography variant="h2" component="h4" className={classes.cardTitle} id="cardTitle">
              {brand.brand}
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
            {brand.value_dollars && (
              <Typography variant="h2" component="h4" className={classes.cardSubTitle}>
                Valuation: {'$' + formatNumber(brand.value_dollars)}
              </Typography>
            )}
          </div>
        </Box>
      </Card>
    </Box>
  );
};
