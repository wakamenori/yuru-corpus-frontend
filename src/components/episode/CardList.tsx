import {Card} from "./Card"
import {Grid} from "@mui/material";
import {Summary} from "../../types/episode/summary";

type Props = {
  summary: Summary[];
}

export const CardList = ({summary}: Props) => {
  return (
    <Grid container sx={{mb: 10}}>
      {
        summary.map((item) => (
          <Card {...item} key={item.id}/>
        ))
      }
    </Grid>
  )
}
