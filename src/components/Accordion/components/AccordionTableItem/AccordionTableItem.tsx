import * as React from 'react';
import { Table as MaterialTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Accordion as MaterialAccordion } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import { useTableStyles } from './AccordionTableItem.styles';

type BlockChaninInfo = {
  name: string;
  value: string;
};

type BlockChainInfoProps = BlockChaninInfo[];

export const AccordionTableItem = ({
  title,
  tableData,
  isExpanded,
}: {
  title: string;
  tableData: BlockChainInfoProps;
  isExpanded: boolean;
}) => {
  const classes = useTableStyles();
  // index styln na podstawie indexu

  return (
    <MaterialAccordion disableGutters defaultExpanded={isExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.tableTitle}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <MaterialTable aria-label="accordion table">
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" className={classes.noBorder}>
                    {row.name}
                  </TableCell>
                  <TableCell align="right" className={classes.noBorder}>
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MaterialTable>
        </TableContainer>
      </AccordionDetails>
    </MaterialAccordion>
  );
};
