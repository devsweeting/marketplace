import { Box, styled, Typography } from '@mui/material';
import type { Theme } from '@mui/material';
import Image from 'next/image';

export const Container = styled(Box)({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'transparent',
});

export const Carousel = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'minmax(100px, 300px)',
  gridTemplateRows: '1fr auto',
  gap: '1rem',
  transformStyle: 'preserve-3d',
  padding: '2rem',
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'minmax(150px, 400px)',
  },
}));

export const ImgWrapper = styled(Box)({
  gridArea: '1/1',
  justifySelf: 'center',
  alignSelf: 'center',
  width: '100%',
  height: 'auto',
  aspectRatio: '3/5',
  transition: 'all 250ms ease-in-out',
  position: 'relative',
});

export const Img = styled(Image)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.grey[200],
}));

export const ImgCount = styled(Typography)({
  textAlign: 'center',
});

type ControlButtonProps = {
  $transform: string;
  theme?: Theme;
};

export const ControlButton = styled(Box)(({ $transform }: ControlButtonProps) => ({
  flex: 1,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  maxHeight: '500px',
  alignSelf: 'center',
  '& > .MuiSvgIcon-root': {
    transition: 'all 250ms ease-in-out',
  },
  '&:hover': {
    cursor: 'pointer',
    '& > .MuiSvgIcon-root': {
      transform: `translateX(${$transform})`,
    },
  },
}));
