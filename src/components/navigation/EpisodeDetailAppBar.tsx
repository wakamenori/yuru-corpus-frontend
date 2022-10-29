import {IconButton, Toolbar, Typography,} from '@mui/material'
import {useRouter} from "next/router";
import {ArrowBack} from '@mui/icons-material'

type Props = {
  title: string;
}

export const EpisodeDetailAppBar = ({title}: Props) => {
  const router = useRouter();
  const backHandler = () => {
    router.back()
  }
  return (
    <Toolbar sx={{backgroundColor: "white", color: "text.primary"}}>
      <IconButton
        onClick={backHandler}
        size="large"
        edge="start"
        aria-label="open drawer"
        sx={{mr: 2}}
      >
        <ArrowBack/>
      </IconButton>

      <Typography>{title}</Typography>

    </Toolbar>
  )
}