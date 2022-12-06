import {  useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'

import { Morpheme } from '../../../../types/morpheme/morpheme'
import { SpeakerInfo } from '../../types/speaker'
import { AddNew } from './AddNew'
import { AddNewButton } from './AddNewButton'
import { UtteranceEditor } from './UtteranceEditor'

type Props = {
  reloadMorphemes: () => void
  episodeId: number
  display: boolean
  morphemes: Morpheme[]
  speakersInfo: SpeakerInfo
}

const Container = styled.div<{ display: number }>`
  display: ${(props) => (props.display ? 'block' : 'none')};
`

export const EditMode = ({
  display,
  reloadMorphemes,
  episodeId,
  morphemes,
  speakersInfo,
}: Props) => {
  const [isAddNew, setIsAddNew] = useState(false)
  const toggleAddNew = () => {
    setIsAddNew((prev) => !prev)
  }
  return (
    <>
      <Container display={display ? 1 : 0}>
        {isAddNew ? (
          <AddNew onReload={reloadMorphemes} episodeId={episodeId}  />
        ) : (
          morphemes.map((morpheme, index) => {
            return (
              <UtteranceEditor
                episodeId={episodeId}
                onReload={reloadMorphemes}
                key={index}
                token={morpheme.token}
                speakerName={morpheme.speaker}
                speakerBackgroundColor={speakersInfo[morpheme.speaker]?.backgroundColor || '#FFF'}
                speakerNameColor={speakersInfo[morpheme.speaker]?.color || '#000'}
                timestamp={morpheme.timestamp}
                isOdd={index % 2 === 0}
              />
            )
          })
        )}
        <AddNewButton isAddNew={isAddNew} onClick={toggleAddNew} />
      </Container>
    </>
  )
}
