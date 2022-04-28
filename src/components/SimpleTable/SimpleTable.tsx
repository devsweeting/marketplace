import * as React from 'react';
import { Table as MaterialTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Box, Divider } from '@mui/material';
import { useSimpleTableStyles } from './SimpletTable.styles';
import classNames from 'classnames';
import { mockTraits } from '../../__mocks__/mockApiData';

export type BlockChainInfoProps = Record<string, string>;

export const SimpleTable = ({
  title,
}: // tableData,
// isExpanded,
{
  title: string;
  // tableData: BlockChainInfoProps;
  isExpanded: boolean;
}) => {
  const classes = useSimpleTableStyles();
  // const { contact_id, token_id, token_type, supply, blockchain } = tableData;
  const { contact_id, token_id, token_type, supply, blockchain } = mockTraits;
  return (
    <Box className={classes.wrapper}>
      <Box my={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Divider />
      </Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ marginBottom: { xs: 2, md: 3 }, color: '#000' }}
      >
        Blockchain info
      </Typography>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <MaterialTable aria-label="accordion table">
          <TableBody>
            {contact_id && (
              <TableRow
                sx={{
                  verticalAlign: 'top',
                }}
              >
                <TableCell component="th" scope="row" className={classes.boldText}>
                  Contact ID
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    wordBreak: 'break-all',
                  }}
                >
                  {contact_id}
                </TableCell>
              </TableRow>
            )}
            {token_id && (
              <TableRow>
                <TableCell component="th" scope="row" className={classes.boldText}>
                  Token ID
                </TableCell>
                <TableCell align="right">{token_id}</TableCell>
              </TableRow>
            )}
            {token_type && (
              <TableRow>
                <TableCell component="th" scope="row" className={classes.boldText}>
                  Token Type
                </TableCell>
                <TableCell align="right">{token_type}</TableCell>
              </TableRow>
            )}
            {supply && (
              <TableRow>
                <TableCell component="th" scope="row" className={classes.boldText}>
                  Supply
                </TableCell>
                <TableCell align="right">{supply}</TableCell>
              </TableRow>
            )}
            {blockchain && (
              <TableRow>
                <TableCell component="th" scope="row" className={classes.boldText}>
                  Blockchain
                </TableCell>
                <TableCell align="right">{blockchain}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </MaterialTable>
      </TableContainer>
    </Box>
  );
};
