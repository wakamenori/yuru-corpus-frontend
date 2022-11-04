import styled from "styled-components";


type Props = {
  text: string;
}


const StyledText = styled.div`
  flex-grow: 1;
  text-align: left;
  margin: auto;
  & p {
    font-size: 0.75rem;
    margin: 0 0.5rem;
    @media (min-width: 600px) {
      font-size: 0.785rem;
    }
  }
`


export const Text = ({ text }: Props) => {
  return (<StyledText><p>{text}</p></StyledText>)
}
