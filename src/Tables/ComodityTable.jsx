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
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Alert from '@mui/material/Alert';

const columns = [{ id: 'comodity', label: 'Comodity', minWidth: 170 }];

export default function ComodityTable() {
  const [comodity, setComodity] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [updatedComo, setUpdate] = React.useState({
    comodity: '',
  });
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [DeleteAlert, setDeleteAlert] = React.useState(false);
  const handlealertdelete = () => {
    setDeleteAlert(true);
  };
  const handleCheck = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpen(false);
    setDeleteAlert(false);
  };
  React.useEffect(() => {
    fetch('http://localhost:3001/comodity')
      .then((response) => response.json())
      .then((data) => {
        data.Data ? setComodity(data.Data) : setComodity([]);
      });
  }, []);
  const handleClickOpen = (row) => {
    setCurrentRow(row);
    setUpdate({
      comodity: row.comodity,
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
    setUpdate({ ...updatedComo, [event.target.name]: event.target.value });
  };

  const handleClick = (row) => {
    try {
      let comoForDelete = row.comodity;
      console.log(row);
      fetch('http://localhost:3001/comodity', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comodity: comoForDelete }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            const updatedComo = comodity.filter(
              (item) => !(item.comodity === row.comodity)
            );
            setComodity(updatedComo);
            handlealertdelete();
          } else {
            alert('invalid operation');
          }
        });
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  };
  const FetchApi = () => {
    try {
      fetch('http://localhost:3001/comodity')
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            handleCheck();
            setComodity(data.Data);
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
      fetch('http://localhost:3001/comodity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comodity1: currentRow.comodity,
          comodity: updatedComo.comodity,
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
              {comodity
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
          count={comodity.length}
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
        <DialogTitle>Updating Comodity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="comodity"
            label="Comodity"
            fullWidth
            variant="outlined"
            value={updatedComo.comodity}
            onChange={handleUpdateChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClickUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        onClose={handleCloseAlert}
        autoHideDuration={6000}
        message="Update Sucessfully"
        key={'bottom' + 'left'}
      >
        <Alert severity="success">Update Sucessfully</Alert>
      </Snackbar>
      <Snackbar
        open={DeleteAlert}
        onClose={handleCloseAlert}
        autoHideDuration={6000}
        message="Update Sucessfully"
        key={'bottom' + 'left'}
      >
        <Alert severity="success">Delete Sucessfully</Alert>
      </Snackbar>
    </>
  );
}
