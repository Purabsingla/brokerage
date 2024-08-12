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
import TextField from '@mui/material/TextField';

const columns = [
  { id: 'party', label: 'Party', minWidth: 170 },
  { id: 'amount', label: 'Amount', minWidth: 170 },
];

export default function TotalDalali() {
  const [SaudaData, setSaudaData] = React.useState([]);
  const [ledger, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [total, setTotal] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    fetch('http://localhost:3001/sauda')
      .then((response) => response.json())
      .then((data) => (data.Data ? setSaudaData(data.Data) : setSaudaData([])));
  }, []);

  React.useEffect(() => {
    const aggregateAmounts = (data) => {
      const result = {};

      data.forEach((entry) => {
        const { buyer, b_amount, seller, s_amount } = entry;

        if (!result[buyer]) {
          result[buyer] = 0;
        }
        result[buyer] += b_amount;

        if (!result[seller]) {
          result[seller] = 0;
        }
        result[seller] += s_amount;
      });

      return Object.keys(result).map((party) => ({
        party,
        amount: result[party],
      }));
    };
    let Data = aggregateAmounts(SaudaData);
    Data && setData(Data);
    setTotal(Data.reduce((acc, curr) => acc + curr.amount, 0));
  }, [ledger, SaudaData]);
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 590 }}>
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
                      fontSize: 23,
                      fontWeight: 'bold',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ledger
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
          count={ledger.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <TextField
        disabled
        id="standard-disabled"
        label="Total Amount"
        value={total}
        variant="standard"
        sx={{ width: 200, marginY: 2, marginLeft: 25 }}
      />
    </>
  );
}
