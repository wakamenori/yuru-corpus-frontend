import styled from 'styled-components'

import { Speaker } from '../../../../../utils/speakers'
import { SpeakerChip } from '../../SpeakerChip/SpeakerChip'

export type Props = {
  groupName: string
  groupBackgroundColor: string
  groupBackgroundColor1?: string
  groupTextColor: string
  speakers: Speaker
  onSelect: (name: string) => void
}

const Container = styled.div`
  .chips {
    margin-left: 0.5rem;
    display: flex;
    flex-wrap: wrap;
  }
`
const GroupName = styled.p<{
  backgroundColor0: string
  backgroundColor1?: string
  textColor: string
}>`
  margin: 1.2rem 0 0.5rem;
  ${(props) =>
    props.backgroundColor1
      ? `background: linear-gradient(120deg, ${props.backgroundColor0} 0%, ${props.backgroundColor0} 50%, ${props.backgroundColor1} 50%, ${props.backgroundColor1} 100%);`
      : `background-color: ${props.backgroundColor0};`}
  color: ${(props) => props.textColor};
  display: inline-block;
  padding: 0.1rem 0.5rem;
  foontweight: bold;
  border-radius: 4px;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

export const SpeakerGroup = ({
  groupName,
  speakers,
  onSelect,
  groupTextColor,
  groupBackgroundColor,
  groupBackgroundColor1,
}: Props) => {
  return (
    <Container>
        <GroupName
          backgroundColor0={groupBackgroundColor}
          backgroundColor1={groupBackgroundColor1}
          textColor={groupTextColor}
        >
          {groupName}
        </GroupName>
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
