import { makeStyles } from '@mui/styles';

export const useAssetListViewStyles = makeStyles((theme) => ({
  listWrapper: {
    display: 'block',
    width: '1200px',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: 'auto',
    },
  },
}));