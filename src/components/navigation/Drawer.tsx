import {KeyboardEvent, MouseEvent} from 'react'
import {Toolbar} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {DrawerItem} from "./DrawerItem";
import {VideoLibrary} from '@mui/icons-material'
import {useRouter} from "next/router";

type Props = {
  open: boolean;
  toggleDrawer: (event: KeyboardEvent | MouseEvent) => void;
  closeHandler: () => void;
}
const drawerWidth = 240;

export const Drawer = ({open, toggleDrawer, closeHandler}: Props) => {
  const router = useRouter();
  const selectItem = (link: string) => {
    closeHandler()
    router.push(link)
  }

  return (
    <div>
      <MuiDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        }}
      >
        <Toolbar/>
        <DrawerItem
          icon={<VideoLibrary/>}
          text={"全動画一覧"}
          onClick={selectItem.bind(null, "/episode")}
        />
      </MuiDrawer>
    </div>
  );
}
