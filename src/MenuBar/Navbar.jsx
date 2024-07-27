import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
export function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        color: 'black',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{ fontWeight: 700 }}
        >
          BROKERAGE WORK
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
