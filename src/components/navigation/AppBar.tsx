import {KeyboardEvent, MouseEvent, useEffect, useState} from 'react'
import {AppBar as MuiAppBar, Box, CssBaseline, IconButton, Toolbar} from '@mui/material';
import {Menu} from '@mui/icons-material'
import {Logo} from "./Logo";
import {Drawer} from "./Drawer";
import {EpisodeDetailAppBar} from './EpisodeDetailAppBar'
import {useRouter} from "next/router";
import axios, {AxiosResponse} from 'axios'
import {Summary} from "../../types/episode/summary";

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
  const [episodeTitle, setEpisodeTitle] = useState<string>("");
  const isEpisodeDetail = router.pathname === '/episode/[episodeId]';
  useEffect(() => {
    if (isEpisodeDetail) {
      const url = `${process.env.NEXT_PUBLIC_API_ROOT}/summary/by_episode/${router.query.episodeId}/`
      axios.get(url, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      ).then((res: AxiosResponse<Summary>) => {
        setEpisodeTitle(res.data.title)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [router.query, isEpisodeDetail]);

  return (
    <Box sx={{display: "flex"}}>
      <CssBaseline/>
      <MuiAppBar
        position="fixed"
        sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
      >
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{mr: 2}}
          >
            <Menu/>
          </IconButton>
          <Logo/>
          {/*<Search/>*/}
        </Toolbar>
        {isEpisodeDetail && <EpisodeDetailAppBar title={episodeTitle}/>}
      </MuiAppBar>
      <Drawer
        open={isOpen}
        toggleDrawer={toggleDrawer}
        closeHandler={closeDrawer}
        appBarRowNumber={isEpisodeDetail ? 2 : 1}
      />
    </Box>
  );
}
