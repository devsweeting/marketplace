import { makeStyles } from '@mui/styles';

export const useCardStyles = makeStyles(
  (theme) => ({
    container: {
      boxShadow: 'none',
      background: 'none',
      maxWidth: 270,
      margin: `${theme.spacing(8)} ${theme.spacing(4)} ${theme.spacing(4)} 0`,
      '@media (max-width: 900px)': {
        margin: theme.spacing(2),
      },
      '@media (max-width:600px)': {
        width: '110px',
      },
    },
    itemType: {
      minHeight: 45,
      '@media (max-width: 600px)': {
        minHeight: 65,
        fontFamily: 'Montserrat',
        fontSize: '12px',
        lineHeight: '21px',
        fontWeight: '600',
      },
      '@media (max-width: 340px)': {
        minHeight: 0,
      },
    },
    itemTitle: {
      minHeight: 45,
      '@media (max-width: 600px)': {
        minHeight: 120,
        fontFamily: 'Montserrat',
        fontSize: '16px',
        lineHeight: '19.5px',
        fontWeight: '700',
      },
      '@media (max-width: 340px)': {
        minHeight: 0,
      },
    },
    imageContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    priceContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: theme.spacing(1),
    },
    mainImage: {
      borderRadius: theme.spacing(1),
      width: 'unset !important',
      height: 'unset !important',
      minWidth: 'unset !important',
      maxWidth: 'unset !important',
      minHeight: 'unset !important',
    },
    priceDollarValue: {
      fontFamily: 'Rubik',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '14px',
      letterSpacing: '1px',
      color: 'rgba(0, 0, 0, 0.87)',
    },
  }),
  { name: 'card' },
);
