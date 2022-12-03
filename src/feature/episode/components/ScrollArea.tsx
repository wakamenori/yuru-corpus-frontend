import styled from 'styled-components'

import { useWindowDimensions } from '../../../hooks/use-window-dimensions'
import { Morpheme } from '../../../types/morpheme/morpheme'
import { SpeakerInfo } from '../types/speaker'
import { DisplayMode } from './display/DisplayMode'
import { EditMode } from './edit/EditMode'

type Props = {
  isEdit: boolean
  reloadMorphemes: () => void
  speakersInfo: SpeakerInfo
  episodeId: number
  morphemesBySpeaker: { speaker: string; morphemes: Morpheme[] }[]
  utteranceEditors: JSX.Element[]
  openSnackbar: (message: string, severity: 'success' | 'error') => void
}

export const ScrollArea = ({
  isEdit,
  reloadMorphemes,
  speakersInfo,
  episodeId,
  morphemesBySpeaker,
  utteranceEditors,
  openSnackbar,
}: Props) => {
  const { width } = useWindowDimensions()
  const headerHeight = width > 600 ? 64 : 56
  const panelHeight = 84
  const topPosition = Math.floor((width * 9) / 16 + headerHeight + panelHeight)
  const Container = styled.div`
    z-index: 1;
    padding: 0 0.5rem 5rem;
    position: relative;
    @media (min-width: 900px) {
      top: 80px;
      margin-left: 600px;
    }
    top: ${topPosition}px;
  `
  return (
    <Container>
      <EditMode
        openSnackbar={openSnackbar}
        utteranceEditors={utteranceEditors}
        reloadMorphemes={reloadMorphemes}
        episodeId={episodeId}
        display={isEdit}
      />
      <DisplayMode
        morphemesBySpeaker={morphemesBySpeaker}
        speakersInfo={speakersInfo}
        display={!isEdit}
      />
    </Container>
  )
}
