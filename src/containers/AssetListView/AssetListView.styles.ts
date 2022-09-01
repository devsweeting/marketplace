import { makeStyles } from '@mui/styles';

export const useAssetListViewStyles = makeStyles((theme) => ({
  listWrapper: {
    display: 'block',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: '600px',
    },
  },
}));
