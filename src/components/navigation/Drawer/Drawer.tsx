import { VideoLibrary } from '@mui/icons-material'
import { Toolbar } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import { KeyboardEvent, MouseEvent } from 'react'

import { useRouter } from '../../../hooks/use-router'
import { DrawerItem } from '../DrawerItem'


export type Props = {
  appBarRowNumber?: number
  open: boolean
  toggleDrawer: (event: KeyboardEvent | MouseEvent) => void
  closeHandler: () => void
}
const drawerWidth = 240

export const Drawer = ({ open, toggleDrawer, closeHandler, appBarRowNumber }: Props) => {
  const router = useRouter()
  const selectItem = (link: string) => {
    closeHandler()
    router.push(link)
  }

  return (
    <div>
      <MuiDrawer
        anchor='left'
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {[...Array(appBarRowNumber || 1)].map((_, index) => (
          <Toolbar key={index} />
        ))}
        <DrawerItem
          icon={<VideoLibrary />}
          text={'全動画一覧'}
          onClick={selectItem.bind(null, '/episode')}
        />
      </MuiDrawer>
    </div>
  )
}