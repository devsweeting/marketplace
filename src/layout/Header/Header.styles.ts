import { makeStyles } from '@mui/styles';
import theme from '../../../styles/theme';

export const useHeaderStyles = makeStyles(
  () => ({
    headerContainer: {
      maxWidth: `calc(1400px - ${theme.spacing(2)})`,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: '0 auto',
      width: '100%',
    },
  }),
  { name: 'header' },
);
