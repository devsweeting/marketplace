import { makeStyles } from '@mui/styles';

export const useDescriptionTextStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(6),
    },
  },
}));
