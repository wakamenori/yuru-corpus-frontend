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
  isedit: number
  isvalid: number
  isdirty: number
  inactivecolor: string
}>`
  width: 6rem;
  border-radius: 4px;
  margin-left: 0.5rem;
  border: ${(props) => (props.isedit ? '2px solid #6B7280' : `2px solid ${props.inactivecolor}`)};
  ${(props) => props.isdirty && 'border 2px solid #1875D1'};
  outline: none;

  background-color: ${(props) => (!props.isvalid ? '#FCA5A5' : props.inactivecolor)};
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
  if (isEdit) {
    return (
      <Timestamp
        isedit={isEdit ? 1 : 0}
        type='time'
        step={1}
        isdirty={isDirty ? 1 : 0}
        isvalid={isValid ? 1 : 0}
        {...register('timestamp', options)}
        onClick={onClick}
        inactivecolor={inactiveColor}
      />
    )
  } else {
    return <p onClick={onClick}>{defaultTimestamp}</p>
  }
}
