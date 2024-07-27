import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export default function Comodity() {
  const [formData, setFormData] = useState({
    comodity: '',
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    setFormData({ comodity: '' });
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleApi() {
    fetch('http://localhost:3001/comodity', {
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
      <h1 className="text-5xl font-semibold font-PlaywriteITModerna pt-4">
        Comodity
      </h1>
      <div className="pt-4 mb-10">
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
          onClick={handleApi}
        >
          Save
        </Button>
      </div>
      <Snackbar
        // anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        key={'bottom' + 'left'}
      >
        <Alert severity="success">Updated Sucessfully</Alert>
      </Snackbar>
    </>
  );
}
