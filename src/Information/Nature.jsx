import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export default function Nature() {
  const [Value, setValue] = useState('');
  const [formData, setFormData] = useState({
    nature: '',
    rate: 0,
    calculatedby: '',
  });
  const [Check, SetCheck] = useState({
    nature: '',
    rate: 0,
  });
  const [CheckData, setCheckData] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [Warning, setWarning] = useState(false);
  const handleClickNature = () => {
    setOpenLogin(true);
    setFormData({ nature: '', rate: 0, calculatedby: '' });
    setValue('');
  };
  const handleWarning = () => {
    setWarning(true);
  };
  const handleClose = () => {
    setWarning(false);
    setOpenLogin(false);
    setCheckData(false);
  };
  const handleChangeselect = (event) => {
    setValue(event.target.value);
    setFormData({ ...formData, calculatedby: event.target.value });
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  function handleClick() {
    if (formData.nature === '' || formData.rate === 0) {
      setCheckData(true);
      return;
    }
    Check.some(
      (check) => String(check.nature).trim() === String(formData.nature).trim()
    ) &&
    Check.some((check) => parseFloat(check.rate) === parseFloat(formData.rate))
      ? handleWarning()
      : fetch('http://localhost:3001/nature', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => handleClickNature())
          .catch((error) => {
            console.error('Error:', error);
          });
  }

  useEffect(() => {
    fetch('http://localhost:3001/nature')
      .then((response) => response.json())
      .then((data) => {
        SetCheck(data.Data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      <h1 className="text-5xl font-semibold font-PlaywriteITModerna pt-4 flex justify-center">
        Nature
      </h1>
      <div className="p-4 flex flex-col justify-center items-center">
        <TextField
          id="outlined-Nature"
          label="Nature"
          variant="outlined"
          name="nature"
          value={formData.nature}
          sx={{ width: 400, marginBottom: 3 }}
          onChange={handleChange}
        />
        <TextField
          id="outlined-Rate"
          label="Rate"
          variant="outlined"
          type="number"
          name="rate"
          value={formData.rate}
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
      <Snackbar open={openLogin} onClose={handleClose} autoHideDuration={3000}>
        <Alert variant="filled" severity="success">
          Data Saved Sucessfull
        </Alert>
      </Snackbar>
      <Snackbar open={Warning} onClose={handleClose} autoHideDuration={2000}>
        <Alert variant="filled" severity="warning">
          Data Already Exists
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
