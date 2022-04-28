import { makeStyles } from '@mui/styles';

export const useEnhancedTableStyles = makeStyles((theme) => ({
  // wrapper: {
  //   [theme.breakpoints.down('md')]: {
  //     paddingTop: theme.spacing(6),
  //   },
  // },
  stickyPosition: {
    [theme.breakpoints.down('md')]: {
      position: 'sticky',
      left: 0,
      zIndex: 5,
      background: '#fff',
      borderRight: '2px solid #000',
    },
  },
}));
