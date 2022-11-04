import { styled, Box, Card, Typography, lighten } from '@mui/material';

export const CartContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '1024px',
  margin: '0 auto',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '400px',
    flexDirection: 'column',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '95vw',
    flexDirection: 'column',
  },
}));
export const CartAsset = styled(Box)(({ theme }) => ({
  width: '60%',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const AssetCard = styled(Box)(({ theme }) => ({
  height: '345px',
  borderRadius: '0px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    height: 'max-content',
  },
}));

export const CardContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: '0 0 24px',
  height: '560px',
  [theme.breakpoints.down('md')]: {
    height: 'max-content',
  },
}));

export const ValuationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 24px 10px 24px',
  [theme.breakpoints.down('md')]: {
    height: 'max-content',
    margin: '10px 24px 5px 24px',
  },
}));
export const Text = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  lineHeight: '28px',
  fontWeight: '500',
  [theme.breakpoints.down('md')]: { fontSize: '16px', lineHeight: '24px', fontWeight: '500' },
}));

export const CTACard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '40px',
  margin: '20px 24px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.grey[400]}`,
  [theme.breakpoints.down('md')]: {
    padding: '20px',
    margin: '10px 14px',
  },
}));

export const RemoveFromCartButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  top: '10px',
  right: '10px',
  [theme.breakpoints.down('md')]: {
    top: '5px',
    right: '5px',
  },
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '152px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: lighten(theme.palette.primary.main, 0.95),
  padding: '40px',
  [theme.breakpoints.down('sm')]: {
    padding: '20px',
  },
}));
