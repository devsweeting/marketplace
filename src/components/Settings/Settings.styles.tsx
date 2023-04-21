import {
  Box,
  Button as MuiButton,
  styled,
  Typography,
  OutlinedInput,
  InputLabel,
  FormHelperText,
} from '@mui/material';

export const PageContainer = styled('div')(({ theme }) => ({
  marginTop: '100px',
  width: '90%',
  height: '100vh',
  padding: '0 100px',
  [theme.breakpoints.down('md')]: {
    // border: '1px solid red',
  },
}));

export const PreferenceContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderTop: `1px solid ${theme.palette.grey[200]}`,
  padding: '40px 0',
}));

export const Title = styled(Typography)({});

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
}));

export const Button = styled(MuiButton)(({ theme }) => ({
  '&.MuiButtonBase-root': {
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: '0px 16px',
    marginLeft: '16px',
    height: '40px',
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

export const OutlinedLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '20px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '18px',
  },
}));

export const ColorCircle = styled(Box)({
  borderRadius: '999px',
  width: '24px',
  height: '24px',
  margin: '8px',
  '&:hover': {
    transition: 'all 250ms ease-in-out',
    transform: 'scale(1.2)',
  },
});

export const HelperText = styled(FormHelperText)(({ theme }) => ({
  color: theme.palette.grey[600],
  [theme.breakpoints.down('sm')]: {
    border: '1px solid red',
  },
}));
