import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import type { IMarket } from '@/types/assetTypes';
import { formatNumber } from '@/helpers/formatNumber';
import { useRouter } from 'next/router';
import { Card, ImgWrapper, TextContainer } from './TrendingMarketCard.styles';

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
  const [activated, setActivated] = useState<string | undefined>('');
  const router = useRouter();
  const { query, isReady } = router;

  useEffect(() => {
    if (isReady) {
      if (Object.keys(query).length > 0) {
        setActivated(activeCard);
      } else {
        setActivated('');
      }
    }
  }, [query, isReady, activeCard]);

  if (!onClick) return null;
  return (
    <Box
      tabIndex={tabIndex}
      onClick={() => {
        onClick();
      }}
      sx={{ scrollSnapAlign: 'start' }}
    >
      <Card variant="outlined" active={activated === brand.brand}>
        <ImgWrapper>
          {/* TODO: Update this when data is available */}
          <Image src={'/images/No_image_available_500_x_500.svg'} alt={'No Image Available'} fill />
        </ImgWrapper>

        <TextContainer>
          {brand.brand && (
            <Typography variant="body1" fontWeight={700}>
              {brand.brand}
            </Typography>
          )}

          {brand.value_dollars && (
            <Typography variant="body2" fontWeight={700}>
              Valuation: {'$' + formatNumber(brand.value_dollars)}
            </Typography>
          )}
        </TextContainer>
      </Card>
    </Box>
  );
};
