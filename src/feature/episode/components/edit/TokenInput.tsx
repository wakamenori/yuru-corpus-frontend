import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import styled from 'styled-components'

type Props = {
  isValid: boolean
  isEdit: boolean
  isDirty: boolean
  register: UseFormRegister<any>
  options: RegisterOptions
  onClick: () => void
  inactiveColor: string
  defaultToken?: string
}

const Textarea = styled(TextareaAutosize)<{
  isedit: number
  isvalid: number
  isdirty: number
  inactivecolor: string
}>`
  width: 100%;
  border: 1px solid white;
  border-radius: 4px;
  outline: none;
  border: ${(props) => (props.isedit ? '2px solid #6B7280' : `2px solid ${props.inactivecolor}`)};
  ${(props) => props.isdirty && 'border 2px solid #1875D1'};
  background-color: ${(props) => (!props.isvalid ? '#FCA5A5' : 'inherit')};
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 1rem;
`

const Display = styled.p<{ inactivecolor: string }>`
  margin: 0;
  padding: 2px;
  border: 2px solid ${(props) => props.inactivecolor};
  letter-spacing: normal;
  font-size: 1rem;
`

export const TokenInput = ({
  inactiveColor,
  isValid,
  options,
  onClick,
  register,
  isEdit,
  isDirty,
  defaultToken,
}: Props) => {
  if (isEdit) {
    return (
      <Textarea
        isedit={isEdit ? 1 : 0}
        isdirty={isDirty ? 1 : 0}
        isvalid={isValid ? 1 : 0}
        {...register('token', options)}
        onClick={onClick}
        inactivecolor={inactiveColor}
      />
    )
  } else {
    return (
      <Display onClick={onClick} inactivecolor={inactiveColor}>
        {defaultToken}
      </Display>
    )
  }
}
