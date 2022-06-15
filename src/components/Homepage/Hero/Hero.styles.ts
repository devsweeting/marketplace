import { makeStyles } from '@mui/styles';

export const useHeroStyles = makeStyles(
  () => ({
    wrapper: {
      background: '#ebebeb',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px',
    },
  }),
  { name: 'hero' },
);
