import { makeStyles } from '@mui/styles';

export const useExplorePageStyles = makeStyles((theme) => ({
  assetListClosed: {
    flexGrow: 1,

    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  assetListOpen: {
    flexGrow: 1,

    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    margin: '0 500px 0 0',
    width: '500px',
  },
}));
