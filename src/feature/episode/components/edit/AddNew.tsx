import { Save } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { postMorphemeApi } from '../../utils/api'
import { SpeakerChip } from '../SpeakerChip'
import { SpeakerDialog } from './SpeakerDialog'
import { TimestampInput } from './TimestampInput'
import { TokenInput } from './TokenInput'

type Props = {
  episodeId: number
  onReload: () => void
  showSnackbar: (message: string, severity: 'success' | 'error') => void
}

const Container = styled.div`
  margin-top: 3rem;

  .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .upper {
    display: flex;
    margin-bottom: 0.5rem;
    justify-content: space-between;
  }

  .upper-left {
    display: flex;
    align-items: center;
  }
`

const CustomIconButton = styled(IconButton)`
  width: 20px;
  height: 20px;
  margin-left: 16px;
  padding: 0;
`
export const AddNew = ({ showSnackbar, episodeId, onReload }: Props) => {
  type FormValues = {
    timestamp: string
    token: string
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields, errors },
  } = useForm<FormValues>({ defaultValues: { timestamp: '', token: '' } })
  const onSubmit = async (data: FormValues) => {
    try {
      if (speaker === '話者') {
        toggleSpeakerDialog()
        return
      }
      await postMorphemeApi(episodeId, {
        timestamp: data.timestamp,
        token: data.token,
        speaker: speaker,
      })
      reset()
      setSpeaker('話者')
      onReload()
      showSnackbar('発話を追加しました', 'success')
    } catch (e) {
      console.log(e)
      showSnackbar('発話の追加に失敗しました', 'error')
    }
  }
  const [speakerDialogOpen, setSpeakerDialogOpen] = useState(false)
  const toggleSpeakerDialog = () => setSpeakerDialogOpen((prev) => !prev)
  const [speaker, setSpeaker] = useState<string>('話者')
  const onSelectSpeaker = (speaker: string) => {
    setSpeaker(speaker)
  }
  return (
    <Container>
      <SpeakerDialog
        open={speakerDialogOpen}
        onClose={toggleSpeakerDialog}
        onSelect={onSelectSpeaker}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='upper'>
          <div className='upper-left'>
            <SpeakerChip
              backgroundColor={speaker === '話者' ? '#6B7280' : '#1875D1'}
              label={speaker}
              labelColor={speaker === '話者' ? '#FFF' : 'white'}
              onClick={toggleSpeakerDialog}
            />
            <TimestampInput
              isEdit={true}
              register={register}
              isDirty={dirtyFields.timestamp !== undefined}
              isValid={errors.timestamp === undefined}
              options={{ required: true }}
              onClick={() => {}}
              inactiveColor='#FFF'
            />
          </div>
          <div className={'buttons'}>
            <CustomIconButton size='small' type='submit'>
              <Save type='submit' color={isDirty || speaker !== '話者' ? 'primary' : undefined} />
            </CustomIconButton>
          </div>
        </div>
        <TokenInput
          isEdit={true}
          register={register}
          isDirty={dirtyFields.token !== undefined}
          isValid={errors.token === undefined}
          options={{ required: true }}
          onClick={() => {}}
          inactiveColor='#FFF'
        />
      </form>
    </Container>
  )
}
