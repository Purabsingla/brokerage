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

// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Saudaaaa from './UpdateSauda';
const columns = [
  { id: 'date', label: 'Date', minWidth: 110 },
  { id: 'comodity', label: 'Comodity', minWidth: 150 },
  { id: 'quantity', label: 'Quantity', minWidth: 80 },
  { id: 'buyer', label: 'Buyer', minWidth: 170 },
  { id: 'b_rate', label: 'Rate', minWidth: 80 },
  { id: 'b_amount', label: 'Amount', minWidth: 80 },
  { id: 'seller', label: 'Seller', minWidth: 150 },
  { id: 's_rate', label: 'Rate', minWidth: 80 },
  { id: 's_amount', label: 'Amount', minWidth: 80 },
  { id: 'weigth', label: 'Weigth', minWidth: 80 },
];

export default function SaudaTable({ initialSauda }) {
  const [sauda, setSauda] = React.useState(initialSauda);
  const [page, setPage] = React.useState(0);
  const [currentRow, setCurrentRow] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [updatedSauda, setUpdate] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [fetchTrigger, setFetchTrigger] = React.useState(false);
  React.useEffect(() => {
    if (fetchTrigger) {
      handleClickUpdate(); // Call API function
      setFetchTrigger(false); // Reset trigger
    }
  }, [updatedSauda, fetchTrigger]);
  const handleClickOpen = (row) => {
    setCurrentRow(row);
    console.log(currentRow, ' from SaudaTable');
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

  const handleClick = (row) => {
    try {
      let saudaForDelete = row.id;
      console.log(row);
      fetch('http://localhost:3001/sauda', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: saudaForDelete }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            const updatedLedger = sauda.filter(
              (item) =>
                !(
                  item.date === row.date &&
                  item.comodity === row.comodity &&
                  item.quantity === row.quantity &&
                  item.buyer === row.buyer &&
                  item.b_rate === row.b_rate &&
                  item.b_amount === row.b_amount &&
                  item.seller === row.seller &&
                  item.s_rate === row.s_rate &&
                  item.s_amount === row.s_amount &&
                  item.weigth === row.weigth
                )
            );
            setSauda(updatedLedger);
            alert('Deleted successfully');
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
      fetch('http://localhost:3001/sauda')
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            alert('Data Updated Sucessfully');
            setSauda(data.Data);
          } else console.log('Failed as a API');
        });
    } catch (err) {
      alert('Failed to fetch data');
      console.log(err.message);
    }
  };
  const handleClickUpdate = () => {
    if (!currentRow) return;
    console.log(
      'Fetching data working and value of weigth is ',
      updatedSauda.weigth,
      ' we are getting man'
    );
    try {
      fetch('http://localhost:3001/sauda', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updatedSauda.id,
          date: updatedSauda.date,
          comodity: updatedSauda.comodity,
          quantity: updatedSauda.quantity,
          buyer: updatedSauda.buyer,
          brate: updatedSauda.brate,
          bnature: updatedSauda.bnature,
          bamount: updatedSauda.bamount,
          seller: updatedSauda.seller,
          srate: updatedSauda.srate,
          snature: updatedSauda.snature,
          samount: updatedSauda.samount,
          weight: updatedSauda.weigth,
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
  const FetchData = (value) => {
    setUpdate({
      id: currentRow.id,
      date: value.date ? value.date : currentRow.date,
      comodity: value.comodity ? value.comodity : currentRow.comodity,
      quantity: value.quantity ? value.quantity : currentRow.quantity,
      buyer: value.buyer ? value.buyer : currentRow.buyer,
      brate: value.brate ? value.brate : currentRow.b_rate,
      bnature: value.bnature ? value.bnature : currentRow.b_nature,
      bamount: value.bamount ? value.bamount : currentRow.b_amount,
      seller: value.seller ? value.seller : currentRow.seller,
      srate: value.srate ? value.srate : currentRow.s_rate,
      snature: value.snature ? value.snature : currentRow.s_nature,
      samount: value.samount ? value.samount : currentRow.s_amount,
      weigth: value.weigth ? value.weigth : currentRow.weigth,
    });
    setFetchTrigger(true);
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
                      fontSize: 21,
                      fontWeight: 'bold',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sauda
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
          count={sauda.length}
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
        maxWidth="xl"
      >
        <DialogTitle>Updating Sauda</DialogTitle>
        <DialogContent>
          {currentRow && (
            <Saudaaaa
              handleClose={handleClose}
              FetchData={FetchData}
              CurrentDate={currentRow.date}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
