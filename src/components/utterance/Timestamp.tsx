import {Link, Typography} from '@mui/material'
import {createTheme, responsiveFontSizes, ThemeProvider,} from '@mui/material/styles';


type Props = {
  timestamp: string;
  onClick: () => void;
  url?: string;
}

let theme = createTheme();
theme = responsiveFontSizes(theme);


export const Timestamp = ({timestamp, url}: Props) => {
  const timestampArray = timestamp.split(":");
  let urlWithTimestamp = url + "&t=";
  if (timestampArray.length > 2) {
    urlWithTimestamp += +timestampArray[0] * 3600 + +timestampArray[1] * 60 + +timestampArray[2];
  } else {
    urlWithTimestamp += +timestampArray[0] * 60 + +timestampArray[1];
  }

  if (typeof url === "undefined") {
    return (
      <ThemeProvider theme={theme}>
        <Typography color="primary" sx={{mr: 2, ml: 2}} variant="body2">
          {timestamp}
        </Typography>
      </ThemeProvider>
    )
  } else {
    return (
      <div>
        <Link
          target="_blank"
          rel="noreferrer"
          href={urlWithTimestamp}
          underline="none"
          color="primary"
          sx={{mr: 2, ml: 2}}
        >
          {timestamp}
        </Link>
      </div>
    )
  }
}