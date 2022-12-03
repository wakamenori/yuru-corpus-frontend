import styled from 'styled-components';



import { Morpheme } from '../../../types/morpheme/morpheme';
import { SpeakerInfo } from '../types/speaker';
import { DisplayMode } from './display/DisplayMode';
import { EditMode } from './edit/EditMode';


type Props = {
  topPosition: number
  isEdit: boolean
  reloadMorphemes: () => void
  speakersInfo: SpeakerInfo
  episodeId: number
  morphemesBySpeaker: { speaker: string; morphemes: Morpheme[] }[]
  utteranceEditors: JSX.Element[]
  openSnackbar: (message: string, severity: 'success' | 'error') => void
}

const Container = styled.div<{ top: number }>`
  z-index: 1;
  padding: 0 0.5rem 5rem;
  position: relative;
  top: ${(props) => props.top || 0}px;
  @media (min-width: 900px) {
    top: 80px;
    margin-left: 600px;
  }
`

export const ScrollArea = ({
  isEdit,
  reloadMorphemes,
  topPosition,
  speakersInfo,
  episodeId,
  morphemesBySpeaker,
  utteranceEditors,
  openSnackbar,
}: Props) => {
  return (
    <Container top={Math.floor(topPosition)}>
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