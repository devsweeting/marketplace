import { makeStyles } from '@mui/styles';

export const useAccordionStyles = makeStyles(
  (theme) => ({
    textItemTitle: {
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '27px',
      letter: '0.15px',
      [theme.breakpoints.down('md')]: {
        fontSize: '16px',
        lineHeight: '20px',
        letter: '0.25px',
      },
    },
    accordionSummary: {
      backgroundColor: '#fafafa',
      borderRadius: 0,
      height: '76px',
      [theme.breakpoints.down('md')]: {
        height: '109px',
      },
    },
    accordionDetails: {
      backgroundColor: '#fafafa',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      letter: '0.15px',
      paddingBottom: theme.spacing(3),
    },
  }),
  { name: 'AccordionTextItem' },
);
