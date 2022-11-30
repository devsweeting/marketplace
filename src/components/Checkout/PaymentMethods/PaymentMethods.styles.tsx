import type { RadioProps } from '@mui/material';
import {
  InputLabel,
  InputAdornment,
  Typography,
  styled,
  Radio,
  Box,
  Button,
  OutlinedInput,
} from '@mui/material';
const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 24,
  height: 24,
  boxShadow: 'inset 0 0 0 1px rgba(24,22,26,.2), inset 0 -1px 0 rgba(24,22,26,.1)',
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: `2px auto ${theme.palette.grey[400]}`,
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 24,
    height: 24,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.grey[900],
  },
}));

export const CustomRadio = (props: RadioProps) => {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
};

export const Text = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '20px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '18px',
  },
}));

export const Container = styled(Box)(({ theme }) => ({
  height: 'max-content',
  maxWidth: '576px',
  width: 'calc(100vw - 20px)',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 10px)',
  },
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  height: '80px',
  padding: '24px 40px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  [theme.breakpoints.down('md')]: {
    height: 'max-content',
    padding: '14px 30px',
  },
  [theme.breakpoints.down('sm')]: {
    height: 'max-content',
    padding: '14px 18px',
  },
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: '600',
  [theme.breakpoints.down('md')]: {
    fontSize: '20px',
    lineHeight: '30px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '15px',
    lineHeight: '30px',
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
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
    top: '4px',
    right: '1px',
    flexWrap: 'nowrap',
  },
  [theme.breakpoints.down('sm')]: {
    top: '4px',
    right: '14px',
  },
}));

export const PaymentContainer = styled(Box)(({ theme }) => ({
  height: 'max-content',
  maxWidth: '576px',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  padding: '24px',
  [theme.breakpoints.down('sm')]: {
    padding: '14px',
  },
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  height: 'max-content',
  width: '100%',
  margin: '0 auto 16px auto',
  backgroundColor: theme.palette.grey[100],
  flexShrink: '1',
  padding: '24px',
  borderRadius: '8px',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export const Card = styled(Box)(({ theme }) => ({
  height: '100px',
  backgroundColor: theme.palette.grey[100],
  margin: '16px 0',
  borderRadius: '8px',
  padding: '24px',
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    height: 'max-content',
    padding: '18px',
  },
}));

export const CardTextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 16px',
  width: '376px',
  [theme.breakpoints.down('sm')]: {
    margin: '0 14px',
    width: 'max-content',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '18px',
  lineHeight: '28px',
  display: 'flex',

  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    lineHeight: '20px',
  },
}));
export const OrderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  lineHeight: '28px',
  fontWeight: '500',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    lineHeight: '20px',
  },
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#D9D9D9',
  height: '48px',
  width: '48px',
  margin: 'auto 0',
  borderRadius: '24px',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: '40px',
    width: '40px',
  },
}));
export const OrderSummaryDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 24px 10px 24px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));
export const OrderSummaryContainer = styled(Box)(({ theme }) => ({
  height: 'max-content',
  width: '100%',
  backgroundColor: theme.palette.grey[50],
}));
export const OrderSummaryButtonGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: '1fr',
  gap: '20px',
  maxWidth: '576px',
  margin: '8px 24px',
  [theme.breakpoints.down('sm')]: {
    margin: '14px',
  },
}));

export const OrderSummaryHeader = styled(Box)(({ theme }) => ({
  height: '60px',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '16px 0px 16px 24px',
}));

export const StyledInputAdornments = styled(InputAdornment)(({ theme }) => ({
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

export const AddFundsButton = styled(Button)(({ theme }) => ({
  '&.MuiButtonBase-root': {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    height: '40px',
    width: '111px',
    margin: '8px 0',
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '8px',
    padding: 0,
    '&:disabled': {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.grey[400],
      borderColor: theme.palette.grey[400],
      cursor: 'not-allowed',
      pointerEvents: 'all',
    },
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
  },

  [theme.breakpoints.down('sm')]: {
    '&.MuiButtonBase-root': {
      width: '130px',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
}));
export const CancelButton = styled(Button)(({ theme }) => ({
  '&.MuiButtonBase-root': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[100],
    height: '40px',
    margin: '8px 0',
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.grey[100]}`,
    '&:hover': {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main,
      border: `1px solid white`,
    },
    [theme.breakpoints.down('sm')]: {
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '20px',
      margin: '10px auto',
    },
  },
}));
export const AddPaymentButton = styled(Button)(({ theme }) => ({
  '&.MuiButtonBase-root': {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    height: '40px',

    margin: '8px 0',
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.down('sm')]: {
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '20px',
      margin: '10px auto',
      width: 'max-content',
    },
  },
}));

export const OutlinedLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '20px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '18px',
  },
}));

export const StyledInput = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
  borderRadius: '8px',
  height: '40px',
  margin: '8px 8px 0px 0',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
