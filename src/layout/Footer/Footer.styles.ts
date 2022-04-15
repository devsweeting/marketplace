import { makeStyles } from '@mui/styles';

export const useFooterStyles = makeStyles(
  (theme) => ({
    container: {
      borderTop: `2px solid ${theme.palette.primary.main}`,
      textAlign: 'center',
    },
  }),
  { name: 'footer' },
);
