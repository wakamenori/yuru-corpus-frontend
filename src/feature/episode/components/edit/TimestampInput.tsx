import { CssBaseline } from '@mui/material'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'

type Props = {
  isValid: boolean
  isEdit: boolean
  isDirty: boolean
  register: UseFormRegister<any>
  options: RegisterOptions
  onClick: () => void
  inactiveColor: string
  defaultTimestamp?: string
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
  isDirty,
  isValid,
  register,
  options,
  defaultTimestamp,
}: Props) => {
  return (
    <div>
      {isEdit ? (
        <>
          <Timestamp
            type='time'
            step={1}
            isdirty={isDirty ? 1 : 0}
            isvalid={isValid ? 1 : 0}
            {...register('timestamp', {
              ...options,
              pattern: { value: /([01][0-9]|2[0-3]):([012345][0-9]):([012345][0-9])/, message: '' },
            })}
            onClick={onClick}
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
