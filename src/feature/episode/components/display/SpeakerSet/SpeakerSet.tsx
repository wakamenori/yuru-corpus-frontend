import styled from 'styled-components'

import { Morpheme } from '../../../../../types/morpheme/morpheme'

export type Props = {
  morphemes: Morpheme[]
  speakerColor: string
}

const Container = styled.div`
  display: flex;
  margin: 8px;

  .right {
    flex: 1;
  }
`

const SpeakerColor = styled.div<{ color: string }>`
  width: 0.5rem;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  margin-right: 0.5rem;
`

const Utterance = styled.p`
  margin: 0.2rem;
  color: #374151;
  line-height: 1.4;
`

export const SpeakerSet = ({ speakerColor, morphemes }: Props) => {
  return (
    <Container>
      <SpeakerColor color={speakerColor} />
      <div className={'right'}>
        {morphemes.map((morpheme) => (
          <Utterance key={morpheme.timestamp}>{morpheme.token}</Utterance>
        ))}
      </div>
    </Container>
  )
}
