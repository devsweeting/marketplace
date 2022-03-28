import { makeStyles } from '@mui/styles';

export const useTableStyles = makeStyles(
  {
    accordionDetails: {
      padding: 0,
    },
    tableContainer: {
      boxShadow: 'none',
      padding: 0,
    },
    tableTitle: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
      letter: '0.15px',
    },
    noBorder: {
      border: 0,
    },
  },
  { name: 'accordionTableItem' },
);
