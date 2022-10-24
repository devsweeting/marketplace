import { Box, Card, IconButton, styled, Typography } from '@mui/material';
import type { Theme, CardProps as MuiCardProps } from '@mui/material';
import Image from 'next/image';

interface CardProps extends MuiCardProps {
  active?: boolean;
}

interface CardStyleProps {
  theme: Theme;
  active?: boolean;
}

export const AssetCard = styled(Card, {
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
    margin: '5px',
    boxShadow:
      '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    flexDirection: 'column',
    maxWidth: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0px',
    boxShadow:
      '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    flexDirection: 'column',
    maxWidth: '400px',
  },
  ...(active && {
    backgroundColor: theme.palette.grey[50],
    transition: 'background-color 300ms ease-in',
  }),
}));
export const CardInnerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  },
}));

export const ImageWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  maxWidth: '152px',
  height: 'auto',
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    margin: '0 auto',
  },
}));

export const Img = styled(Image)({
  textAlign: 'center',
  maxWidth: '72px',
});

export const DetailWrapper = styled(Box)(({ theme }) => ({
  padding: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: 'max-content',
  [theme.breakpoints.down('lg')]: {
    padding: '10px',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export const AttributeWrapper = styled(Box)(({ theme }) => ({
  width: '40%',
  [theme.breakpoints.down('lg')]: {
    minWidth: '30%',
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid black',
  },
}));
export const ValueWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  minWidth: '60%',
  maxWidth: '100%',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  [theme.breakpoints.down('lg')]: {
    minWidth: '70%',
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: '100%',
    flexWrap: 'wrap',
  },
}));

export const CardTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '32px',
  overflowWrap: 'break-word',
  paddingLeft: '10px',
});
export const CardDetails = styled(Typography)({
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  overflowWrap: 'normal',
  marginRight: '10px',
});

export const LargeText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '36px',
  lineHeight: '40px',
  display: 'flex',
  alignItems: 'flex-end',

  [theme.breakpoints.down(1649.95)]: {
    fontSize: '26px',
    lineHeight: '32px',
  },

  [theme.breakpoints.down('md')]: {
    fontSize: '24px',
    lineHeight: '24px',
  },
}));
export const FineText = styled(Typography)({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '16px',
  marginLeft: '4px',
});
export const HeaderText = styled(Typography)({
  margin: 0,
  padding: '0',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#6B7280',
});

export const TextWrapper = styled(Box)(({ theme }) => ({
  minWidth: '100px',
  margin: '0 25px',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('xl')]: {
    margin: '0 10px',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 'auto',
    margin: '5px',
    flexWrap: 'wrap',
  },
}));

export const StarWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  zIndex: 10,
  top: '2px',
  left: '110px',
  [theme.breakpoints.down('md')]: {
    left: 'unset',
    top: '10px',
    right: '10px',
  },
  [theme.breakpoints.down('sm')]: {
    left: 'unset',
    top: '0px',
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

export const Watched = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
