import {createTheme, responsiveFontSizes} from '@mui/material/styles';
import styled from "styled-components";


type Props = {
  timestamp: string;
  onClick: () => void;
  url?: string;
}

let theme = createTheme();
theme = responsiveFontSizes(theme);

const StyledLink = styled.div<{ hasHour: boolean }>`
  flex-grow: 0;
  width: ${props => props.hasHour ? "5rem" : "3.5rem"};
  text-align: center;
  color: #1560c0;
  margin: auto;

  & * {
    font-size: 0.8rem;
    margin: auto
    display: block
  }
`


export const Timestamp = ({timestamp, url, onClick}: Props) => {
  const timestampArray = timestamp.split(":");
  let urlWithTimestamp = url + "&t=";
  if (timestampArray.length > 2) {
    urlWithTimestamp += +timestampArray[0] * 3600 + +timestampArray[1] * 60 + +timestampArray[2];
  } else {
    urlWithTimestamp += +timestampArray[0] * 60 + +timestampArray[1];
  }
  if (timestamp.startsWith("00:")) {
    timestamp = timestamp.substring(3);
  }

  return (
    <StyledLink hasHour={timestamp.length > 5}>
      {url == undefined ?
        (
          <p>
            {timestamp}
          </p>
        ) : (
          <a href={urlWithTimestamp} target="_blank" rel="noreferrer" onClick={onClick}>
            {timestamp}
          </a>
        )
      }
    </StyledLink>
  )
}