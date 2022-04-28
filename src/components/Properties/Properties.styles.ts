import { makeStyles } from '@mui/styles';

export const usePropertiesStyle = makeStyles(
  (theme) => ({
    wrapper: {
      [theme.breakpoints.down('md')]: {
        paddingTop: theme.spacing(6),
      },
    },
  }),
  { name: 'properties' },
);
