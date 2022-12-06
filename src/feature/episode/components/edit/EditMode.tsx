import { useRef, useState } from 'react'
import { ViewportList } from 'react-viewport-list'
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
  utteranceEditors: JSX.Element[]
  openSnackbar: (message: string, severity: 'success' | 'error') => void
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
  utteranceEditors,
  openSnackbar,
  morphemes,
  speakersInfo,
}: Props) => {
  const [isAddNew, setIsAddNew] = useState(false)
  const toggleAddNew = () => setIsAddNew((prev) => !prev)
  const showItems = (morphemes: Morpheme[]) => {
    var utteranceEditors = []
    for (var i = 0; i < records; i++) {
      if (i >= morphemes.length) {
        return utteranceEditors
      }
      try {
        utteranceEditors.push(
          <UtteranceEditor
            episodeId={1}
            onReload={reloadMorphemes}
            key={morphemes[i].timestamp}
            token={morphemes[i].token}
            speakerName={morphemes[i].speaker}
            speakerBackgroundColor={speakersInfo[morphemes[i].speaker]?.backgroundColor || '#FFF'}
            speakerNameColor={speakersInfo[morphemes[i].speaker]?.color || '#000'}
            timestamp={morphemes[i].timestamp}
            showSnackbar={openSnackbar}
            isOdd={i % 2 === 0}
          />,
        )
      } catch (e) {
        console.log(e)
        console.log(i, morphemes[i])
      }
    }
    return utteranceEditors
  }

  const itemsPerPage = 20
  const [hasMore, setHasMore] = useState(true)
  const [records, setRecords] = useState(itemsPerPage)
  const loadMore = () => {
    if (records > morphemes.length) {
      setHasMore(false)
    } else {
      setTimeout(() => {
        setRecords(records + itemsPerPage)
      }, 20)
    }
  }

  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <Container display={display ? 1 : 0}>
        {isAddNew ? (
          <AddNew onReload={reloadMorphemes} episodeId={episodeId} showSnackbar={openSnackbar} />
        ) : (
          <div className='scroll-container' ref={ref}>
            <ViewportList viewportRef={ref} items={morphemes} overscan={10}>
              {(morpheme: Morpheme, i: number) => (
                <UtteranceEditor
                  episodeId={1}
                  onReload={reloadMorphemes}
                  key={morpheme.timestamp}
                  token={morpheme.token}
                  speakerName={morpheme.speaker}
                  speakerBackgroundColor={speakersInfo[morpheme.speaker]?.backgroundColor || '#FFF'}
                  speakerNameColor={speakersInfo[morpheme.speaker]?.color || '#000'}
                  timestamp={morpheme.timestamp}
                  showSnackbar={openSnackbar}
                  isOdd={i % 2 === 0}
                />
              )}
            </ViewportList>
          </div>
        )}
        <AddNewButton onReload={reloadMorphemes} isAddNew={isAddNew} toggleAddNew={toggleAddNew} />
      </Container>
    </>
  )
}
