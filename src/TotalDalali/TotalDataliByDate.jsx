import * as React from 'react';
import Button from '@mui/material/Button';
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
export default function TotalDalaliByDate({ open, handleClose, handleData }) {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    start_date: dayjs('2024-04-01'),
    end_date: dayjs(),
  });

  const handleDateChange = (name, date) => {
    setformdata({ ...formdata, [name]: date });
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
    fetch('http://localhost:3001/saudabydate', {
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
          console.log('Data Fetched');
          handleClose();
          navigate('/TotalFinalDalali');
        } else {
          alert('Data not found Please retry...');
        }
      });
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Billing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the Date from this to this To get Total Dalali
          </DialogContentText>
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
    </>
  );
}
