import makeStyles from '@mui/styles/makeStyles';

export const useCategoryPageStyles = makeStyles((theme) => ({
  wrapper: {
    maxWidth: 1440,
    margin: '0 auto',
    marginTop: '0',
    // padding: '0 8px',
  },
  leftColumn: {
    paddingLeft: '100px',
    '@media (max-width:900px)': {
      position: 'fixed',
      minHeight: '100vh',
      zIndex: 110,
      width: '100vw',
      margin: 0,
      padding: '24px',
      top: 0,
      left: 0,
      height: '100%',
      overflowY: 'auto',
    },
  },
  rightColumn: {
    paddingLeft: 40,
    paddingRight: 100,
    '@media (max-width: 900px)': {
      padding: `0 41px`,
    },
  },
  // hideOnMobile: {
  //   '@media (max-width:900px)': {
  //     display: 'none',
  //   },
  // },
  hideOnDesktop: {
    '@media (min-width:900px)': {
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
