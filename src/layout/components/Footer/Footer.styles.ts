import { makeStyles } from '@mui/styles';

export const useFooterStyles = makeStyles(
  (theme) => ({
    container: {
      textAlign: 'center',
      maxWidth: `calc(1440px - ${theme.spacing(1)})`,
      width: '100%',
    },
    text: {
      fontFamily: 'Rubik',
      fontWeight: 300,
      fontSize: '14px',
      lineHeight: '17px',
      opacity: '0.3',
      margin: '24px 0px',
    },
  }),
  { name: 'footer' },
);
