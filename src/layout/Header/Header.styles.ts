import { makeStyles } from '@mui/styles';
import theme from '../../../styles/theme';

export const useHeaderStyles = makeStyles(
  () => ({
    headerContainer: {
      maxWidth: `calc(1440px - ${theme.spacing(1)})`,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: '0 auto',
      width: '100%',
      padding: `0 ${theme.spacing(1)}`,
    },
  }),
  { name: 'header' },
);
