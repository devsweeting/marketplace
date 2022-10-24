import { Grid, Typography, styled } from '@mui/material';

export const GridContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: '24px',
  margin: '56px auto',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: '23px auto',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '15px',
  },
}));

export const StatTitle = styled(Typography)({
  fontSize: '16px',
  lineHeight: '16px',
  fontWeight: '500',
  textTransform: 'uppercase',
});
export const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '3.75rem',
  fontWeight: '600',
  lineHeight: '60px',
  fontStyle: 'normal',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.75rem',
  },
}));
