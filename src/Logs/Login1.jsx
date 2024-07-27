import img from '../assests/LoginImage_1.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Login = ({ SetLog }) => {
  const [Log, setLog] = useState({
    user: '',
    password: '',
  });
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openLogin, setOpenLogin] = useState(false);

  const handleClickLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLog = () => {
    setOpenLogin(false);
    SetLog(true);
  };
  const handleChange = (event) => {
    setLog({ ...Log, [event.target.name]: event.target.value });
  };
  const handleclick = () => {
    console.log(Log);
    if (Log.user === 'sushil26' && Log.password === '125055') {
      handleClickLogin();
    } else {
      handleClick();
      setLog({ user: '', password: '' });
    }
  };
  return (
    <>
      <div className="flex flex-row justify-center mx-auto">
        <div className="w-4/5 h-screen flex justify-center items-center flex-col">
          <h1 className="font-PlaywriteITModerna font-normal text-4xl mb-[30px]">
            Welcome
          </h1>
          <p className="font-PlaywriteITModerna font-bold text-lg mb-[20px]">
            Enter The Details To Use This Application
          </p>
          <TextField
            id="filled-User"
            label="UserName"
            variant="filled"
            name="user"
            onChange={handleChange}
            value={Log.user}
            sx={{
              width: 350,
            }}
          />
          <div className="py-5">
            <TextField
              id="filled-Password"
              type="password"
              label="Password"
              variant="filled"
              name="password"
              value={Log.password}
              onChange={handleChange}
              sx={{
                width: 350,
              }}
            />
          </div>
          <Button variant="contained" onClick={handleclick}>
            Login
          </Button>
        </div>
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="w-screen h-screen bg-cover bg-center bg-no-repeat"
        ></div>
      </div>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        key={'top' + 'left'}
      >
        <Alert severity="error">Invalid UserName and password</Alert>
      </Snackbar>
      <Snackbar
        open={openLogin}
        onClose={handleCloseLog}
        autoHideDuration={3000}
        key={'top' + 'left'}
      >
        <Alert severity="success">Login Sucessfull redirect in 3 second</Alert>
      </Snackbar>
    </>
  );
};
export default Login;
