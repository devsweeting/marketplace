import { makeStyles } from '@mui/styles';

export const useExplorePageStyles = makeStyles((theme) => ({
  assetListClosed: {
    flexGrow: 1,

    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    margin: '0 10px 10px 10px',
    width: '800px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '400px',
    },
  },
  assetListOpen: {
    flexGrow: 1,

    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    margin: '0 500px 10px 10px',
    width: '500px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '350px',
    },
  },
}));
