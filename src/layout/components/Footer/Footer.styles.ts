import { makeStyles } from '@mui/styles';

export const useFooterStyles = makeStyles(
  (theme) => ({
    container: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',

      alignItems: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: theme.palette.primary.main,
    },
    text: {
      fontFamily: 'Rubik',
      color: 'white',
      fontWeight: 300,
      fontSize: '16px',
      lineHeight: '17px',
      opacity: '0.8',
      margin: '24px 0px',
    },
  }),
  { name: 'footer' },
);
