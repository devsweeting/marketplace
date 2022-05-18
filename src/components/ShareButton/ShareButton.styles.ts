import { makeStyles } from '@mui/styles';

export const useShareButtonStyles = makeStyles(
  (theme) => ({
    buttonWrapper: {
      cursor: 'pointer',
    },
    shareButton: {
      color: theme.palette.secondary.main,
      textTransform: 'uppercase',
      fontSize: '12px',
      fontWeight: 700,
    },
    iconsList: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '4px 8px',
      width: '100%',
    },
  }),
  { name: 'shareButton' },
);
