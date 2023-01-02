import { Save } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { isAxiosError } from 'axios'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { NotificationContext } from '../../../../../../context/notification'
import { postMorphemeApi } from '../../../../utils/api'
import { SpeakerChip } from '../../../SpeakerChip'
import { SpeakerDialog } from '../SpeakerDialog'
import { TimestampInput } from '../TimestampInput'
import { TokenInput } from '../TokenInput'

export type Props = {
  episodeId: number
  onReload: () => void
}

const Container = styled.div`
  padding: 0.4rem 1rem;

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

const getTimestamp = (date: Date) => {
  const pad2Digit = (n: number) => String(n).padStart(2, '0')
  const hours = pad2Digit(date.getHours())
  const minutes = pad2Digit(date.getMinutes())
  const seconds = pad2Digit(date.getSeconds())
  return `${hours}:${minutes}:${seconds}`
}

const CustomIconButton = styled(IconButton)`
  width: 20px;
  height: 20px;
  margin-left: 16px;
  padding: 0;
`
export const AddNew = ({ episodeId, onReload }: Props) => {
  type FormValues = {
    timestamp: Date
    token: string
  }
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { isDirty, dirtyFields, errors },
  } = useForm<FormValues>({
    defaultValues: { timestamp: new Date('2020-01-01T00:00:00+0900'), token: '' },
  })
  const { notify } = useContext(NotificationContext)
  const onSubmit = async (data: FormValues) => {
    const timestamp = getTimestamp(data.timestamp)
    try {
      if (speaker === '話者') {
        toggleSpeakerDialog()
        return
      }
      await postMorphemeApi(episodeId, {
        timestamp: timestamp,
        token: data.token,
        speaker: speaker,
      })
      reset()
      setSpeaker('話者')
      onReload()
      notify('作成しました', 'success')
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 403) {
        notify(`${getTimestamp(data.timestamp)}はすでに存在します 先に削除してください`, 'error')
      } else {
        notify('更新に失敗しました', 'error')
        console.log(e)
      }
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
              control={control}
              setValue={setValue}
              isEdit={true}
              isValid={errors.timestamp === undefined}
              options={{ required: true }}
              onClick={() => {}}
              inactiveColor='#FFF'
              defaultTimestamp='00:00:00'
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
