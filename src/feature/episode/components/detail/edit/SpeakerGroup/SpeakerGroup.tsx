import styled from 'styled-components'

import { Speaker } from '../../../../../../utils/speakers'
import { SpeakerChip } from '../../../SpeakerChip/SpeakerChip'
import { ChannelNameChip } from '../ChannelNameChip/ChannelNameChip'

export type Props = {
  groupName: string
  speakers: Speaker
  onSelect: (name: string) => void
}

const Container = styled.div`
  margin-bottom: 0.8rem;
  .chips {
    margin-left: 0.5rem;
    display: flex;
    flex-wrap: wrap;
  }
`

export const SpeakerGroup = ({
  groupName,
  speakers,
  onSelect,
}: Props) => {
  return (
    <Container>
      <ChannelNameChip name={groupName} isActive/>
      <div className='chips'>
        {Object.keys(speakers).map((name) => {
          return (
            <SpeakerChip
              key={name}
              label={speakers[name].fullName}
              onClick={() => onSelect(name)}
              labelColor='#1F2937'
              backgroundColor='#D1D5DB'
            />
          )
        })}
      </div>
    </Container>
  )
}
