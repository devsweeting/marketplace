import { makeStyles } from '@mui/styles';

export const useHowItWorks = makeStyles(
  () => ({
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
    },
  }),
  { name: 'howItWorks' },
);
