import { makeStyles } from '@mui/styles';

export const useExplorePageStyles = makeStyles((theme) => ({
  assetListClosed: {
    flexGrow: 1,

    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    margin: '10px 10px 10px 10px',
    width: '800px',
  },
  assetListOpen: {
    flexGrow: 1,

    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    margin: '10px 700px 10px 10px',
    width: '500px',
  },
}));
