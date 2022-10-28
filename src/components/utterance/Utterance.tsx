import {Box, Typography} from "@mui/material"
import {Timestamp} from "./Timestamp"
import {createTheme, responsiveFontSizes, ThemeProvider,} from '@mui/material/styles';

type Props = {
  url: string;
  timestamp: string;
  text: string;
  odd: boolean;
}

let theme = createTheme();
theme = responsiveFontSizes(theme);

export const Utterance = ({timestamp, text, odd, url}: Props) => {
  const clickHandler = () => {
    return
  }
  return (
    <Box sx={{display: "flex", pt: 1, pb: 1}} bgcolor={odd ? "white" : "#F3F4F6"}>
      <Timestamp timestamp={timestamp} onClick={clickHandler} url={url}/>
      <ThemeProvider theme={theme}>
        <Typography sx={{mr: 2, ml: 2}} variant="body2">
          {text}
        </Typography>
      </ThemeProvider>
    </Box>
  )
};