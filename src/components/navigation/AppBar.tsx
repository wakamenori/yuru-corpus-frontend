import { Menu } from '@mui/icons-material'
import { Box, CssBaseline, IconButton, AppBar as MuiAppBar, Toolbar } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { KeyboardEvent, MouseEvent, useState } from 'react'

import { Drawer } from './Drawer'
import { Logo } from './Logo'
import {Search} from './Search'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D5F8B',
    },
  },
})
export const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setIsOpen((prev) => !prev)
  }
  const closeDrawer = () => {
    setIsOpen(false)
  }
  const router = useRouter()
  const isEpisodeDetail = router.pathname === '/episode/[episodeId]'
  if (isEpisodeDetail) {
    return <></>
  }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <MuiAppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CssBaseline />
          <Toolbar>
            <IconButton
              onClick={toggleDrawer}
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Search />
          </Toolbar>
        </MuiAppBar>
        <Drawer
          open={isOpen}
          toggleDrawer={toggleDrawer}
          closeHandler={closeDrawer}
          appBarRowNumber={isEpisodeDetail ? 1 : 1}
        />
      </Box>
    </ThemeProvider>
  )
}
