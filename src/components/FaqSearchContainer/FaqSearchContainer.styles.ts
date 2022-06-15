import { makeStyles } from '@mui/styles';

export const useFaqSearchContainerStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(6),
    borderRadius: theme.spacing(1),
    width: '100%',
    minHeight: '500px',
    backgroundColor: theme.palette.accent.main,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(0),
      width: '100vw',
      height: '100vh',
    },
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: '748px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      padding: `0 ${theme.spacing(5)}`,
      textAlign: 'center',
    },
  },
  flexWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    margin: theme.spacing(0.5),
  },
  topicsLegend: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: theme.spacing(0.5),
    },
  },
}));
