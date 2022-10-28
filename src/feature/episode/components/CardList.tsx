import {Card} from "./Card"
import {Box, Grid} from "@mui/material";
import {Summary} from "../../../types/episode/summary";

type Props = {
  summary: Summary[];
}

export const CardList = ({summary}: Props) => {
  return (
    <Box marginTop={{xs: 8, sm: 10}} marginBottom={{xs: 9, sm: 9}}>
      <Grid container rowSpacing={{xs: 1, sm: 2}}>
        {
          summary.map((item) => (
            <Card {...item} key={item.id}/>
          ))
        }
      </Grid>
    </Box>
  )
}
