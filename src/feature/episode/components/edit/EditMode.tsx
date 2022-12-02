import { useMemo, useState } from 'react'
import styled from 'styled-components'

import { Snackbar } from '../../../../components/ui/Snackbar'
import { Morpheme } from '../../../../types/morpheme/morpheme'
import { SpeakerInfo } from '../../types/speaker'
import { AddNew } from './AddNew'
import { AddNewButton } from './AddNewButton'
import { UtteranceEditor } from './UtteranceEditor'

type Props = {
  morphemes: Morpheme[]
  reloadMorphemes: () => void
  speakersInfo: SpeakerInfo
  episodeId: number
  display: boolean
}

const Container = styled.div<{ display: number }>`
  display: ${(props) => (props.display ? 'block' : 'none')};
`

export const EditMode = ({
  morphemes,
  display,
  reloadMorphemes,
  speakersInfo,
  episodeId,
}: Props) => {
  const [isAddNew, setIsAddNew] = useState(false)
  const toggleAddNew = () => setIsAddNew((prev) => !prev)
  const [isShowSnackbar, setIsShowSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

  const openSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setIsShowSnackbar(true)
  }
  const hideSnackbar = () => {
    setIsShowSnackbar(false)
  }
  const utteranceEditors = useMemo(() => {
    // TODO: これ、なんの意味もない
    return morphemes.map((morpheme, index) => {
      return (
        <UtteranceEditor
          episodeId={episodeId}
          onReload={reloadMorphemes}
          key={index}
          token={morpheme.token}
          speakerName={morpheme.speaker}
          speakerBackgroundColor={speakersInfo[morpheme.speaker].backgroundColor}
          speakerNameColor={speakersInfo[morpheme.speaker].color}
          timestamp={morpheme.timestamp}
          showSnackbar={openSnackbar}
          isOdd={index % 2 === 0}
        />
      )
    })
  }, [morphemes, speakersInfo, reloadMorphemes, episodeId])

  return (
    <>
      {isShowSnackbar && (
        <Snackbar message={snackbarMessage} severity={snackbarSeverity} onClose={hideSnackbar} />
      )}

      <Container display={display ? 1 : 0}>
        {isAddNew ? (
          <AddNew onReload={reloadMorphemes} episodeId={episodeId} showSnackbar={openSnackbar} />
        ) : (
          utteranceEditors
        )}
        <AddNewButton onReload={reloadMorphemes} isAddNew={isAddNew} toggleAddNew={toggleAddNew} />
      </Container>
    </>
  )
}
