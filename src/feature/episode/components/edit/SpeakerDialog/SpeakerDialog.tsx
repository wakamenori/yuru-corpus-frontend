import { Dialog } from '@mui/material'
import styled from 'styled-components'

import { channelThemes } from '../../../../../styles/themes'
import { Speaker, allSpeakers } from '../../../../../utils/speakers'
import { SpeakerGroup } from '../SpeakerGroup/SpeakerGroup'

export type Props = {
  open: boolean
  onClose: () => void
  onSelect: (name: string) => void
}
type Group = {
  groupName: string
  groupTextColor: string
  groupBackgroundColor: string
  groupBackgroundColor1?: string
  speakers: Speaker
}

const getTheme = (channel: string): Group => {
  return {
    groupTextColor: channelThemes[channel].color,
    groupBackgroundColor: channelThemes[channel].backgroundColor,
    groupBackgroundColor1: channelThemes[channel].backgroundColor1,
    groupName: channel,
    speakers: allSpeakers[channel],
  }
}

const Container = styled.div`
  padding: 16px;
`

export const SpeakerDialog = ({ open, onClose, onSelect }: Props) => {
  const handleClose = () => {
    onClose()
  }

  const handleListItemClick = (value: string) => {
    onClose()
    onSelect(value)
  }
  const groups: Group[] = [
    {
      ...getTheme('ゆる言語学ラジオ'),
    },
    {
      ...getTheme('監修者'),
    },
    {
      ...getTheme('ゲスト'),
    },
    {
      ...getTheme('ゆる音楽学/民俗学ラジオ'),
    },
    {
      ...getTheme('ゆる哲学/生態学ラジオ'),
    },
    {
      ...getTheme('ゆる天文学/書道学ラジオ'),
    },
  ]

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <Container>
          {groups.map((group) => (
            <SpeakerGroup {...group} onSelect={handleListItemClick} key={group.groupName} />
          ))}
        </Container>
      </Dialog>
    </>
  )
}
