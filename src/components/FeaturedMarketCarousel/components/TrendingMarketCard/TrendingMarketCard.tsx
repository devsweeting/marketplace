import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import Image from 'next/image';
import { useTrendingMarketCardStyles } from './TrendingMarketCard.styles';
import type { IMarket } from '@/types/assetTypes';
import { formatNumber } from '@/helpers/formatNumber';

export const TrendingMarketCard = ({
  brand,
  onClick,
  tabIndex,
  activeCard,
}: {
  brand: IMarket;
  onClick: () => void;
  tabIndex?: number;
  activeCard?: string;
}) => {
  const classes = useTrendingMarketCardStyles();

  if (!onClick) return null;
  return (
    <Box
      className={classes.marketCardContainer}
      id={'marketCard'}
      tabIndex={tabIndex}
      onClick={() => {
        onClick();
      }}
    >
      <Card
        variant="outlined"
        className={`${classes.card} ${activeCard === brand.brand ? classes.active : ''}`}
      >
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
