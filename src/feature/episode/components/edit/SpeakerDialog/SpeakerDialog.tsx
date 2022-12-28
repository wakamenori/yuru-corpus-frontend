import { Person } from '@mui/icons-material'
import {
  Avatar,
  Dialog,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import styled from 'styled-components'

import { SpeakerColorGenerator, guestSpeakers, hostSpeakers } from '../../../../../utils/speakers'

export type Props = {
  open: boolean
  onClose: () => void
  onSelect: (name: string) => void
}

const Container = styled.div`
  width: 200px;
`

export const SpeakerDialog = ({ open, onClose, onSelect }: Props) => {
  const handleClose = () => {
    onClose()
  }

  const handleListItemClick = (value: string) => {
    onClose()
    onSelect(value)
  }
  const colorGenerator = new SpeakerColorGenerator()
  const speakers = [...hostSpeakers, ...guestSpeakers]
  const speakerColorMap = speakers.map((name) => {
    const color = colorGenerator.getSpeakerColor(name)
    return {
      name: name,
      backGroundColor: color.backgroundColor,
      color: color.color,
    }
  })

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <Container>
          <List>
            {speakerColorMap.map((speakerColor) => (
              <ListItem
                onClick={() => handleListItemClick(speakerColor.name)}
                key={speakerColor.name}
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: speakerColor.backGroundColor, color: speakerColor.color }}
                    >
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={speakerColor.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Container>
      </Dialog>
    </>
  )
}
