import styled from 'styled-components'

import { Morpheme } from '../../../types/morpheme/morpheme'
import { SpeakerInfo } from '../types/speaker'
import { DisplayMode } from './display/DisplayMode'
import { EditMode } from './edit/EditMode'

type Props = {
  topPosition: number
  isEdit: boolean
  reloadMorphemes: () => void
  speakersInfo: SpeakerInfo
  episodeId: number
  morphemes: Morpheme[]
  morphemesBySpeaker: { speaker: string; morphemes: Morpheme[] }[]
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
  morphemes,
  reloadMorphemes,
  topPosition,
  speakersInfo,
  episodeId,
  morphemesBySpeaker,
}: Props) => {
  return (
    <Container top={Math.floor(topPosition)}>
      <EditMode
        morphemes={morphemes}
        reloadMorphemes={reloadMorphemes}
        speakersInfo={speakersInfo}
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
