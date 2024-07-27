import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Ledger() {
  const [formdata, setformdata] = useState({
    ledger: '',
    station: '',
    group: '',
  });
  const handleChange = (event) => {
    setformdata({ ...formdata, [event.target.name]: event.target.value });
  };
  const handleClick = () => {
    fetch('http://localhost:3001/ledger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((data) => alert('Data Saved Sucessfully'))
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <>
      <h1 className="text-5xl font-semibold font-PlaywriteITModerna pt-4">
        Ledger
      </h1>
      <div className="p-4 flex flex-col justify-center items-center">
        <TextField
          id="outlined-Nature"
          label="Ledger"
          variant="outlined"
          name="ledger"
          onChange={handleChange}
          sx={{ width: 400, marginBottom: 3 }}
        />
        <TextField
          id="outlined-Rate"
          label="Station"
          variant="outlined"
          name="station"
          onChange={handleChange}
          sx={{ width: 400, marginBottom: 3 }}
        />
        <TextField
          id="outlined-Rate"
          label="Group"
          variant="outlined"
          sx={{ width: 400 }}
          name="group"
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
    </>
  );
}
