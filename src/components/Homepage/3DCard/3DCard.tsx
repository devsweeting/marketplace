import React from 'react';
import Image from 'next/image';
import Card from 'react-animated-3d-card';
import { Box, useMediaQuery, useTheme } from '@mui/material';

type TradingCardProps = {
  src: string;
  color: 'pink' | 'red' | 'blue';
  isWhiteBackground?: boolean;
};

const radientColors = {
  black: 'rgba(0, 0, 0, 0.5)',
  white: 'rgba(255, 255, 255, 0.5)',
  red: 'rgba(255, 108, 158, 0.5)',
  pink: 'rgba(209, 0, 66, 0.5)',
  blue: 'rgba(14, 62, 136, 0.5)',
};

/**
 * https://github.com/jamipuchi/animated-3d-card
 * @param src
 * @returns A 3D animated card. Will return a static image on small screens
 */
export const TradingCard = ({ src, color, isWhiteBackground = true }: TradingCardProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('md'));
  return matchesMobile ? (
    <Image src={src} fill alt={'trading card'} style={{ objectFit: 'contain' }} />
  ) : (
    <TradingCard3D src={src} color={color} isWhiteBackground={isWhiteBackground} />
  );
};

export const TradingCard3D = ({ src, color, isWhiteBackground }: TradingCardProps) => {
  const cardSize = {
    width: '17.5rem',
    height: '29.5rem',
  };

  return (
    <Box
      style={{
        objectFit: 'contain',
        width: '120%',
        height: '100%',
        background: `radial-gradient(50% 50% at 50% 50%, ${radientColors[color]} 0%, ${
          isWhiteBackground ? radientColors['white'] : radientColors['black']
        }) 100%`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          backgroundColor: 'linear-gradient(to bottom, transparent 0%, black 100%)',

          cursor: 'pointer',
          ...cardSize,
        }}
      >
        <Image src={src} fill alt={'in quia occaecati nihil'} style={{ objectFit: 'contain' }} />
      </Card>
    </Box>
  );
};
