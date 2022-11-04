import {Box, IconButton} from "@mui/material"
import {Timestamp} from "./Timestamp"
import {createTheme, responsiveFontSizes} from '@mui/material/styles';
import {Edit} from "@mui/icons-material"
import {Speaker} from "./Speaker"
import {Text} from "./Text"


type Props = {
  url: string;
  timestamp: string;
  text: string;
  odd: boolean;
  enableEdit: (timestamp: string, speaker: string, text: string) => void;
  speaker: string;
  isEdit: boolean;
  showEditIcon: boolean;
}

let theme = createTheme();
theme = responsiveFontSizes(theme);

export const Utterance = ({timestamp, text, odd, url, enableEdit, speaker, isEdit, showEditIcon}: Props) => {
  const clickHandler = () => {
    return
  }
  return (
    <Box sx={{
      display: "flex",
      justifyContent: 'space-between',
      pt: 1,
      pb: 1
    }} bgcolor={odd ? "white" : "#F3F4F6"}>
      <Box display={{xs: "block", sm: "flex"}}>
        <Timestamp timestamp={timestamp} onClick={clickHandler} url={url}/>
        <Speaker speaker={speaker}/>
      </Box>
      <Text text={text}/>
      {showEditIcon && (
        <div>
          <IconButton size="small" onClick={() => enableEdit(timestamp, speaker, text)} disabled={isEdit}>
            <Edit fontSize="small"/>
          </IconButton>
        </div>
      )}
    </Box>
  )
};
