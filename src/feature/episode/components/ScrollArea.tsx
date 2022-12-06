import styled from 'styled-components'

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
  morphemes: Morpheme[]
}

const Container = styled.div`
  z-index: 1;

  padding-bottom: 100px;
  position: relative;
  @media (min-width: 900px) {
    margin-left: 600px;
  }
`

const EmptyBox = styled.div`
  @media (min-width: 900px) {
    margin-bottom: 1rem;
  }

  .player {
    @media (max-width: 900px) {
      padding-bottom: 56.25%;
      overflow: hidden;
      width: 100%;
      aspect-ratio: 16/9;
    }
  }

  .header {
    height: 60px;
    @media (max-width: 600px) {
      height: 56px;
    }
  }

  .panel {
    @media (max-width: 900px) {
      height: 84px;
    }
  }
`

export const ScrollArea = ({
  isEdit,
  reloadMorphemes,
  speakersInfo,
  episodeId,
  morphemesBySpeaker,
  morphemes,
}: Props) => {
  return (
    <Container>
      <EmptyBox>
        <div className='header' />
        <div className='player' />
        <div className='panel' />
      </EmptyBox>
      <EditMode
        reloadMorphemes={reloadMorphemes}
        episodeId={episodeId}
        display={isEdit}
        morphemes={morphemes}
        speakersInfo={speakersInfo}
      />
      <DisplayMode
        morphemesBySpeaker={morphemesBySpeaker}
        speakersInfo={speakersInfo}
        display={!isEdit}
      />
    </Container>
  )
}
