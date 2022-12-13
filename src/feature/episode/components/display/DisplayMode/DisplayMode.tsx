import styled from 'styled-components'

import { Morpheme } from '../../../../../types/morpheme/morpheme'
import { SpeakerInfo } from '../../../types/speaker'
import { SpeakerSet } from '../SpeakerSet'

const Container = styled.div<{ display: number }>`
  display: ${(props) => (props.display ? 'block' : 'none')};
`

export type Props = {
  speakersInfo: SpeakerInfo
  morphemesBySpeaker: { speaker: string; morphemes: Morpheme[] }[]
  display: boolean
}

export const DisplayMode = ({ display, morphemesBySpeaker, speakersInfo }: Props) => {
  return (
    <Container display={display ? 1 : 0}>
      {morphemesBySpeaker.map((morphemeSet, index) => (
        <SpeakerSet
          key={index}
          morphemes={morphemeSet.morphemes}
          speakerColor={speakersInfo[morphemeSet.speaker].backgroundColor}
        />
      ))}
    </Container>
  )
}
