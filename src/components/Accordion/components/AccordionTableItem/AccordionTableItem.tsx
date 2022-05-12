import * as React from 'react';
import { Table as MaterialTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Accordion as MaterialAccordion } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import classNames from 'classnames';
import { useTableStyles } from './AccordionTableItem.styles';

export type BlockChainInfoProps = Record<string, string>;

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
  const { contact_id, token_id, token_type, supply, blockchain } = tableData;

  return (
    <MaterialAccordion disableGutters defaultExpanded={isExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.tableTitle}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <MaterialTable aria-label="accordion table">
            <TableBody>
              {contact_id && (
                <TableRow>
                  <TableCell component="th" scope="row" className={classes.noBorder}>
                    Contact ID
                  </TableCell>
                  <TableCell
                    align="right"
                    className={classNames(classes.noBorder, classes.blueText)}
                  >
                    {contact_id}
                  </TableCell>
                </TableRow>
              )}
              {token_id && (
                <TableRow>
                  <TableCell component="th" scope="row" className={classes.noBorder}>
                    Token ID
                  </TableCell>
                  <TableCell align="right" className={classes.noBorder}>
                    {token_id}
                  </TableCell>
                </TableRow>
              )}
              {token_type && (
                <TableRow>
                  <TableCell component="th" scope="row" className={classes.noBorder}>
                    Token Type
                  </TableCell>
                  <TableCell align="right" className={classes.noBorder}>
                    {token_type}
                  </TableCell>
                </TableRow>
              )}
              {supply && (
                <TableRow>
                  <TableCell component="th" scope="row" className={classes.noBorder}>
                    Supply
                  </TableCell>
                  <TableCell align="right" className={classes.noBorder}>
                    {supply}
                  </TableCell>
                </TableRow>
              )}
              {blockchain && (
                <TableRow>
                  <TableCell component="th" scope="row" className={classes.noBorder}>
                    Blockchain
                  </TableCell>
                  <TableCell align="right" className={classes.noBorder}>
                    {blockchain}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </MaterialTable>
        </TableContainer>
      </AccordionDetails>
    </MaterialAccordion>
  );
};
