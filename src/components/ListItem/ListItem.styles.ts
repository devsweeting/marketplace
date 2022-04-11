import { makeStyles } from '@mui/styles';

export const useListItemStyles = makeStyles(
  (theme) => ({
    container: {
      boxShadow: 'none',
      background: 'none',
      width: 270,
      paddingTop: theme.spacing(13),
      paddingBottom: theme.spacing(0.7),
      margin: theme.spacing(2),
    },
    mainImage: {
      borderRadius: theme.spacing(1),
    },
    priceCryptoValue: {
      fontSize: '24px',
      lineHeight: '133,4%',
    },

    priceDollarValue: {
      fontFamily: 'Rubik',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '14px',
    },
  }),
  { name: 'listItem' },
);
