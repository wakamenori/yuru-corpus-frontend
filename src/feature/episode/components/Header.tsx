import {IconButton, Toolbar, Typography,} from '@mui/material'
import {useRouter} from "next/router";
import {ArrowBack} from '@mui/icons-material'
import {AppBar} from "@mui/material";
import {HideOnScroll} from "../../../components/ui/HideOnScroll";

type Props = {
  title: string;
  hideOnScloll?: boolean;
}

export const Header = ({title, hideOnScloll}: Props) => {
  const router = useRouter();
  const backHandler = () => {
    router.back()
  }
  return (
    <HideOnScroll enabled={hideOnScloll}>
      <AppBar position="fixed">
        <Toolbar/>
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
      </AppBar>
    </HideOnScroll>
  )
}
