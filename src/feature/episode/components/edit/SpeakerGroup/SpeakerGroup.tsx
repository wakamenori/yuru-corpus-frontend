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
const SignleGroupName = styled.p<{ backgroundColor: string; textColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  display: inline-block;
  padding: 0.2rem 0.5rem;
  foontweight: bold;
  border-radius: 4px;
`

const DoubleGroupName = styled.p<{
  backgroundColor0: string
  backgroundColor1: string
  textColor: string
}>`
  /* background-color: ${(props) => props.backgroundColor0}; */
  background: linear-gradient(
    120deg,
    ${(props) => props.backgroundColor0} 0%,
    ${(props) => props.backgroundColor0} 50%,
    ${(props) => props.backgroundColor1} 50%,
    ${(props) => props.backgroundColor1} 100%
  );
  color: ${(props) => props.textColor};
  display: inline-block;
  padding: 0.2rem 0.5rem;
  foontweight: bold;
  border-radius: 4px;
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
      {!groupBackgroundColor1 ? (
      <SignleGroupName backgroundColor={groupBackgroundColor} textColor={groupTextColor}>
        {groupName}
      </SignleGroupName>
        ): (
      <DoubleGroupName backgroundColor0={groupBackgroundColor} backgroundColor1={groupBackgroundColor1} textColor={groupTextColor}>
        {groupName}
      </DoubleGroupName>
        )}
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
