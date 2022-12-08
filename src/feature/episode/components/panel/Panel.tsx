import styled from 'styled-components'

import { HideOnScroll } from '../../../../components/ui/HideOnScroll'
import { useWindowDimensions } from '../../../../hooks/use-window-dimensions'
import { SpeakerInfo } from '../../types/speaker'
import { SpeakerChip } from '../SpeakerChip'
import { Progress } from './Progress'
import { Switch } from './Switch'

type Props = {
  isEdit: boolean
  toggleIsEdit: () => void
  speakersInfo: SpeakerInfo
}

const Container = styled.div`
  background-color: #fff;
  padding: 0.5rem;
`

const Flex = styled.div`
  display: -webkit-flex;
  display: flex;
  align-items: center;
`

const SpeakerChipsContainer = styled.div`
  display: -webkit-flex;
  display: flex;
  margin-right: 1rem;
`

export const Panel = ({ speakersInfo, isEdit, toggleIsEdit }: Props) => {
  const { width } = useWindowDimensions()
  return (
    <HideOnScroll threshold={50} enabled={width < 900}>
      <Container>
        <Progress speakersInfo={speakersInfo} />
        <Flex>
          <SpeakerChipsContainer>
            {Object.entries(speakersInfo).map(([speaker, info]) => {
              if (speaker !== '') {
                return (
                  <SpeakerChip
                    key={speaker}
                    backgroundColor={info.backgroundColor}
                    labelColor={info.color}
                    label={speaker}
                  />
                )
              }
            })}
          </SpeakerChipsContainer>
          <Switch checked={isEdit} toggle={toggleIsEdit} label='編集' />
        </Flex>
      </Container>
    </HideOnScroll>
  )
}
