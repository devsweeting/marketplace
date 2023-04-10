import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import type { IAsset } from '@/types';
import { Attributes } from '@/components/Attributes';
import { Card, ImgContainer, ImgWrapper, TextContainer } from './MarketCard.styles';
import { useRouter } from 'next/router';
import { NO_IMAGE_AVAILABLE } from '@/helpers/noImageFound';

export const MarketCard = ({
  asset,
  handleDrawer,
  tabIndex,
}: {
  asset: IAsset;
  handleDrawer?: (asset: IAsset) => void;
  tabIndex?: number;
}) => {
  const router = useRouter();

  if (!handleDrawer) {
    return null;
  }
  return (
    <Box
      id={'marketCard'}
      onClick={() => {
        handleDrawer(asset);
      }}
      tabIndex={tabIndex}
      sx={{ scrollSnapAlign: 'start' }}
    >
      <Card
        onClick={() => void router.push(`/asset/${asset.id}`, `/asset/${asset.slug}`)}
        variant="outlined"
      >
        <ImgContainer>
          <ImgWrapper>
            {asset?.media && asset?.media.length > 0 && (
              <Image
                placeholder="blur"
                blurDataURL={`/_next/image?url=${asset.media[0].absoluteUrl}&w=16&q=1`}
                src={asset.media[0].absoluteUrl ? asset.media[0].absoluteUrl : NO_IMAGE_AVAILABLE}
                alt={asset.media[0].title}
                style={{ borderRadius: '5px' }}
                fill
              />
            )}
          </ImgWrapper>
        </ImgContainer>
        <TextContainer>
          {asset.name && (
            <Typography variant="body1" fontWeight={700}>
              {asset.name}
            </Typography>
          )}

          <Attributes attributes={asset.attributes} />
          {asset.description && <Typography variant="body2">{asset.description}</Typography>}
        </TextContainer>
      </Card>
    </Box>
  );
};
