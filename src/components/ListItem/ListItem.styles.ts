import { makeStyles } from '@mui/styles';

export const useListItemStyles = makeStyles(
  (theme) => ({
    container: {
      boxShadow: 'none',
      background: 'none',
      width: 270,
      margin: `${theme.spacing(8)} ${theme.spacing(4)} ${theme.spacing(4)} 0`,
    },
    imageContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url('/images/list/partnerImage.svg')`,
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
    priceCryptoValue: {
      fontSize: '24px',
      lineHeight: '133,4%',
      margin: `0 ${theme.spacing(1)}`,
    },
    priceDollarValue: {
      fontFamily: 'Rubik',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '14px',
      letterSpacing: '1px',
    },
  }),
  { name: 'listItem' },
);
