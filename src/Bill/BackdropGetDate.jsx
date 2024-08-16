import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function BackdropGetDate({
  open,
  handleClose,
  handleData,
  handleSearch,
}) {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    name: '',
    start_date: dayjs('2024-04-01'),
    end_date: dayjs(),
  });

  //HandleChange events
  const handleChange = (event) => {
    setformdata({ ...formdata, [event.target.name]: event.target.value });
  };

  const handleDateChange = (name, date) => {
    setformdata({ ...formdata, [name]: date });
  };
  //Alerts ^-^

  const [AnotherOpen, setAnotherOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleClose1 = () => {
    setAnotherOpen(false);
    setErrorOpen(false);
  };

  //Handling Dates
  React.useEffect(() => {
    const isSameMonthDay =
      formdata.start_date.month() === formdata.end_date.month() &&
      formdata.start_date.date() === formdata.end_date.date();
    const isOneYearAhead =
      formdata.end_date.year() === formdata.start_date.year() + 1;

    if (isSameMonthDay && isOneYearAhead) {
      setformdata({ start_date: dayjs(formdata.end_date) });
    }
  }, [formdata.start_date, formdata.end_date]);

  //Calling Api
  const handleCheck = () => {
    const formattedData = {
      ...formdata,
      start_date: formdata.start_date
        ? format(formdata.start_date.$d, 'yyyy-MM-dd')
        : null,
      end_date: formdata.end_date
        ? format(formdata.end_date.$d, 'yyyy-MM-dd')
        : null,
    };
    formattedData.name !== '' &&
    formattedData.name !== null &&
    formattedData.name !== undefined
      ? fetch('http://localhost:3001/saudaAll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.response) {
              handleData(data.Sauda);
              handleSearch(formattedData);
              handleClose();
              navigate('/Bill/saudaData');
            } else {
              setAnotherOpen(true);
            }
          })
      : setErrorOpen(true);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Billing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the Ledger and Date from this to this
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Ledger"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="From Date"
                  value={formdata.start_date}
                  onChange={(date) => handleDateChange('start_date', date)}
                />
                <DatePicker
                  label="To Date"
                  value={formdata.end_date}
                  onChange={(date) => handleDateChange('end_date', date)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCheck}>Check</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={AnotherOpen}
        onClose={handleClose1}
        autoHideDuration={4000}
      >
        <Alert severity="warning" variant="filled">
          Not Found
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} onClose={handleClose1} autoHideDuration={4000}>
        <Alert severity="error" variant="filled">
          Please enter some value ^-^
        </Alert>
      </Snackbar>
    </>
  );
}
