import { useState } from 'react'
import styled from 'styled-components'

import { AddNew } from './AddNew'
import { AddNewButton } from './AddNewButton'


type Props = {
  reloadMorphemes: () => void
  episodeId: number
  display: boolean
  utteranceEditors: JSX.Element[]
  openSnackbar: (message: string, severity: 'success' | 'error') => void
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
}: Props) => {
  const [isAddNew, setIsAddNew] = useState(false)
  const toggleAddNew = () => setIsAddNew((prev) => !prev)

  return (
    <>
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