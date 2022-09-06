import { makeStyles } from '@mui/styles';

export const useHeroStyles = makeStyles(
  () => ({
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
    },
  }),
  { name: 'hero' },
);
