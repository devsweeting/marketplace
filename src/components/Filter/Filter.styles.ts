import { makeStyles } from '@mui/styles';

export const useFilterStyles = makeStyles(
  () => ({
    container: {
      boxSizing: 'border-box',
      borderCollor: '#fff',
      // borderImageSource: `url('/images/detail_page.png')`,
      borderImageSlice: 1,
    },
  }),
  { name: 'filter' },
);
