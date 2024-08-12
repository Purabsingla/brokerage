import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function ClippedDrawer({ handleClickOpen }) {
  const navigate = useNavigate();
  const handleclick = (text) => {
    text === 'Home' ? navigate('/') : navigate('/' + text);
  };
  const item1 = ['Home', 'Information', 'Sauda'];
  const item2 = ['LedgerTable', 'NatureTable', 'ComodityTable', 'Saudatable'];
  const item3 = ['Bill', 'TotalDalali', 'TotalDalali_V2'];
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {item1.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton key={index} onClick={() => handleclick(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {item2.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton key={index} onClick={() => handleclick(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {item3.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                key={index}
                onClick={() => {
                  if (text === 'Bill') {
                    handleClickOpen();
                    handleclick(text);
                  } else if (text === 'TotalDalali_V2') {
                    handleClickOpen();
                    handleclick(text);
                  } else handleclick(text);
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
