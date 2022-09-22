import { makeStyles } from '@mui/styles';

export const useFeaturedStyles = makeStyles(
  () => ({
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px',
      border: '1px solid #fff',
    },
  }),
  { name: 'featured' },
);
