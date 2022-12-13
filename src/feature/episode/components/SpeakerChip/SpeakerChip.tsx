// import styled from 'styled-components'

export type Props = {
  backgroundColor: string
  label: string
  labelColor: string
  onClick?: () => void
}

// const Container = styled.div`
//   // background-color: ${(props) => props.backgroundColor};
//   background-color: #f3f4f6;
//   font-size: 0.8rem;
//   // color: ${(props) => props.color};
//   color: #000;
//   margin: 0 0.1rem;
//   padding: 0 0.5rem;
//   border-radius: 4px;
//   width: 3rem;
//   height: 1.5rem;

//   display: flex;
//   align-items: center;
//   justify-content: center;
// `

export const SpeakerChip = ({ backgroundColor, label, labelColor, onClick }: Props) => {
  const style = {
    backgroundColor: backgroundColor,
    color: labelColor,
    fontSize: '0.8rem',
    margin: '0 0.1rem',
    padding: '0 0.5rem',
    borderRadius: '4px',
    width: '3rem',
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  return (
    <div style={style} onClick={onClick}>
      <span>{label}</span>
    </div>
  )
}
