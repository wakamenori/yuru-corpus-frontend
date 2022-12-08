import { DeleteOutlined, HighlightOff, Save } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { isAxiosError } from 'axios'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { Confirmation } from '../../../../components/dialog/Confirmation'
import { NotificationContext } from '../../../../context/notification'
import { deleteMorphemeApi, postMorphemeApi, putMorphemeApi } from '../../utils/api'
import { SpeakerChip } from '../SpeakerChip'
import { SpeakerDialog } from './SpeakerDialog'
import { TimestampInput } from './TimestampInput'
import { TokenInput } from './TokenInput'

type Props = {
  token: string
  episodeId: number
  speakerName: string
  speakerNameColor: string
  speakerBackgroundColor: string
  timestamp: string
  onReload: () => void
  isOdd: boolean
}
const getTimestamp = (date: Date) => {
  const pad2Digit = (n: number) => String(n).padStart(2, '0')
  const hours = pad2Digit(date.getHours())
  const minutes = pad2Digit(date.getMinutes())
  const seconds = pad2Digit(date.getSeconds())
  return `${hours}:${minutes}:${seconds}`
}

const getDate = (timestamp: string): Date => {
  const date = new Date(`2021-09-01T${timestamp}.000+0900`)
  // console.log(date)
  return date
}

const oddColor = '#F3F4F6'
const Container = styled.div<{ isodd: number }>`
  width: 100%;
  padding: 0.4rem 1rem;

  .upper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.1rem;
  }

  .upper-left {
    display: flex;
    align-items: center;
  }

  .buttons {
    margin-right: 0.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  ${(props) => props.isodd && `background-color: ${oddColor};`}
`

const CustomIconButton = styled(IconButton)`
  width: 20px;
  height: 20px;
  margin-left: 16px;
  padding: 0;
`

export const UtteranceEditor = ({
  episodeId,
  onReload,
  token,
  speakerName,
  speakerNameColor,
  timestamp,
  speakerBackgroundColor,
  isOdd,
}: Props) => {
  type FormValues = {
    timestamp: Date
    token: string
  }
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { dirtyFields, errors, isDirty },
    setFocus,
    setValue,
  } = useForm<FormValues>({
    defaultValues: useMemo(() => {
      return { timestamp: getDate(timestamp), token }
    }, [timestamp, token]),
  })
  useEffect(() => {
    // console.log("useEffect")
    reset({ timestamp: getDate(timestamp), token })
  }, [timestamp, token, reset])

  const [isEdit, setIsEdit] = useState(false)
  const toggleEdit = () => setIsEdit((prev) => !prev)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const toggleDialog = () => setIsDialogOpen((prev) => !prev)
  const [speakerNameState, setSpeakerNameState] = useState(speakerName)
  useEffect(() => {
    setSpeakerNameState(speakerName)
  }, [speakerName])
  const isSpeakerNameChanged = speakerNameState !== speakerName
  const { notify } = useContext(NotificationContext)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const toggleConfirmation = () => setIsConfirmationOpen((prev) => !prev)

  const onSubmit = async (data: FormValues) => {
    console.log({"submit": data})
    data.token = data.token.trim()
    setValue('token', data.token)
    if (speakerNameState === '') {
      toggleDialog()
      return
    }
    if (typeof dirtyFields.timestamp !== 'undefined') {
      // timestampを編集
      try {
        await postMorphemeApi(episodeId, {
          ...data,
          timestamp: getTimestamp(data.timestamp),
          speaker: speakerNameState,
        })
        await deleteMorphemeApi(episodeId, timestamp)
        notify('更新しました', 'success')
        onReload()
        toggleEdit()
      } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 403) {
          notify(`${getTimestamp(data.timestamp)}はすでに存在します 先に削除してください`, 'error')
        } else {
          notify('更新に失敗しました', 'error')
        }
      }
    } else if (typeof dirtyFields.token !== 'undefined' || isSpeakerNameChanged) {
      // timestampを編集していない
      try {
        await putMorphemeApi(episodeId, {
          ...data,
          timestamp: getTimestamp(data.timestamp),
          speaker: speakerNameState,
        })
        notify('更新しました', 'success')
        onReload()
        toggleEdit()
      } catch (e) {
        notify('更新に失敗しました', 'error')
        console.log(e)
      }
    }
  }

  const deleteMorpheme = async () => {
    toggleConfirmation()
    try {
      await deleteMorphemeApi(episodeId, timestamp)
      toggleEdit()
      notify('削除しました', 'warn')
      onReload()
    } catch (e) {
      notify('削除に失敗しました', 'error')
      console.log(e)
    }
  }
  const onDelete = async () => {
    toggleConfirmation()
  }
  const onCancel = () => {
    reset()
    setSpeakerNameState(speakerName)
    toggleEdit()
  }
  const selectSpeaker = async (name: string) => {
    if (name === speakerNameState) {
      return
    }
    if (isEdit) {
      setSpeakerNameState(name)
    } else {
      try {
        await putMorphemeApi(episodeId, {
          token: token,
          timestamp: timestamp,
          speaker: name,
        })
        notify('変更しました', 'success')
        onReload()
      } catch (e) {
        console.log(e)
      }
    }
  }
  const clickInput = (name: 'timestamp' | 'token') => {
    setIsEdit(true)
    setTimeout(() => {
      setFocus(name)
    }, 200)
  }

  return (
    <Container isodd={isOdd ? 1 : 0}>
      {isDialogOpen && (
        <SpeakerDialog open={isDialogOpen} onClose={toggleDialog} onSelect={selectSpeaker} />
      )}
      {isConfirmationOpen && (
        <Confirmation
          toggleDialog={toggleConfirmation}
          onConfirm={deleteMorpheme}
          title={timestamp}
          contentText={`「${token}」を削除しますか?`}
          confirmText='削除'
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='upper'>
          <div className='upper-left'>
            <SpeakerChip
              label={speakerNameState}
              backgroundColor={isSpeakerNameChanged ? '#1875D1' : speakerBackgroundColor}
              labelColor={isSpeakerNameChanged ? '#FFF' : speakerNameColor}
              onClick={toggleDialog}
            />
            <TimestampInput
              control={control}
              setValue={setValue}
              isEdit={isEdit}
              isValid={errors.timestamp === undefined}
              options={{ required: true }}
              onClick={clickInput.bind(null, 'timestamp')}
              inactiveColor={isOdd ? oddColor : '#FFF'}
              defaultTimestamp={timestamp}
            />
          </div>
          {isEdit && (
            <div className='buttons'>
              <CustomIconButton size='small' onClick={onCancel}>
                <HighlightOff />
              </CustomIconButton>
              <CustomIconButton size='small' onClick={onDelete}>
                <DeleteOutlined />
              </CustomIconButton>
              <CustomIconButton
                size='small'
                type='submit'
                color={isDirty || isSpeakerNameChanged ? 'primary' : undefined}
              >
                <Save />
              </CustomIconButton>
            </div>
          )}
        </div>
        <TokenInput
          isValid={errors.token === undefined}
          isEdit={isEdit}
          isDirty={!!dirtyFields.token}
          register={register}
          options={{ required: true }}
          onClick={clickInput.bind(null, 'token')}
          inactiveColor={isOdd ? oddColor : '#FFF'}
          defaultToken={token}
        />
      </form>
    </Container>
  )
}
