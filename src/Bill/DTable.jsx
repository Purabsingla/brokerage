import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { RxFontRoman } from 'react-icons/rx';
import Print from './Print';

const columns = [
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'comodity', label: 'Comodity', minWidth: 170 },
  { id: 'party', label: 'Party', minWidth: 170 },
  { id: 'rate', label: 'Rate', minWidth: 80 },
  { id: 'quantity', label: 'Quantity', minWidth: 80 },
  { id: 'amount', label: 'Amount', minWidth: 80 },
  { id: 'type', label: 'Type', minWidth: 30 },
];

export default function StickyHeadSaudaTable({ SaudaData, SearchData }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [Data, setData] = React.useState([]);

  React.useEffect(() => {
    const SaudaRealtedData = SaudaData.map((items) => ({
      id: items.id,
      date: items.date,
      comodity: items.comodity,
      party: items.party,
      rate: items.rate,
      quantity: items.quantity,
      amount: items.amount,
      type: items.type,
    }));
    SaudaRealtedData.sort(function (a, b) {
      return a - b;
    });
    setData(SaudaRealtedData);
  }, [SaudaData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontFamily: RxFontRoman,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Data.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
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
          count={Data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Print SearchData={SearchData} Data={Data} />
    </>
  );
}
