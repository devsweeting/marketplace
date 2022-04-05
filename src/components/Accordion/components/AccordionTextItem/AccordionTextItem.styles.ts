import { makeStyles } from '@mui/styles';

export const useAccordionStyles = makeStyles(
  () => ({
    textItemTitle: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
      letter: '0.15px',
      // color: theme.palette.primary.main,
    },
  }),
  { name: 'AccordionTextItem' },
);
