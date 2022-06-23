import { makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';

export const useFaqBoxStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '280px',
    height: '298px',
    padding: theme.spacing(3),
    backgroundColor: '#fafafa',
    boxShadow:
      '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    position: 'relative',
  },
  innerWrapper: {
    textDecoration: 'none',
    width: '100%',
  },
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: '34px',
    lineHeight: '123%',
    letter: '0.25px',
    color: theme.palette.primary.main,
  },
  description: {
    fontFamily: 'Rubik',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '143%',
    letter: '0.17px',
    color: lighten(theme.palette.primary.main, 0.6),
    padding: ` ${theme.spacing(2)} 0`,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    padding: `0 ${theme.spacing(3)}`,
    textalign: 'center',
  },
  button: {
    width: '100% !important',
    height: 'auto',
    justifyContent: 'center',
  },
}));
