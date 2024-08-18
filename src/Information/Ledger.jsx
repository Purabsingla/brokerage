import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Ledger() {
  const [formdata, setformdata] = useState({
    ledger: '',
    station: '',
    group: '',
  });
  const [open, setOpen] = useState(false);
  const [Check, SetCheck] = useState({
    ledger: '',
    station: '',
    group: '',
  });
  const [CheckData, setCheckData] = useState(false);
  const [AnotherOpen, setAnotherOpen] = useState(false);
  const handleClickLedger = () => {
    setOpen(true);
    setformdata({ ledger: '', station: '', group: '' });
  };
  const handleClickSetLedger = () => {
    setAnotherOpen(true);
    setformdata({ ledger: '', station: '', group: '' });
  };
  const handleClose = () => {
    setOpen(false);
    setAnotherOpen(false);
    setCheckData(false);
  };
  const handleChange = (event) => {
    setformdata({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };
  const handleClick = () => {
    if (
      formdata.ledger === '' &&
      formdata.station === '' &&
      formdata.group === ''
    ) {
      setCheckData(true);
      return;
    }
    Check.some((check) => check.ledger.trim() === formdata.ledger.trim())
      ? handleClickSetLedger()
      : fetch('http://localhost:3001/ledger', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formdata),
        })
          .then((response) => response.json())
          .then((data) => handleClickLedger())
          .catch((error) => {
            console.error('Error:', error);
          });
  };
  useEffect((event) => {
    fetch('http://localhost:3001/ledger')
      .then((response) => response.json())
      .then((data) => {
        SetCheck(data.Data);
      });
  }, []);
  return (
    <>
      <h1 className="text-5xl font-semibold font-PlaywriteITModerna pt-4 flex justify-center">
        Ledger
      </h1>
      <div className="p-4 flex flex-col justify-center items-center">
        <TextField
          id="outlined-Nature"
          label="Ledger"
          variant="outlined"
          name="ledger"
          value={formdata.ledger}
          onChange={handleChange}
          sx={{ width: 400, marginBottom: 3 }}
        />
        <TextField
          id="outlined-Rate"
          label="Station"
          variant="outlined"
          name="station"
          onChange={handleChange}
          value={formdata.station}
          sx={{ width: 400, marginBottom: 3 }}
        />
        <TextField
          id="outlined-Rate"
          label="Group"
          variant="outlined"
          sx={{ width: 400 }}
          name="group"
          value={formdata.group}
          onChange={handleChange}
        />
        <Button
          variant="outlined"
          size="large"
          sx={{ marginLeft: 2, marginTop: 2, width: 150 }}
          onClick={handleClick}
        >
          Save
        </Button>
      </div>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
        <Alert variant="filled" severity="success">
          Saved Sucessfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={AnotherOpen}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <Alert variant="filled" severity="warning">
          Already Saved in Database
        </Alert>
      </Snackbar>
      <Snackbar open={CheckData} onClose={handleClose} autoHideDuration={2000}>
        <Alert variant="filled" severity="error">
          Please enter your data
        </Alert>
      </Snackbar>
    </>
  );
}
