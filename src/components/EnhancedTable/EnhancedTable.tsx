import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Typography, Divider } from '@mui/material';

interface Column {
  id: 'Event' | 'Price' | 'Qty' | 'From' | 'To' | 'Date';
  label: string;
  align?: 'left';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'Event', label: 'Event' },
  { id: 'Price', label: 'Price', format: (value: number) => value.toFixed(2) },
  {
    id: 'Qty',
    label: 'Qty',
  },
  {
    id: 'From',
    label: 'From',
  },
  {
    id: 'To',
    label: 'To',
  },
  {
    id: 'Date',
    label: 'Date',
  },
];

interface Data {
  Event: string;
  Price: number;
  Qty: number;
  From: string;
  To: string;
  Date: string;
}

function createData(
  Event: string,
  Price: number,
  Qty: number,
  From: string,
  To: string,
  Date: string,
): Data {
  return { Event, Price, Qty, From, To, Date };
}

const rows = [
  createData('Created', 0.04, 1, 'ComiX', 'EVNINN', '12.03.22'),
  createData('Minted', 0.04, 1, 'ComiX', 'EVNINN', '12.03.22'),
  createData('Listed', 0.04, 1, 'ComiX', 'EVNINN', '12.03.22'),
  createData('Transferred', 0.04, 1, 'ComiX', 'EVNINN', '12.03.22'),
  createData('Redeemed', 0.04, 1, 'ComiX', 'EVNINN', '12.03.22'),
];

export default function EnhancedTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (Price: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (Qty: React.ChangeQty<HTMLInputElement>) => {
    setRowsPerPage(+Qty.target.value);
    setPage(0);
  };

  return (
    <Box mt={6}>
      <Box mb={6}>
        <Divider />
      </Box>
      <Typography variant="h4" component="h2" mb={3} sx={{ color: '#000' }}>
        Event History
      </Typography>

      <Paper sx={{ width: '100%', boxShadow: 'none' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      textDecoration: 'none',
                      fontWeight: 400,
                      fontFamily: 'League Gothic',
                      fontSize: '16px',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.Price}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            textDecoration: 'none',
                            fontWeight: 400,
                            fontFamily: 'Rubik',
                            fontSize: '12px',
                          }}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
