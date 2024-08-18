import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export default function Comodity() {
  const [Check, SetCheck] = useState({
    comodity: '',
  });
  const [AnotherOpen, setAnotherOpen] = useState(false);
  const [checkValue, setCheckValue] = useState(false);
  const [formData, setFormData] = useState({
    comodity: '',
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleComodityANotherChange = () => {
    setAnotherOpen(true);
    setFormData({ comodity: '' });
  };
  useEffect(() => {
    fetch('http://localhost:3001/comodity')
      .then((response) => response.json())
      .then((data) => {
        SetCheck(data.Data);
      });
  }, []);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    setFormData({ comodity: '' });
  };

  const handleClose = () => {
    setAnotherOpen(false);
    setOpen(false);
    setCheckValue(false);
  };
  function handleApi() {
    if (formData.comodity === '') {
      setCheckValue(!checkValue);
      return;
    }
    Check.some((check) => check.comodity.trim() === formData.comodity.trim())
      ? handleComodityANotherChange()
      : fetch('http://localhost:3001/comodity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => handleClick())
          .catch((error) => {
            console.error('Error:', error);
          });
  }
  return (
    <>
      <h1 className="text-5xl font-semibold font-PlaywriteITModerna pt-4 flex justify-center">
        Comodity
      </h1>
      <div className="pt-4 mb-10 flex justify-center">
        <TextField
          id="outlined-basic"
          label="Comodity"
          variant="outlined"
          name="comodity"
          sx={{ width: 400 }}
          onChange={handleChange}
          value={formData.comodity}
        />
        <Button
          variant="outlined"
          size="large"
          sx={{ marginLeft: 2, marginTop: 1 }}
          onClick={() => {
            handleApi();
          }}
        >
          Save
        </Button>
      </div>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={4000}>
        <Alert severity="success">Insert Sucessfully</Alert>
      </Snackbar>
      <Snackbar
        open={AnotherOpen}
        onClose={handleClose}
        autoHideDuration={4000}
      >
        <Alert severity="warning">Already Saved</Alert>
      </Snackbar>
      <Snackbar open={checkValue} onClose={handleClose} autoHideDuration={4000}>
        <Alert severity="error">Please enter a value</Alert>
      </Snackbar>
    </>
  );
}
