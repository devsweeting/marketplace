import { styled, Box, Card, Typography, lighten, Button } from '@mui/material';

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
export const HeaderContainer = styled(Box)(({ theme }) => ({
  height: '80px',
  padding: '24px 40px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  [theme.breakpoints.down('sm')]: {
    height: 'max-content',
    padding: '14px 30px',
  },
}));

export const HeaderButtons = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  top: '10px',
  right: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '30%',
  margin: '5px 2px',
  [theme.breakpoints.down('md')]: {
    right: '1px',
    flexWrap: 'nowrap',
  },
  [theme.breakpoints.down('sm')]: {
    top: '0px',
    right: '14px',
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

export const HeaderSizedText = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: '600',
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
  [theme.breakpoints.down('sm')]: {
    display: 'none',
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
export const OrderSummaryContainer = styled(Box)(({ theme }) => ({
  height: '60px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '16px 0px 16px 24px',
}));

export const OrderSummaryText = styled(Typography)({
  fontSize: '18px',
  lineHeight: '28px',
  fontWeight: '500',
});

export const OrderButton = styled(Button)(({ theme }) => ({
  '&.MuiButtonBase-root': {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    height: '40px',
    margin: '10px 24px',
    fontSize: '16px',
    lineHeight: '24px',
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.down('sm')]: {
      margin: '12px',
    },
  },
}));
