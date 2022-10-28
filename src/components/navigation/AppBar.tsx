import {KeyboardEvent, MouseEvent, useState} from 'react'
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Logo} from "./Logo";
import {Drawer} from "./Drawer";
import CssBaseline from '@mui/material/CssBaseline';


export const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(prev => !prev);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  }

  return (
    <Box sx={{display: "flex"}}>
      <CssBaseline/>
      <MuiAppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>
          <Logo/>
          {/*<Search/>*/}
        </Toolbar>
      </MuiAppBar>
      <Drawer open={isOpen} toggleDrawer={toggleDrawer} closeHandler={closeDrawer}/>
    </Box>
  );
}
