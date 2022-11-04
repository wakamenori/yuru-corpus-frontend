import {Controller, useForm} from "react-hook-form";
import {
  Button,
  InputLabel,
  MenuItem,
  Box,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  CircularProgress
} from '@mui/material'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {useState, useEffect} from "react";
import {Cancel, Save, Delete, AddCircle} from "@mui/icons-material";
import {postMorphemeApi, deleteMorphemeApi, putMorphemeApi} from "../utils/api";
import dayjs, {Dayjs} from 'dayjs';
import axios from "axios";
import {speakers} from ".././../../utils/speakers";
import {Dialog} from "./Dialog";

type Props = {
  defaultTimestamp: string;
  defaultSpeaker: string;
  defaultText: string;
  toggleIsEdit: () => void;
  reloadMorphemes: (episodeId: number) => void;
  episodeId: number;
  showSnackbar: (message: string, severity: "success" | "error") => void;
}

const validationRules = {
  text: {required: true},
  speaker: {required: true}
}

export const Editor = (
  {
    defaultTimestamp,
    defaultSpeaker,
    defaultText,
    toggleIsEdit,
    reloadMorphemes,
    episodeId,
    showSnackbar
  }: Props) => {
  if (defaultSpeaker == "???") {
    defaultSpeaker = "";
  }
  const {handleSubmit, control, formState: {isValid, isSubmitting}} = useForm({
    mode: "onChange",
    defaultValues: {
      text: defaultText,
      speaker: defaultSpeaker,
    },
  });

  const [timestampValue, setTimestampValue] = useState<Dayjs | null>(dayjs(`2022-04-07 ${defaultTimestamp}`));
  const [speaker, setSpeaker] = useState<string>(defaultSpeaker);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChangeSpeaker = (event: SelectChangeEvent) => {
    setSpeaker(event.target.value);
  };
  const isAllFormValid = isValid && timestampValue?.isValid()

  const submitMorpheme = async (userInput: { speaker: string, text: string }) => {
    const data = {timestamp: timestampValue!.format("HH:mm:ss"), speaker: userInput.speaker, token: userInput.text}

    if (defaultTimestamp == "") {
      try {
        await postMorphemeApi(episodeId, data)
        toggleIsEdit();
      } catch (e) {
        if (axios.isAxiosError(e) && e.response && e.response.status === 403) {
          showSnackbar(`${data.timestamp} はすでに存在します`, "error");
        } else {
          showSnackbar("エラーが発生しました", "error");
        }
      }
    } else if (defaultTimestamp != data.timestamp) {
      try {
        await postMorphemeApi(episodeId, data)
        await deleteMorphemeApi(episodeId, defaultTimestamp)
        showSnackbar("更新しました", "success");
        toggleIsEdit();
      } catch (e) {
        if (axios.isAxiosError(e) && e.response && e.response.status === 403) {
          showSnackbar(`${data.timestamp} はすでに存在します`, "error");
        } else {
          showSnackbar("更新に失敗しました", "error");
        }
      }
    } else {
      try {
        await putMorphemeApi(episodeId, data)
        showSnackbar("更新しました", "success");
        toggleIsEdit();
      } catch (e) {
        showSnackbar("更新に失敗しました", "error");
      }
    }
    reloadMorphemes(episodeId)
  }
  const deleteMorpheme = async () => {
    setIsDeleting(true)
    if (timestampValue !== null) {
      if (timestampValue.isValid()) {
        try {
          await deleteMorphemeApi(+episodeId, timestampValue.format("HH:mm:ss"))
          reloadMorphemes(episodeId)
          showSnackbar("削除しました", "success");
          toggleIsEdit()
        } catch (e) {
          showSnackbar("削除に失敗しました", "error");
        }
      }
    }
    setIsDeleting(false)
  }

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const toggleDeleteDialog = () => {
    setOpenDeleteDialog(prev => !prev)
  }

  return (
    <>
      {openDeleteDialog && (<Dialog
        title="削除しますか？"
        content={`${timestampValue}`}
        cancelText="キャンセル"
        confirmText="削除"
        onConfirm={deleteMorpheme}
        onClose={toggleDeleteDialog}
      />)}
      <form onSubmit={handleSubmit(submitMorpheme)}>
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"row"} spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction={"column"} sx={{width: "50%"}}>
                <InputLabel htmlFor="input-timestamp">タイムスタンプ</InputLabel>
                <TimePicker
                  ampm={false}
                  openTo="hours"
                  views={['hours', 'minutes', 'seconds']}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  value={timestampValue}
                  onChange={(newValue) => {
                    setTimestampValue(newValue);
                  }}
                  renderInput={(params) => {
                    return <TextField
                      id={"input-timestamp"} {...params}
                      error={!timestampValue?.isValid()} value={timestampValue}/>
                  }}
                />
              </Stack>
            </LocalizationProvider>
            <Controller
              name="speaker"
              control={control}
              rules={validationRules.speaker}
              render={({field, fieldState}) => (
                <Stack direction={"column"} sx={{width: "50%"}}>
                  <InputLabel htmlFor="input-speaker">話者</InputLabel>
                  <Select
                    error={!!fieldState.error}
                    id="input-speaker"
                    {...field}
                    value={speaker}
                    onChange={(event) => {
                      handleChangeSpeaker(event)
                      field.onChange(event)
                    }}
                  >
                    <MenuItem value=""><em>未選択</em></MenuItem>
                    {speakers.map((speaker) => (
                      <MenuItem value={speaker} key={speaker}>{speaker}</MenuItem>))}
                  </Select>
                </Stack>
              )}
            />
          </Stack>
          <Controller
            name="text"
            control={control}
            rules={validationRules.text}
            render={({field, fieldState}) => (
              <Stack direction={"column"}>
                <InputLabel htmlFor="input-memo">テキスト</InputLabel>
                <TextField
                  multiline
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  id="input-memo"
                  {...field}
                />
              </Stack>
            )}
          />
          <Stack direction={"row"} spacing={2}>
            <Button
              variant={"outlined"}
              startIcon={<Cancel/>}
              fullWidth
              onClick={toggleIsEdit}
              size={"small"}
              disabled={isDeleting || isSubmitting}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              variant={"contained"}
              disabled={!isAllFormValid || isDeleting}
              startIcon={isSubmitting ? <CircularProgress size={24} color="inherit"/> : <Save/>}
              fullWidth
              size={"small"}
            >
              {defaultText !== "" ? "更新" : "作成"}
            </Button>
            {defaultText !== "" && (
              <Button
                color={"error"}
                variant={"contained"}
                startIcon={<Delete/>}
                fullWidth
                onClick={toggleDeleteDialog}
                disabled={isSubmitting || !timestampValue?.isValid()}
                size={"small"}
              >
                削除
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </>
  )
}