import {
  styled,
  Box,
  Typography,
  List,
  ListItem,
  InputAdornment,
  Button,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Image from 'next/image';

export const PageContainer = styled('div')(({ theme }) => ({
  maxWidth: '1512px',
  minHeight: '843px',
  paddingTop: '80px',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  },
}));

export const SetAskPriceContainerColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '40px',
  width: '100%',
  maxWidth: '756px',
  [theme.breakpoints.down('md')]: {
    padding: '20px',
    width: '100%',
    maxWidth: '700px',
  },
}));

export const Header = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: '600',
  height: '56px',
  padding: '0',
  margin: '0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '24px',
    height: '40px',
  },
}));

export const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  maxWidth: '676px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '400px',
  },
}));

export const Wrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0',
  width: '100%',
  maxWidth: '676px',
  marginBottom: '24px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '400px',
    marginBottom: '10px',
  },
}));

export const DismissibleTextBox = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '24px 25px',
  maxWidth: '676px,',
  minHeight: ' 291px',
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '8px',
  marginBottom: '20px',
}));

export const DismissibleTextHeader = styled(Typography)(({ theme }) => ({
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '20px',
  padding: '0',
  margin: '0',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '10px',
  },
}));

export const InputLabelText = styled(InputLabel)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '20px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '18px',
  },
}));
export const PriceOutlinedInput = styled(OutlinedInput)({
  width: '100%',
  borderRadius: '8px',
  height: '40px',
  margin: '4px 8px 4px 0',
  '& input': {
    margin: '0 0 0 2px',
    padding: '0',
    width: '80%',
  },
});

export const Text = styled(Typography)({
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
});

export const ReasonsToSetPriceList = styled(List)(({ theme }) => ({
  padding: '0',
  margin: '0 0 20px 0',

  [theme.breakpoints.down('sm')]: {
    margin: '0 0 16px 0',
  },
}));
export const ReasonsToSetPriceListItem = styled(ListItem)({
  paddingTop: '0',
  paddingBottom: '0',
  margin: '0',
  fontSize: '14px',
  fontWeight: '500',
});

export const MonetaryInputAdornment = styled(InputAdornment)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  width: '11px',
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  borderRadius: '24px',
  fontWeight: 'bold',
  color: 'black',
  '& p': {
    fontSize: '16px',
    fontWeight: '500',
    color: 'black',
  },
}));

export const OrderSummary = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  width: '100%',
  padding: '0 0 24px 0',
}));

export const OrderSummaryHeader = styled(Typography)(({ theme }) => ({
  height: '60px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '16px 0px 0px 24px',
  width: '100%',
  fontSize: '18px',
  lineHeight: '28px',
  fontWeight: '500',
}));

export const OrderSummaryDetailsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 24px 10px 24px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));

export const OrderQuantity = styled(Typography)({
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '500',
});

export const StyledLockIcon = styled(LockIcon)(({ theme }) => ({
  stroke: theme.palette.grey[900],
  strokeWidth: '2px',
  fill: theme.palette.grey[50],
  width: '16px',
  height: '18px',
  margin: '0 6px',
  padding: '0',
}));

export const OrderButton = styled(Button)(({ theme }) => ({
  '&.MuiButtonBase-root': {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    height: '52px',
    margin: '8px auto',
    fontSize: '16px',
    padding: '0',
    lineHeight: '24px',
    borderRadius: '8px',
    maxWidth: '608px',
    width: '100%',
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.down('sm')]: {
      margin: '10px auto',
    },
  },
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
}));

export const ThanksContainerColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  maxWidth: '756px',
  padding: '40px',
  [theme.breakpoints.down('md')]: {
    padding: '20px',
    width: '100%',
    maxWidth: '700px',
  },
}));

export const ThanksHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0px',
  marginBottom: '20px',
  width: '100%',
  maxWidth: '676px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '400px',
  },
}));

export const ThanksText = styled(Typography)(({ theme }) => ({
  fontSize: '56px',
  lineHeight: '56px',
  fontWeight: '400',
  textTransform: 'uppercase',
  fontFamily: 'League Gothic',
  margin: '24px 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '36px',
    lineHeight: '36px',
  },
}));

export const ConfirmText = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  lineHeight: '28px',
  fontWeight: '400',
  color: theme.palette.grey[500],
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    lineHeight: '24px',
  },
}));

export const AssetCard = styled(Box)(({ theme }) => ({
  borderRadius: '0px',
  maxWidth: '756px',
  display: 'flex',
  borderTop: '1px solid #E5E7EB',
  borderBottom: '1px solid #E5E7EB',

  [theme.breakpoints.down('md')]: {
    maxWidth: '400px',
  },
}));

export const CardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '106.94px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '400px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 'max-content',
  },
}));

export const AssetImageWrapper = styled('div')(({ theme }) => ({
  maxWidth: '120px',
  height: 'auto',
  maxHeight: '66.94px',
  padding: '20px 40px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    margin: '0 auto',
    maxHeight: 'inherit',
  },
}));

export const CardMeta = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flex: 1,
    padding: '1rem 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },
}));

export const CardName = styled(Typography)(({ theme }) => ({
  display: 'block',
  whiteSpace: 'nowrap',
  maxWidth: '326px',
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: '600',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    whiteSpace: 'break-spaces',
    overflow: 'visible',
    fontSize: '18px',
    lineHeight: '24px',
  },
}));
export const ValuationContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
  minWidth: '76px',
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
  },
}));

export const LargeDetailText = styled(Typography)(({ theme }) => ({
  display: 'block',
  whiteSpace: 'nowrap',
  maxWidth: '326px',
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: '600',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '28px',
  },
}));

export const Img = styled(Image)({
  textAlign: 'center',
  maxWidth: '40px',
});
