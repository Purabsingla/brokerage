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
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
const columns = [
  { id: 'ledger', label: 'Ledger', minWidth: 170 },
  { id: 'station', label: 'Station', minWidth: 170 },
  { id: 'grop', label: 'Group', minWidth: 170 },
];

export default function LedgerStationGroupTable({ initialLedger }) {
  const [ledger, setLedger] = React.useState(initialLedger);
  const [page, setPage] = React.useState(0);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [updatedLedger, setUpdate] = React.useState({
    ledger: '',
    station: '',
    grop: '',
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (row) => {
    setCurrentRow(row);
    setUpdate({
      ledger: row.ledger,
      station: row.station,
      grop: row.grop,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdateChange = (event) => {
    setUpdate({ ...updatedLedger, [event.target.name]: event.target.value });
  };

  const handleClick = (row) => {
    try {
      let ledgerForDelete = row.ledger;
      console.log(row);
      fetch('http://localhost:3001/ledger', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ledger: ledgerForDelete }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            const updatedLedger = ledger.filter(
              (item) =>
                !(
                  item.ledger === row.ledger &&
                  item.station === row.station &&
                  item.grop === row.grop
                )
            );
            setLedger(updatedLedger);
            alert('Deleted successfully');
          } else {
            alert('invalid operation');
          }
        });
      const updatedLedger = ledger.filter(
        (item) =>
          !(
            item.ledger === row.ledger &&
            item.station === row.station &&
            item.grop === row.grop
          )
      );
      setLedger(updatedLedger);
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  };
  const FetchApi = () => {
    try {
      fetch('http://localhost:3001/ledger')
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            alert('Data Updated Sucessfully');
            setLedger(data.Data);
          } else console.log('Failed as a API');
        });
    } catch (err) {
      alert('Failed to fetch data');
      console.log(err.message);
    }
  };
  const handleClickUpdate = () => {
    if (!currentRow) return;

    try {
      fetch('http://localhost:3001/ledger', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ledger1: currentRow.ledger,
          ledger: updatedLedger.ledger,
          station: updatedLedger.station,
          group: updatedLedger.grop,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            FetchApi();
            handleClose();
          } else {
            alert('Invalid operation');
          }
        });
    } catch (err) {
      alert('Failed to update');
    }
  };
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 629 }}>
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
                      <TableCell key="actions" align="center">
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleClickOpen(row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleClick(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
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
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Updating Ledger</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="ledger"
            label="Ledger"
            fullWidth
            variant="outlined"
            value={updatedLedger.ledger}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="dense"
            name="station"
            label="Station"
            fullWidth
            variant="outlined"
            value={updatedLedger.station}
            onChange={handleUpdateChange}
          />
          <TextField
            margin="dense"
            name="grop"
            label="Group"
            fullWidth
            variant="outlined"
            value={updatedLedger.grop}
            onChange={handleUpdateChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
