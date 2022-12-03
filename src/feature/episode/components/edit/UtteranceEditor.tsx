import { DeleteOutlined, HighlightOff, Save } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';



import { deleteMorphemeApi, postMorphemeApi, putMorphemeApi } from '../../utils/api';
import { SpeakerChip } from '../SpeakerChip';
import { SpeakerDialog } from './SpeakerDialog';
import { TimestampInput } from './TimestampInput';
import { TokenInput } from './TokenInput';


type Props = {
  token: string
  episodeId: number
  speakerName: string
  speakerNameColor: string
  speakerBackgroundColor: string
  timestamp: string
  onReload: () => void
  showSnackbar: (message: string, severity: 'success' | 'error') => void
  isOdd: boolean
}

const oddColor = '#F3F4F6'
const Container = styled.div<{ isodd: number }>`
  margin-top: 8px;
  width: 100%;

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
  showSnackbar,
  isOdd,
}: Props) => {
  type FormValues = {
    timestamp: string
    token: string
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields, errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: useMemo(() => ({ timestamp, token }), [timestamp, token]),
  })

  useEffect(() => {
    reset({ timestamp, token })
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

  const onSubmit = async (data: FormValues) => {
    data.token = data.token.trim()
    if (speakerNameState === '') {
      showSnackbar('話者を選択してください', 'error')
      return
    }
    if (typeof dirtyFields.timestamp !== 'undefined') {
      try {
        await postMorphemeApi(episodeId, {
          ...data,
          speaker: speakerNameState,
        })
        await onDelete()
        showSnackbar('更新しました', 'success')
        onReload()
      } catch (e) {
        showSnackbar('更新に失敗しました', 'error')
      }
    } else if (typeof dirtyFields.token !== 'undefined' || isSpeakerNameChanged) {
      try {
        await putMorphemeApi(episodeId, { ...data, speaker: speakerNameState }) // TODO: apply speaker name
        showSnackbar('更新しました', 'success')
        onReload()
      } catch (e) {
        showSnackbar('更新に失敗しました', 'error')
        console.log(e)
      }
    }
    toggleEdit()
  }

  const onDelete = async () => {
    try {
      await deleteMorphemeApi(episodeId, timestamp)
      onReload()
      toggleEdit()
      showSnackbar('削除しました', 'success')
    } catch (e) {
      showSnackbar('削除に失敗しました', 'error')
      console.log(e)
    }
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
        showSnackbar('変更しました', 'success')
        onReload()
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <Container isodd={isOdd ? 1 : 0}>
      <SpeakerDialog open={isDialogOpen} onClose={toggleDialog} onSelect={selectSpeaker} />
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
              register={register}
              isEdit={isEdit}
              isValid={errors.timestamp === undefined}
              isDirty={!!dirtyFields.timestamp}
              options={{ required: true }}
              onClick={() => setIsEdit(true)}
              inactiveColor={isOdd ? oddColor : '#FFF'}
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
          onClick={() => setIsEdit(true)}
          inactiveColor={isOdd ? oddColor : '#FFF'}
        />
      </form>
    </Container>
  )
}