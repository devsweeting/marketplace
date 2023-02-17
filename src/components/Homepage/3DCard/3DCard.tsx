import React from 'react';
import Image from 'next/image';
import Card from 'react-animated-3d-card';
import { useMediaQuery, useTheme } from '@mui/material';

/**
 * https://github.com/jamipuchi/animated-3d-card
 * @param src
 * @returns A 3D animated card. Will return a static image on small screens
 */
export const TradingCard = ({ src }: { src: string }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('md'));
  return matchesMobile ? (
    <Image src={src} fill alt={'in quia occaecati nihil'} style={{ objectFit: 'contain' }} />
  ) : (
    <TradingCard3D src={src} />
  );
};

export const TradingCard3D = ({ src }: { src: string }) => (
  <Card
    style={{
      backgroundColor: 'linear-gradient(to bottom, transparent 0%, black 100%)',
      width: '15rem',
      height: '25.5rem',
      cursor: 'pointer',
    }}
    // onClick={() => console.log('Card clicked')}
  >
    <Image src={src} fill alt={'in quia occaecati nihil'} style={{ objectFit: 'contain' }} />
  </Card>
);
