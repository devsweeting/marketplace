import { makeStyles } from '@mui/styles';

export const useListItemStyles = makeStyles(
  (theme) => ({
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      wrap: 'wrap',
      '@media (max-width: 900px)': {
        justifyContent: 'center',
      },
    },
    container: {
      boxShadow: 'none',
      background: 'none',
      width: 270,
      margin: `${theme.spacing(8)} ${theme.spacing(4)} ${theme.spacing(4)} 0`,
      '@media (max-width: 900px)': {
        margin: theme.spacing(2),
      },
      '@media (max-width:600px)': {
        width: '139.5px',
      },
    },
    itemType: {
      minHeight: 45,
      '@media (max-width: 600px)': {
        minHeight: 65,
      },
      '@media (max-width: 340px)': {
        minHeight: 0,
      },
    },
    itemTitle: {
      minHeight: 45,
      '@media (max-width: 600px)': {
        minHeight: 145,
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
  { name: 'listItem' },
);
