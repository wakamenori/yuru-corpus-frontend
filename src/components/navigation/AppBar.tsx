import { KeyboardEvent, MouseEvent, useState } from 'react'
import { AppBar as MuiAppBar, Box, CssBaseline, IconButton, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material'
import { Logo } from "./Logo";
import { Drawer } from "./Drawer";
import { useRouter } from "next/router";

export const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(prev => !prev);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  }
  const router = useRouter();
  const isEpisodeDetail = router.pathname === '/episode/[episodeId]';
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MuiAppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Logo />
          {/*<Search/>*/}
        </Toolbar>
      </MuiAppBar>
      <Drawer
        open={isOpen}
        toggleDrawer={toggleDrawer}
        closeHandler={closeDrawer}
        appBarRowNumber={isEpisodeDetail ? 1 : 1}
      />
    </Box>
  );
}
