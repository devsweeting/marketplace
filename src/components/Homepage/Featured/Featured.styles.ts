import { makeStyles } from '@mui/styles';

export const useFeaturedStyles = makeStyles(
  () => ({
    wrapper: {
      background: '#ebebeb',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px',
      border: '1px solid #fff',
    },
  }),
  { name: 'featured' },
);
