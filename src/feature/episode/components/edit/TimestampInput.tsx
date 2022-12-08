import { TextField } from '@mui/material'
import { styled as styledMui } from '@mui/material/styles'
import { DateTimePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ja from 'date-fns/locale/ja'
import {
  Control,
  Controller,
  RegisterOptions,
  SetFieldValue,
  UseFormRegister,
} from 'react-hook-form'
import styled from 'styled-components'

type Props = {
  isValid: boolean
  isEdit: boolean
  options: RegisterOptions
  onClick: () => void
  inactiveColor: string
  defaultTimestamp?: string
  setValue: SetFieldValue<any>
  control: Control<any>
}

const Timestamp = styled.input<{
  isvalid: number
  isdirty: number
}>`
  width: 6.5rem;
  border-radius: 4px;
  padding: 0;
  margin-left: 0.5rem;
  border: 2px solid #6b7280 ${(props) => props.isdirty && 'border 2px solid #1875D1'};
  background-color: ${(props) => (!props.isvalid ? '#FCA5A5' : 'inherit')};
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 1rem;
`
const StyledTextField = styledMui(TextField)({
  paddingLeft: '0.5rem',
  '& .MuiInputBase-input': {
    padding: '2px',
    paddingLeft: '0.3rem',
  },
  '& .MuiIconButton-root': {
    padding: '2px',
    paddingRight: '0.3rem',
    height: '24px',
    width: '24px',
  },
})

const Display = styled.p<{ inactivecolor: string }>`
  width: 6rem;
  margin: 0 0 0 0.5rem;
  font-size: 1rem;
  padding: 2px;
  border: 2px solid ${(props) => props.inactivecolor};
`
export const TimestampInput = ({
  inactiveColor,
  onClick,
  isEdit,
  isValid,
  options,
  defaultTimestamp,
  control,
  setValue,
}: Props) => {
  return (
    <div>
      {isEdit ? (
        <>
          <Controller
            name='timestamp'
            control={control}
            rules={{
              ...options,
              validate: (date: any) => date instanceof Date && !isNaN(date.getTime()),
            }}
            defaultValue={new Date(`2020-01-01T${defaultTimestamp}+0900`)}
            render={({ field }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                  <TimePicker
                    {...field}
                    views={['hours', 'minutes', 'seconds']}
                    inputFormat='HH:mm:ss'
                    mask='__:__:__'
                    renderInput={(props) => (
                      <StyledTextField
                        {...props}
                        sx={{ width: '7.5rem', paddingleft: '0.5rem' }}
                        size='small'
                        error={!isValid}
                      />
                    )}
                    onChange={(newValue) => {
                      setValue('timestamp', newValue, { shouldValidate: true, shouldDirty: true })
                    }}
                  />
                </LocalizationProvider>
              )
            }}
          />
        </>
      ) : (
        <Display onClick={onClick} inactivecolor={inactiveColor}>
          {defaultTimestamp}
        </Display>
      )}
    </div>
  )
}
