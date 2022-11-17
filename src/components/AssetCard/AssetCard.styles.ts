import { Card, IconButton, styled, Typography } from '@mui/material';
import type { Theme, CardProps as MuiCardProps } from '@mui/material';
import Image from 'next/image';

interface CardProps extends MuiCardProps {
  active?: boolean;
}

interface CardStyleProps {
  theme: Theme;
  active?: boolean;
}

export const CardContainer = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'active',
})<CardProps>(({ theme, active }: CardStyleProps) => ({
  width: '100%',
  cursor: 'pointer',
  borderRadius: 0,
  position: 'relative',
  display: 'flex',
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    maxWidth: '400px',
  },
  ...(active && {
    backgroundColor: theme.palette.grey[50],
    transition: 'background-color 300ms ease-in',
  }),
}));

export const ImageWrapper = styled('div')(({ theme }) => ({
  maxWidth: '120px',
  height: 'auto',
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    margin: '0 auto',
  },
}));

export const Img = styled(Image)({
  textAlign: 'center',
  maxWidth: '100px',
});

export const CardDetails = styled('div')({
  flex: 1,
  padding: '1rem',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
});

export const Title = styled(Typography)({
  fontFamily: 'Montserrat',
  fontWeight: 700,
  fontSize: '18px',
  overflowWrap: 'break-word',
});

export const PriceSection = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '2rem',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    justifyContent: 'space-between',
  },
}));

export const PriceItem = styled('div')(({ theme }) => ({
  minWidth: '100px',
  [theme.breakpoints.down('md')]: {
    minWidth: '0px',
  },
}));

export const StarWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  top: '10px',
  right: '10px',
  [theme.breakpoints.down('sm')]: {
    right: '0px',
  },
}));

export const Star = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const SoldOutContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%) rotate(-20deg)',
  [theme.breakpoints.down('md')]: {
    top: '80%',
  },
}));

export const SoldOutText = styled(Typography)(({ theme }) => ({
  zIndex: 1,
  padding: '5px',
  fontSize: '3rem',
  borderStyle: 'dashed',
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
  fontWeight: 700,
  [theme.breakpoints.down(1240)]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
    top: '450px',
  },
}));

export const Watched = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
