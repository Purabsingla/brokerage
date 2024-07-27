import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Box from '@mui/material/Box';
export default function Nature() {
  const [Value, setValue] = useState('');
  const [formData, setFormData] = useState({
    nature: '',
    rate: 0,
    calculatedby: '',
  });

  const handleChangeselect = (event) => {
    setValue(event.target.value);
    setFormData({ ...formData, calculatedby: event.target.value });
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  function handleClick() {
    fetch('http://localhost:3001/nature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => alert('Data Saved Sucessfully'))
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <>
      <h1 className="text-5xl font-semibold font-PlaywriteITModerna pt-4">
        Nature
      </h1>
      <div className="p-4 flex flex-col justify-center items-center">
        <TextField
          id="outlined-Nature"
          label="Nature"
          variant="outlined"
          name="nature"
          sx={{ width: 400, marginBottom: 3 }}
          onChange={handleChange}
        />
        <TextField
          id="outlined-Rate"
          label="Rate"
          variant="outlined"
          type="number"
          name="rate"
          sx={{ width: 400, marginBottom: 3 }}
          onChange={handleChange}
        />
        <Box sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Calculated By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Value}
              label="Calculated By"
              onChange={handleChangeselect}
            >
              <MenuItem value={'Quantity'}>Quantity</MenuItem>
              <MenuItem value={'Rate'}>Rate</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
