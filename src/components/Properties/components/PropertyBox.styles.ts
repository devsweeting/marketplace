import { makeStyles } from '@mui/styles';

export const usePropertyBoxStyle = makeStyles(
  (theme) => ({
    wrapper: {
      background: '#f8f8f8',
      width: '100%',
      maxWidth: '154px',
      borderRadius: theme.spacing(2),
      margin: `0 ${theme.spacing(2)} ${theme.spacing(4)} 0`,
      border: `1px solid ${theme.palette.secondary.main}`,
      [theme.breakpoints.down('md')]: {
        maxWidth: '139.5px',
        margin: `0 ${theme.spacing(1)} ${theme.spacing(2)} 0`,
      },
    },
    title: {
      color: theme.palette.primary.main,
      background: theme.palette.accent.main,
      borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
      fontSize: '12px',
      lineHeight: '26px',
      textAlign: 'center',
      textTransform: 'uppercase',
      [theme.breakpoints.down('md')]: {
        fontFamily: 'Montserrat',
        fontWeight: 700,
        fontSize: '12px',
      },
    },
    propertyValue: {
      textAlign: 'center',
      fontWeight: 700,
      lineHeight: '32px',
      padding: `${theme.spacing(2)} 0`,
      [theme.breakpoints.down('md')]: {
        paddingTop: theme.spacing(1),
      },
    },
  }),
  { name: 'property-box' },
);
