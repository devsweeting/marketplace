import { makeStyles } from '@mui/styles';

export const usePropertyBoxStyle = makeStyles(
  (theme) => ({
    wrapper: {
      background: '#f8f8f8',
      width: '100%',
      maxWidth: '180px',
      borderRadius: theme.spacing(2),
      margin: `0 ${theme.spacing(4)} ${theme.spacing(6)} 0`,
      border: '1px solid #fff',
    },
    title: {
      color: '#000',
      background: '#FFDD00',
      borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
      fontSize: '12px',
      lineHeight: '26px',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    propertyValue: {
      textAlign: 'center',
      fontWeight: 700,
      lineHeight: '32px',
      paddingTop: theme.spacing(2),
    },
    propertyDescription: {
      textAlign: 'center',
      textDecoration: 'none',
      paddingBottom: theme.spacing(2),
      textTransform: 'lowercase',
    },
  }),
  { name: 'property-box' },
);
