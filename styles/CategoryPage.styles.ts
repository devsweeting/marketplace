import makeStyles from '@mui/styles/makeStyles';

export const useCategoryPageStyles = makeStyles(({ theme }) => ({
  wrapper: {
    maxWidth: 1440,
    margin: '0 auto',
    marginTop: '0',
    padding: '0 8px',
  },
  hideOnMobile: {
    '@media (max-width:900px)': {
      display: 'none',
    },
  },
  centerOnMobile: {
    '@media (max-width:900px)': {
      width: '100%',
      textAlign: 'center',
    },
  },
}));
