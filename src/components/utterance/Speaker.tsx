import styled from "styled-components";
import {speakers} from "../../utils/speakers";


type ColorMap = {
  [speaker in typeof speakers[number]]: {
    color: string;
    backgroundColor: string;
  };
}

const colorMap: ColorMap = {
  "水野": {backgroundColor: "#60a5fa", color: "#FFF"},
  "堀元": {backgroundColor: "#885cf6", color: "#FFF"},
  "福田": {backgroundColor: "#f59e0b", color: "#FFF"},
  "嶋村": {backgroundColor: "#f59e0b", color: "#FFF"},
  "今井": {backgroundColor: "#f59e0b", color: "#FFF"},
  "黒島": {backgroundColor: "#f59e0b", color: "#FFF"},
  "その他": {backgroundColor: "#BDBDBD", color: "#212121"},
}

const StyledDiv = styled.div<{ colorSet: { backgroundColor: string, color: string } }>`
  width: 64px;
  background-color: ${props => props.colorSet.backgroundColor};
  color: ${props => props.colorSet.color};
  margin auto;
  border-radius: 4px;
  padding: 0.2rem;

  & p {
    margin: 0;
    text-align: center;
    font-size: 0.7rem;
    padding: 0 8px;
    @media (min-width: 600px) {
      font-size: 0.85rem;
      line-height: 0.85rem;
    }
  }
`

type Props = {
  speaker: typeof speakers[number];
}


export const Speaker = ({speaker}: Props) => {
  const colorSet = colorMap[speaker] || colorMap["その他"];
  return (
    <StyledDiv colorSet={colorSet}>
      <p>{speaker}</p>
    </StyledDiv>
  )
};
